import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { getArticles, createArticle } from "@/api/articles";

interface ArticlesInterface {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  abstract: string;
  comment: string;
  score: string;
}

type AnalystProps = {
  articles: ArticlesInterface[];
};

const Analyst: NextPage<AnalystProps> = ({ articles }) => {
  const [articlesData, setArticlesData] = useState(articles);

  const handleAddToSPEEDDB = async (article: ArticlesInterface) => {
    try {
      const response = await createArticle(article);
      if (response && response._id) {
        console.log(`Article with id ${response._id} added to SPEED DB`);
      } else {
        console.error("Failed to add the article to SPEED DB.");
      }
    } catch (error) {
      console.error("Error adding article to SPEED DB:", error);
    }
  };

  return (
    <div className="container">
      <h1>Analyst:</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Source</th>
            <th>Publication Year</th>
            <th>DOI</th>
            <th>Abstract</th>
            <th>Comment</th>
            <th>Score</th>
            <th>Action</th>
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
              <td>{article.abstract}</td>
              <td>{article.comment}</td>
              <td>{article.score}</td>
              <td>
                <button onClick={() => handleAddToSPEEDDB(article)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<AnalystProps> = async (_) => {
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

export default Analyst;
