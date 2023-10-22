import { login } from "@/api/register";
import { useRouter } from "next/router";
import formStyles from "../../../styles/Form.module.scss";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const account = JSON.stringify({
      email,
      password,
    });
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
      alert("Invalid credential");
    }
  };

  return (
    <div>
      <br />
      <div>
        <p>Test account:</p>
        <p>moderator: review@mail.com 123</p>
        <p>analyst: analyst@mail.com 123</p>
        <p>administrator: admin@mail.com 123</p>
      </div>
      <br />
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
        <button type="submit">Sign In</button>
      </form>
      <button
        disabled={true}
        className={formStyles.formItem}
        onClick={() => router.push("/register")}
      >
        Apply to join the management.
      </button>
    </div>
  );
};

export default LoginPage;
