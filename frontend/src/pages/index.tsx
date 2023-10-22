import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import formStyles from "../../styles/Form.module.scss";

const Home = () => {
  const router = useRouter();
  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <div className="container">
      <h1>Welcome to SPEED - Software Practice Empirical Evidence Database</h1>

      <h2>SPEED is your source for empirical evidence in software practice.</h2>
      <h2>
        Explore articles, suggest new ones, and search for valuable insights.
      </h2>

      <div>
        <button
          className={formStyles.formItem}
          onClick={() => router.push("/articles/new")}
        >
          Suggest Articles
        </button>
        <button
          className={`${formStyles.formItem} ${formStyles.buttonSpace}`}
          onClick={handleSearchClick}
        >
          Search Articles
        </button>
      </div>
      <h3
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          textAlign: "left",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Administrator please Login from management.
      </h3>
    </div>
  );
};

export default Home;
