import { login } from "@/api/register";
import { useRouter } from "next/router";
import formStyles from "../../../styles/Form.module.scss";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("submitter"); // 默认角色是submitter
  const [user, setUser] = useState({});
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const account = JSON.stringify({
      email,
      password,
      role,
    });
    console.log(account);
    try {
      const response = await login(account);
      console.log(response);
      setUser(response);
      if (response === "moderator") {
        router.push("/review");
      } else if (response === "administrator") {
        router.push("/admin");
      } else if (response === "submitter") {
        router.push("/articles/new");
      } else if (response === "analyst") {
        router.push("/analyst");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <button
        className={formStyles.formItem}
        onClick={() => router.push("/register")}
      >
        Register
      </button>
      <form className={formStyles.form} onSubmit={submit}>
        <input
          className={formStyles.formItem}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={formStyles.formItem}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={formStyles.formItem} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;