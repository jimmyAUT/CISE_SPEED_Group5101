import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { createArticle } from "@/api/articles";
import { searchSubmit } from "@/api/submit";

interface ArticleInterface {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: number;
  doi: string;
  comment?: string;
  abstract?: string;
  score?: number;
}

type AnalystProps = {
  articles: ArticleInterface[];
};

const Analyst: NextPage<AnalystProps> = ({ articles }) => {
  const [localArticles, setLocalArticles] = useState(articles);

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
      comment: article.comment,
      abstract: article.abstract,
      score: article.score,
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
    "Comment",
    "Abstract",
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
              <td>{article.authors}</td>{" "}
              {/* Display authors as a comma-separated string */}
              <td>{article.source}</td>
              <td>{article.pubyear}</td>
              <td>{article.doi}</td>
              <td>
                <input
                  type="text"
                  value={article.comment || ""}
                  onChange={(e) =>
                    handleInputChange(article._id, "comment", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={article.abstract || ""}
                  onChange={(e) =>
                    handleInputChange(article._id, "abstract", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
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
                    !article.comment ||
                    !article.score ||
                    article.score < 1 ||
                    article.score > 10
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
