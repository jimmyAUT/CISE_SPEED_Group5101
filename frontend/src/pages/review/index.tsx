import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";

import { searchSubmit, reviewSubmit, removeSubmit } from "@/api/submit";
import { getSeList } from "@/api/search";
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
  const [seOption, setSeOption] = useState<{ [key: string]: string }>({}); // 用于存储选择的选项
  const [options, setOptions] = useState<string[]>([]); //由資料庫取得地的method list
  const [newMethod, setNewMethod] = useState<{ [key: string]: string }>({});
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  useEffect(() => {
    if (submitArticles.length > 0) {
      alert("Receive a new submission.");
    }
    getSeList()
      .then((options) => {
        console.log(options);
        setOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [submitArticles.length]);

  const handleOptionChange = (
    articleId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;

    if (value === "" || value === null) {
      setIsInputDisabled(false); // 用户未选择 Option，不禁用输入框
    } else {
      setIsInputDisabled(true); // 用户选择了 Option，禁用输入框
    }
    setSeOption((prevOptions) => ({
      ...prevOptions,
      [articleId]: value,
    }));
    setNewMethod((prevMethods) => ({
      ...prevMethods,
      [articleId]: value,
    }));
  };

  const handleNewMethodInput = (
    articleId: string,
    event: { target: { value: any } }
  ) => {
    const newValue = event.target.value;
    setNewMethod((prevMethods) => ({
      ...prevMethods,
      [articleId]: newValue,
    }));
  };

  const handlePass = async (article: ArticleInterface) => {
    const id = article._id;
    const query = {
      title: article.title,
      authors: article.authors,
      source: article.source,
      publication_year: article.pubyear,
      doi: article.doi,
      method: newMethod[article._id],
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
                <input
                  placeholder="New method"
                  value={newMethod[article._id] || ""}
                  onChange={(e) => handleNewMethodInput(article._id, e)}
                  // disabled={isInputDisabled}
                />
                <select
                  value={seOption[article._id] || ""}
                  onChange={(e) => handleOptionChange(article._id, e)}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  disabled={!newMethod[article._id]}
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
