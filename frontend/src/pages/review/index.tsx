import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import reviewedArticles from "../../utils/dummydata";
import { addRejected } from '@/api/review';

interface ArticleInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  comment?: string;
}

type ReviewProps = {
  articles: ArticleInterface[];
};
const Review: NextPage<ReviewProps> = ({ articles }) => {
  const [localArticles, setLocalArticles] = useState(articles);

  const handleInputChange = (id: string, field: keyof ArticleInterface, value: any) => {
    const updatedArticles = localArticles.map(article => 
      article.id === id ? { ...article, [field]: value } : article
    );
    setLocalArticles(updatedArticles);
  }

  const handleAddArticle = (article: ArticleInterface) => {
    console.log("Adding article to DB:", article);
  };

  const headers = [
    "Title", "Authors", "Source", "Publication Year", "DOI", "Comment", "Abstract", "Score", "Action"
  ];

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
                  value={article.comment || ''}
                  onChange={(e) => handleInputChange(article.id, 'comment', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Review;
