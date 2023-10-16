// import SortableTable from "../../components/table/SortableTable";
import React, { useState, useEffect } from "react";
import { getArticles, removeArticle } from "@/api/articles";
import { getSeList, searchMethod } from "@/api/search";
import { updateScore } from "@/api/articles";

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
  userRatings?: string[];
}

const StarRating = ({ onRatingChange }: { onRatingChange: (rating: number) => void }) => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                onRatingChange(ratingValue);
              }}
            />
            <span className={ratingValue <= rating ? 'active-star' : ''}>☆</span>
          </label>
        );
      })}
    </div>
  );
};

const Search: React.FC = () => {
  const [seOption, setSeOption] = useState(""); // 用于存储选择的选项 //
  const [pubyearRange, setPubyearRange] = useState({ start: "", end: "" }); //設定顯示年份區間
  const [articlesData, setArticlesData] = useState<ArticlesInterface[]>([]); // 存储文章数据
  const [options, setOptions] = useState<string[]>([]); //copy
  const [score, setScore] = useState<{ [key: string]: string }>({});

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

  // SE method搜尋提交
  const handleMethodSubmit = async () => {
    // 验证输入的年份是否合法
    if (!isValidYear(pubyearRange.start) || !isValidYear(pubyearRange.end)) {
      alert("Invalid year input.");
      return;
    }
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

  const handleScoreChange = (articleId: string, newScore: string) => {
    setScore({ ...score, [articleId]: newScore });
  };
  
// 分數提交
const handleScoreSubmit = async (articleId: string) => {
  const newScore = score[articleId] || "0";
  try {
    const updatedArticle = await updateScore(articleId, parseFloat(newScore));
    alert("Score updated successfully");
    const ranking = parseFloat(updatedArticle.article.score).toFixed(1);
    setArticlesData((prevData) =>
      prevData.map((article) =>
        article._id === articleId ? { ...article, score: ranking } : article
      )
    );
    setScore({ ...score, [articleId]: "" });
  } catch (error) {
    console.error("Error updating score:", error);
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

  const headers = [
    "Title",
    "Authors",
    "Source",
    "Publication Year",
    "DOI",
    "Claim",
    "Evidence",
    "Score",
    "Vote",
  ];

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
      <button onClick={handleMethodSubmit}>Search</button>
      {articlesData.length > 0 ? (
        // <SortableTable headers={headers} data={articlesData} />
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
                <td>{article.authors}</td> <td>{article.source}</td>
                <td>{article.pubyear}</td>
                <td>{article.doi}</td>
                <td>{article.claim}</td>
                <td>{article.evidence}</td>
                <td>{parseFloat(article.score).toFixed(1)}</td>
                <td>
                  {/* <input
                    type="number"
                    min="1"
                    max="5"
                    // value={article.score || ""}
                    onChange={(e) =>
                      handleScoreChange(article._id, String(e.target.value))
                    }
                  /> */}
                  <StarRating onRatingChange={(newScore) => handleScoreChange(article._id, String(newScore))}/>
                  <button onClick={() => handleScoreSubmit(article._id)}>
                    Submit
                  </button>
                  </td>
                        {/* 
                  <button
                    disabled={
                      !article.score ||
                      parseFloat(article.score) < 1 ||
                      parseFloat(article.score) > 5
                    }
                    onClick={() =>
                      handleScoreSubmit(article._id, parseFloat(article.score))
                    }
                  >
                    Submit
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Search;

// import React, { useState, useEffect } from "react";
// import { getSeList, searchMethod } from "@/api/search";
// import { updateScore } from "@/api/articles";

// interface ArticlesInterface {
//   _id: string;
//   title: string;
//   authors: string;
//   source: string;
//   pubyear: string;
//   doi: string;
//   claim: string;
//   evidence: string;
//   score: string;
// }

// const Search: React.FC = () => {
//   const [seOption, setSeOption] = useState(""); // 用于存储选择的选项
//   const [pubyearRange, setPubyearRange] = useState({ start: "", end: "" }); //設定顯示年份區間
//   const [articlesData, setArticlesData] = useState<ArticlesInterface[]>([]); // 存储文章数据
//   const [options, setOptions] = useState<string[]>([]);
//   const [score, setScore] = useState<{ [key: string]: string }>({});

//   const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSeOption(event.target.value);
//   };

//   const handleStartYearChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPubyearRange({ ...pubyearRange, start: event.target.value });
//   };

//   const handleEndYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPubyearRange({ ...pubyearRange, end: event.target.value });
//   };

//   // SE method搜尋提交
//   const handleMethodSubmit = async () => {
//     // 验证输入的年份是否合法
//     if (!isValidYear(pubyearRange.start) || !isValidYear(pubyearRange.end)) {
//       alert("Invalid year input.");
//       return;
//     }
//     const query = {
//       method: seOption,
//     };
//     try {
//       const articles = await searchMethod(query);
//       if (articles.length > 0) {
//         if (!pubyearRange.start && !pubyearRange.end) {
//           setArticlesData(articles);
//         } else {
//           const filteredArticles = articles.filter(
//             (article: { pubyear: string }) => {
//               const pubyear = parseInt(article.pubyear);
//               const startYear = parseInt(pubyearRange.start);
//               const endYear = parseInt(pubyearRange.end);
//               return pubyear >= startYear && pubyear <= endYear;
//             }
//           );
//           setArticlesData(filteredArticles);
//         }
//       } else {
//         alert("No articles found for the selected option.");
//       }
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     }
//   };

//   // 檢查輸入的評分
//   const handleScoreChange = (articleId: string, newScore: string) => {
//     setScore({ ...score, [articleId]: newScore });
//   };

//   console.log("Attempting to show alert...");


//   // 分數提交
//   const handleScoreSubmit = async (articleId: string, newScore: number) => {
//     try {
//       const updatedArticle = await updateScore(articleId, newScore);
//       alert("Score updated successfully");
//       const ranking = parseFloat(updatedArticle.article.score).toFixed(1);
//       setArticlesData((prevData) =>
//         prevData.map((article) =>
//           article._id === articleId ? { ...article, score: ranking } : article
//         )
//       );
//       setScore({ ...score, [articleId]: "" });
//     } catch (error) {
//       console.error("Error updating score:", error);
//     }
//   };

//   useEffect(() => {
//     getSeList()
//       .then((options) => {
//         console.log(options);
//         setOptions(options);
//       })
//       .catch((error) => {
//         console.error("Error fetching options:", error);
//       });
//   }, []);

//   const isValidYear = (year: string | null): boolean => {
//     // 验证年份是否为数字，是否大于等于 1900，小于等于当前年份

//     if (year === null || year === "") {
//       return true; // 当 year 为空值时返回 true
//     }
//     const currentYear = new Date().getFullYear();
//     const inputYear = parseInt(year, 10);
//     return !isNaN(inputYear) && inputYear >= 1900 && inputYear <= currentYear;
//   };

//   const headers = [
//     "Title",
//     "Authors",
//     "Source",
//     "Publication Year",
//     "DOI",
//     "Claim",
//     "Evidence",
//     "Score",
//     "Vote",
//   ];

//   return (
//     <div className="container">
//       <h1>Search Articles:</h1>
//       <select value={seOption} onChange={handleOptionChange}>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <label>Start Pubyear: </label>
//       <input
//         type="text"
//         value={pubyearRange.start}
//         onChange={handleStartYearChange}
//       />
//       <label>End Pubyear: </label>
//       <input
//         type="text"
//         value={pubyearRange.end}
//         onChange={handleEndYearChange}
//       />
//       <button onClick={handleMethodSubmit}>Search</button>
//       {articlesData.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               {headers.map((header) => (
//                 <th key={header}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {articlesData.map((article) => (
//               <tr key={article._id} id={article._id}>
//                 <td>{article.title}</td>
//                 <td>{article.authors}</td> <td>{article.source}</td>
//                 <td>{article.pubyear}</td>
//                 <td>{article.doi}</td>
//                 <td>{article.claim}</td>
//                 <td>{article.evidence}</td>
//                 <td>{parseFloat(article.score).toFixed(1)}</td>
//                 <td>
//                   <input
//                     type="number"
//                     min="1"
//                     max="5"
//                     step="1"
//                     value={score[article._id]}
//                     onChange={(e) =>
//                       handleScoreChange(article._id, e.target.value)
//                     }
//                   />
//                   <button
//                     disabled={
//                       !score[article._id] ||
//                       parseFloat(score[article._id]) < 1 ||
//                       parseFloat(score[article._id]) > 5
//                     }
//                     onClick={() =>
//                       handleScoreSubmit(
//                         article._id,
//                         parseFloat(score[article._id])
//                       )
//                     }
//                   >
//                     Submit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : null}
//     </div>
//   );
// };

// export default Search;