import { GetServerSideProps, NextPage } from "next";
import { useState } from "react"; // 引入useState

import { getUsers, removeUser, updateRole } from "@/api/users";
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
  const [usersData, setUsersData] = useState(users);
  const [action, setAction] = useState<{ [key: string]: string }>({});

  const handleActionSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    userID: any
  ) => {
    setAction((prevActions) => ({
      ...prevActions,
      [userID]: event.target.value,
    }));
  };

  const handleActionSubmit = async (
    userId: string,
    act: string,
    account: string
  ) => {
    console.log(userId, act, account);
    if (act == "Delete") {
      try {
        await removeUser(userId); // 调用删除用户的 API

        // 删除用户后，更新 usersData 状态
        const updatedUsersData = usersData.filter(
          (user) => user._id !== userId
        );
        alert(`${account} has been remove.`);
        setUsersData(updatedUsersData);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      try {
        const res = await updateRole(userId, act);
        console.log(res.user);
        const updatedUser = res.user;
        alert(`The role of ${account} has been updated.`);
        setUsersData((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? updatedUser : user))
        );
        console.log(usersData);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Users:</h1>
      {
        <table className="table">
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
                  <select
                    value={action[user._id]}
                    onChange={(e) => handleActionSelect(e, user._id)}
                  >
                    <option value="">Select an action</option>
                    <option value="Delete">Delete</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                  <button
                    onClick={() =>
                      handleActionSubmit(user._id, action[user._id], user.email)
                    }
                  >
                    Submit
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
