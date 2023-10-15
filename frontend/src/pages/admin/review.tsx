import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";

import { searchSubmit, reviewSubmit, removeSubmit } from "@/api/submit";
import { addRejected } from "@/api/review";

interface ArticleInterface {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: number;
  doi: string;
  method?: string;
}

type ReviewProps = {
  articles: ArticleInterface[];
};

const Review: NextPage<ReviewProps> = ({ articles }) => {
  const [submitArticles, setSubmitArticles] = useState(articles);

  useEffect(() => {
    alert("Receive a new submission.");
  }, []);

  const handleMethodChange = (id: string, method: string) => {
    const updatedArticles = submitArticles.map((article) =>
      article._id === id
        ? {
            ...article,
            method,
          }
        : article
    );
    setSubmitArticles(updatedArticles);
  };

  const handlePass = async (article: ArticleInterface) => {
    const id = article._id;
    const query = {
      title: article.title,
      authors: article.authors,
      source: article.source,
      publication_year: article.pubyear,
      doi: article.doi,
      method: article.method,
      status: "reviewed",
    };
    try {
      const response = await reviewSubmit(id, query);
      console.log("Article pass:", response);

      // Display an alert after successful addition
      alert("This article has successfully been pass to the analyst!");

      setSubmitArticles((prevArticles) =>
        prevArticles.filter((a) => a._id !== article._id)
      );
    } catch (error) {
      console.error("Error passing article:", error);
    }
  };

  const handleRejectArticle = async (article: ArticleInterface) => {
    const rejectedData = {
      title: article.title,
      authors: article.authors,
      source: article.source,
      publication_year: article.pubyear,
      doi: article.doi,
      method: article.method,
    };
    try {
      await addRejected(JSON.stringify(rejectedData));
      await removeSubmit(article._id);
      alert("This article has successfully added to Rejected Database!");
      setSubmitArticles((prevArticles) =>
        prevArticles.filter((a) => a._id !== article._id)
      );
    } catch (error) {
      console.error("Error rejecting article:", error);
    }
  };

  const headers = [
    "Title",
    "Authors",
    "Source",
    "Publication Year",
    "DOI",
    "Method",
    "Action",
  ];

  return (
    <div className="container">
      <h1>Moderator Review Page</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submitArticles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.authors}</td>
              <td>{article.source}</td>
              <td>{article.pubyear}</td>
              <td>{article.doi}</td>
              <td>
                <select
                  value={article.method || ""}
                  onChange={(e) =>
                    handleMethodChange(article._id, e.target.value)
                  }
                >
                  <option value="">Select method</option>
                  <option value="method 1">method 1</option>
                  <option value="method 2">method 2</option>
                  <option value="method 3">method 3</option>
                </select>
              </td>
              <td>
                <button
                  disabled={!article.method}
                  onClick={() => handlePass(article)}
                >
                  Pass
                </button>
                <button onClick={() => handleRejectArticle(article)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export const getStaticProps: GetStaticProps<ReviewProps> = async () => {
  try {
    const query = { status: "unreview" };
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

export default Review;
