import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { getArticles, removeArticle } from "@/api/articles";

interface ArticlesInterface {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
  score: string;
  method: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};
const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers = [
    "Title",
    "Authors",
    "Source",
    "Publication Year",
    "DOI",
    "Claim", // Updated
    "Evidence", // Updated
    "Score",
    "Method",
    "Action",
  ];

  const [articlesData, setArticlesData] = useState(articles);

  const handleRemoveArticle = async (articleId: string) => {
    console.log(articleId);
    try {
      await removeArticle(articleId); // 调用删除文章的 API

      const updatedArticleData = articlesData.filter(
        (article) => article._id !== articleId
      );
      setArticlesData(updatedArticleData);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="container">
      {articlesData.length > 0 ? (
        <div>
          <h1>SPEED Articles:</h1>
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articlesData.map((article) => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>{article.authors}</td>
                  <td>{article.source}</td>
                  <td>{article.pubyear}</td>
                  <td>{article.doi}</td>
                  <td>{article.claim}</td>
                  <td>{article.evidence}</td>
                  <td>{article.score}</td>
                  <td>{article.method}</td>
                  <td>
                    <button onClick={() => handleRemoveArticle(article._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No article in SPEED database</h1>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (
  _
) => {
  try {
    const articles = await getArticles();
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

export default Articles;
