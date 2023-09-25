import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import reviewedArticles from "../../utils/dummydata";
import axios from 'axios';

interface ArticleInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
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

  const handleInputChange = (id: string, field: keyof ArticleInterface, value: any) => {
    const updatedArticles = localArticles.map(article => 
      article.id === id ? { ...article, [field]: value } : article
    );
    setLocalArticles(updatedArticles);
  };

  const addReviewedArticle = async (articleData: ArticleInterface) => {
    const response = await axios.post('/api/reviewed-articles', articleData);
    return response.data;
  };

  const handleAddArticle = async (article: ArticleInterface) => {
    console.log("Adding article to DB:", article);
  
    try {
      const response = await addReviewedArticle(article);  // Use the article directly without processing authors
      console.log("Article added:", response);
      setLocalArticles(prevArticles => prevArticles.filter(a => a.id !== article.id));
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const headers = [
    "Title", "Authors", "Source", "Publication Year", "DOI", "Comment", "Abstract", "Score", "Action"
  ];

  return (
    <div className="container">
      <h1>Analyst Review Page</h1>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
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
                  value={article.comment || ''}
                  onChange={(e) => handleInputChange(article.id, 'comment', e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="text"
                  value={article.abstract || ''}
                  onChange={(e) => handleInputChange(article.id, 'abstract', e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="number"
                  value={article.score || ''}
                  onChange={(e) => handleInputChange(article.id, 'score', Number(e.target.value))}
                />
              </td>
              <td>
                <button
                  disabled={!article.abstract || article.score === undefined}
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

export default Analyst;
