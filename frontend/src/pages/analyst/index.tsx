import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import reviewedArticles from "../../utils/dummydata";

interface ArticleInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim?: string;
  evidence?: string;
  comment?: string;
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

  const handleAddArticle = (article: ArticleInterface) => {
    // TODO: Add article to DB using API call

    // For now, let's just console log
    console.log("Adding article to DB:", article);
  };

  const headers = [
    "Title", "Authors", "Source", "Publication Year", "DOI", "Comment", "Score", "Action"
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
                  type="number"
                  value={article.score || ''}
                  onChange={(e) => handleInputChange(article.id, 'score', Number(e.target.value))}
                />
              </td>
              <td>
                <button
                  disabled={!article.comment || !article.score}
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

// ... other imports ...

export const getStaticProps: GetStaticProps<AnalystProps> = async () => {
  try {
    // Directly use the reviewedArticles from dummydata
    const articles = reviewedArticles.map((article, index) => ({
      ...article,
      id: `dummy-${index}`, // add a dummy id for now
      score: null, // Set this to null or provide a default value if necessary
    }));
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

