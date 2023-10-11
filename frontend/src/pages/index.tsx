import React, { FormEvent, useState } from "react";
import { login } from "@/api/register";
import { useRouter } from "next/router";
import formStyles from "../../styles/Form.module.scss";

const Home = () => {
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

  const handleSearchClick = () => {
    router.push('/search');
  };
  const handleSuggestClick = () => {
    router.push('/articles');
  };

  return (
    <div className="container">
      <h1>Welcome to SPEED - Software Practice Empirical Evidence Database (SPEED)</h1>
      <p>
        SPEED is your source for empirical evidence in software practice.
        Explore articles, suggest new ones, and search for valuable insights.
      </p>
      <div>
        <a href="/articles/new">
        <button onClick={() => router.push('/articles/new')}>Suggest Articles</button>
        </a>
        <a href="/search">
        <button onClick={handleSearchClick}>Search Articles</button>
        </a>
      </div>
      {Object.keys(user).length !== 0 ? (
        <div>
          <button className={formStyles.formItem}>Logout</button>
        </div>
      ) : (
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
            {/* <select
              className={formStyles.formItem}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="submitter">Submitter</option>
              <option value="moderator">Moderator</option>
              <option value="analyst">Analyst</option>
              <option value="administrator">Administrator</option>
            </select> */}
            <button className={formStyles.formItem} type="submit">
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
