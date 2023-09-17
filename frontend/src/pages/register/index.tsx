import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/api/register";
import formStyles from "../../../styles/Form.module.scss";

export default function Register() {
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
      const response = await register(account);
      console.log(response);
      setUser(response);
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <div>
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
          <select
            className={formStyles.formItem}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="submitter">Submitter</option>
            <option value="moderator">Moderator</option>
            <option value="analyst">Analyst</option>
            <option value="administrator">Administrator</option>
          </select>
          <button className={formStyles.formItem} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
