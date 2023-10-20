// pages/login.tsx

import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginTest } from "@/api/register";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const account = { email, password };
      const user = await loginTest(account); // 使用你的 login 函數進行登入
      if (user) {
        await signIn("credentials", {
          email: user.email,
          password: user.password, // 這可能需要在 login 函數中返回密碼
          redirect: false,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
