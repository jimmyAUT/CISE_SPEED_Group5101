// pages/login.tsx

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { loginTest } from "@/api/register";

function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // 在 session 数据变化时执行操作
    console.log("Session updated:", session);
  }, [session]);

  const handleLogin = async () => {
    try {
      await signIn("credentials", {
        email,
        password,
      });
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
