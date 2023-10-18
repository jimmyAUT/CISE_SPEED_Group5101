import { GetStaticProps, NextPage } from "next";
// import { useState } from "react";
import { FormEvent, useState, useEffect } from "react";
import formStyles from "../../../styles/Form.module.scss";

import { createArticle } from "@/api/articles";
import { searchSubmit } from "@/api/submit";

interface ArticleInterface {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: number;
  doi: string;
  claim?: string; // Updated
  evidence?: string; // Updated
  score?: number;
}

type AnalystProps = {
  articles: ArticleInterface[];
};

const Analyst: NextPage<AnalystProps> = ({ articles }) => {
  const [localArticles, setLocalArticles] = useState(articles);

  useEffect(() => {
    if (localArticles.length > 0) {
      alert("New articles waiting for analysis.");
    }
  }, []);

  const handleInputChange = (
    id: string,
    field: keyof ArticleInterface,
    value: any
  ) => {
    const updatedArticles = localArticles.map((article) =>
      article._id === id ? { ...article, [field]: value } : article
    );
    setLocalArticles(updatedArticles);
  };

  const handleAddArticle = async (article: ArticleInterface) => {
    console.log("Adding article to DB:", article);

    const dataToSend = {
      title: article.title,
      authors: article.authors,
      source: article.source,
      publication_year: article.pubyear,
      doi: article.doi,
      claim: article.claim, // Updated
      evidence: article.evidence, // Updated
      score: article.score,
      vote_count: 1, // Added vote count default to 1
    };

    try {
      const response = await createArticle(JSON.stringify(dataToSend));
      console.log("Article added:", response);

      // Display an alert after successful addition
      alert("This article has successfully been added to the database!");

      setLocalArticles((prevArticles) =>
        prevArticles.filter((a) => a._id !== article._id)
      );
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const headers = [
    "Title",
    "Authors",
    "Source",
    "Publication Year",
    "DOI",
    "Claim", // Updated
    "Evidence", // Updated
    "Score",
    "Action",
  ];

  return (
    <div className="container">
      <h1>Analyst Review Page</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localArticles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.authors}</td>
              <td>{article.source}</td>
              <td>{article.pubyear}</td>
              <td>{article.doi}</td>
              <td>
                <input
                  type="text"
                  value={article.claim || ""} // Updated
                  onChange={
                    (e) =>
                      handleInputChange(article._id, "claim", e.target.value) // Updated
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={article.evidence || ""} // Updated
                  onChange={
                    (e) =>
                      handleInputChange(article._id, "evidence", e.target.value) // Updated
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={article.score || ""}
                  onChange={(e) =>
                    handleInputChange(
                      article._id,
                      "score",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <button
                  disabled={
                    !article.claim || // Updated
                    !article.score ||
                    article.score < 1 ||
                    article.score > 5
                  }
                  onClick={() => handleAddArticle(article)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps<AnalystProps> = async () => {
  try {
    const query = { status: "reviewed" };
    const articles = await searchSubmit(query);
    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Analyst;