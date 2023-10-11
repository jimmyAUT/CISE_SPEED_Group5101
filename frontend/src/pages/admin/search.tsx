import SortableTable from "../../components/table/SortableTable";
import React, { useState, useEffect } from "react";
import { getArticles, removeArticle } from "@/api/articles";
import { getSeList, searchMethod } from "@/api/search";

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
}

const Search: React.FC = () => {
  const [seOption, setSeOption] = useState(""); // 用于存储选择的选项
  const [pubyearRange, setPubyearRange] = useState({ start: "", end: "" }); //設定顯示年份區間
  const [articlesData, setArticlesData] = useState<ArticlesInterface[]>([]); // 存储文章数据
  const [options, setOptions] = useState<string[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeOption(event.target.value);
  };

  const handleStartYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPubyearRange({ ...pubyearRange, start: event.target.value });
  };

  const handleEndYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPubyearRange({ ...pubyearRange, end: event.target.value });
  };

  const handleMethodSubmit = async () => {
    const query = {
      method: seOption,
    };
    try {
      const articles = await searchMethod(query);
      if (articles.length > 0) {
        if (!pubyearRange.start && !pubyearRange.end) {
          setArticlesData(articles);
        } else {
          const filteredArticles = articles.filter(
            (article: { pubyear: string }) => {
              const pubyear = parseInt(article.pubyear);
              const startYear = parseInt(pubyearRange.start);
              const endYear = parseInt(pubyearRange.end);
              return pubyear >= startYear && pubyear <= endYear;
            }
          );
          setArticlesData(filteredArticles);
        }
      } else {
        alert("No articles found for the selected option.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getSeList()
      .then((options) => {
        console.log(options);
        setOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const isValidYear = (year: string | null): boolean => {
    // 验证年份是否为数字，是否大于等于 1900，小于等于当前年份

    if (year === null || year === "") {
      return true; // 当 year 为空值时返回 true
    }
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(year, 10);
    return !isNaN(inputYear) && inputYear >= 1900 && inputYear <= currentYear;
  };

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "score", label: "Score" },
  ];

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
      <h1>Search Articles:</h1>
      <select value={seOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label>Start Pubyear: </label>
      <input
        type="text"
        value={pubyearRange.start}
        onChange={handleStartYearChange}
      />
      <label>End Pubyear: </label>
      <input
        type="text"
        value={pubyearRange.end}
        onChange={handleEndYearChange}
      />
      <button onClick={handleMethodSubmit}>Submit</button>
      {articlesData.length > 0 ? (
        <SortableTable headers={headers} data={articlesData} />
      ) : null}
    </div>
  );
};

export default Search;
