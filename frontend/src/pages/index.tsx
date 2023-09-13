import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("submitter"); // 默认角色是submitter
  const [user, setUser] = useState(null);

  //register 邏輯
  const handleRegister = async () => {
    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        role,
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // login 邏輯
  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Log out 邏輯
  const handleLogout = () => {
    // 清除Cookie或LocalStorage并重置用户状态
    // ...

    setUser(null);
  };

  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      {user ? (
        <div>
          {/* <p>Welcome, {user.email}!</p> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
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
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="submitter">Submitter</option>
            <option value="moderator">Moderator</option>
            <option value="analyst">Analyst</option>
            <option value="administrator">Administrator</option>
          </select>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
