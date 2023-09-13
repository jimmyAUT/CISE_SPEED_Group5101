import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 发送注册请求到服务器
      const response = await axios.post("/api/register", { email, password });

      // 如果注册成功，将用户重定向到主页
      if (response.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("注册失败", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email：</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </div>
  );
}
