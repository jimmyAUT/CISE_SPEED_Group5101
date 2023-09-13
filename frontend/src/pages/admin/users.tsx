import { GetServerSideProps, NextPage } from "next";
import { useState } from "react"; // 引入useState
import SortableTable from "../../components/table/SortableTable";
import { getUsers, removeUser } from "@/api/users";
import React from "react";

interface UsersInterface {
  _id: string;
  email: string;
  role: string;
}

type UsersProps = {
  users: UsersInterface[];
};

const Users: NextPage<UsersProps> = ({ users }) => {
  const headers: { key: keyof UsersInterface; label: string }[] = [
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const [usersData, setUsersData] = useState(users);

  const handleRemoveUser = async (userId: string) => {
    console.log(userId);
    try {
      await removeUser(userId); // 调用删除用户的 API

      // 删除用户后，更新 usersData 状态
      const updatedUsersData = usersData.filter((user) => user._id !== userId);
      setUsersData(updatedUsersData);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h1>Users:</h1>
      {
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleRemoveUser(user._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<UsersProps> = async (_) => {
  try {
    const users = await getUsers();
    // users.map((user: { id: any; _id: any; email: any; role: any }) => ({
    //   id: user.id ?? user._id,
    //   email: user.email,
    //   role: user.role,
    // }));
    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [{ title: "No user found" }],
      },
    };
  }
};

export default Users;
