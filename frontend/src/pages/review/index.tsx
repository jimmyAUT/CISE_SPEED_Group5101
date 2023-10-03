import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";
import { addRejected } from '@/api/review';
import { searchSubmit, reviewSubmit, removeSubmit } from "@/api/submit";


interface ArticleInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  comment?: string;
  status: string;
}

type ReviewProps = {
  articles: ArticleInterface[];
};

const Review: NextPage<ReviewProps> = ({ articles }) => {

  const handleInputChange = (id: string, field: keyof ArticleInterface, value: any) => {
    const updatedArticles = articles.map(article => 
      article.id === id ? { ...article, [field]: value } : article
    );
  };

  const handlePassArticle = async (article: ArticleInterface) => {
    try {
      await reviewSubmit(article.id, { status: "reviewed" });
      const updatedArticles = articles.filter(a => a.id !== article.id);
    } catch (error) {
      console.error("Error passing article:", error);
    }
  };


  const headers = [
    "Title", "Authors", "Source", "Publication Year", "DOI", "Comment", "Abstract", "Score", "Action"
  ];



const handleRejectArticle = async (article: ArticleInterface) => {
  try {
    await addRejected(article);
    await removeSubmit(article.id);
    const updatedArticles = articles.filter(a => a.id !== article.id);
    // setLocalArticles(updatedArticles);
  } catch (error) {
    console.error("Error rejecting article:", error);
  }
};

  const handleRejectArticle = async (article: ArticleInterface) => {
  try {
    const rejectedArticle = {
      title: article.title,
      authors: article.authors,
      source: article.source,
      pubyear: article.pubyear,
      doi: article.doi,
      comment: article.comment
    };
    const response = await addRejected(rejectedArticle);
    console.log("Article rejected:", response);

    // Update the local state
    setLocalArticles(prevArticles => prevArticles.filter(a => a.id !== article.id));
  } catch (error) {
    console.error("Error rejecting article:", error);
  }
};

return (
    <div className="container">
      <h1>Review Page</h1>
      <table>
        <thead>
          <tr>

            {headers
              .filter((header) => !["Abstract", "Score"].includes(header))
              .map((header) => (
                <th key={header}>{header}</th>
              ))}
            {headers.filter(header => !['Abstract', 'Score'].includes(header)).map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.authors}</td>
              <td>{article.source}</td>
              <td>{article.pubyear}</td>
              <td>{article.doi}</td>
              <td>
                <input
                  type="text"
                  value={article.comment || ""}
                  onChange={(e) =>
                    handleInputChange(article.id, "comment", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleRejectArticle(article)}>
                  Reject
                </button>
                <input 
                  type="text"
                  value={article.comment || ''}
                  onChange={(e) => handleInputChange(article.id, 'comment', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleRejectArticle(article)}>Reject</button>
                <button
                  onClick={() => handlePassArticle(article)} // Updated onClick handler for the "Pass" button
                >
                  Pass
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
    // Directly use the reviewedArticles from dummydata
    const articles = reviewedArticles.map((article, index) => {
      return {
        ...article,
        id: `dummy-${index}`, // add a dummy id for now
      };
    });
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
export const reviews = [];
    try {
      // Directly use the reviewedArticles from dummydata
      const articles = reviewedArticles.map((article, index) => {
        return {
          ...article,
          id: `dummy-${index}`, // add a dummy id for now
        };
      });
      return {
        props: {
          articles
        }
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      return {
        props: {
          articles: []
        }
      };
    }
  };
  
export default Review;
