import React, { useState } from "react";
import { useRouter } from "next/router";
import { searchArticles } from "@/api/search";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const headers = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "score", label: "Score" },
  ];

  const handleSearch = async () => {
    setLoading(true);
    const query = {
      keyword: searchQuery,
      method: selectedMethod,
      startYear,
      endYear,
      // year: searchYear,
    };

    try {
      const response = await searchArticles(query);
      if (Array.isArray(response) && response.length > 0) {
        setSearchResults(response);
      } else {
        console.log("No articles found for the specified criteria.");
        setSearchResults([]); // Clear previous search results.
      }
    } catch (error) {
      console.error("Error searching articles:", error);
      setSearchResults([]); // Clear results in case of an error.
    }

    setLoading(false);
  };

  // Function to handle user input for the score
  const handleScoreInput = (articleId: string, score: number) => {
    const updatedResults = searchResults.map((article) => {
      if (article.id === articleId) {
        return { ...article, score };
      }
      return article;
    });
    setSearchResults(updatedResults);
  };

  // Function to add the article with a score
  const handleAddArticle = (article: any) => {
    // Add logic here to handle adding the article with its score
  };

  return (
    <div className="container">
      <h2>Search SE Methods</h2>
      <div>
        <input
          type="text"
          placeholder="Search SE Method by Keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
        >
          <option value="">Select a method</option>
          <option value="method1">Method 1</option>
          <option value="method2">Method 2</option>
          <option value="method3">Method 3</option>
        </select>
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <input
          type="text"
          placeholder="Start Year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
      </div>

      {searchResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
              <th>Score</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((article) => (
              <tr key={article.id}>
                {headers.map((header) => (
                  <td key={header.key}>{article[header.key]}</td>
                ))}
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={article.score || ""}
                    onChange={(e) =>
                      handleScoreInput(article.id, Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <button
                    disabled={
                      !article.score ||
                      article.score < 1 ||
                      article.score > 5
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
      ) : (
        <p>No articles found.</p>
      )}

      <button onClick={() => router.push("/")}>Home</button>
    </div>
  );
};

export default SearchPage;
