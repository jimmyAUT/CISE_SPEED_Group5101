import React, { useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import SortableTable from "@/components/table/SortableTable";
import { useRouter } from "next/router";
import { searchArticles } from "@/api/search";

const SearchPage: React.FC = () => {
  const router = useRouter();
  // const [searchQuery, setSearchQuery] = useState<string>("");
  // const [searchYear, setSearchYear] = useState<string>("");
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
    { key: "range", label: "Score" },
  ];

  const handleSearch = async () => {
    setLoading(true);
    const query = {
      // keyword: searchQuery,
      method: selectedMethod,
      // startYear,
      // endYear,
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

  return (
    <div className="container">
      <h2>Search SE Methods</h2>
      <div>
        {/* <input
          type="text"
          placeholder="Search SE Method by Keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
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
        {/* <input
          type="text"
          placeholder="Search Year"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        /> */}
      </div>

      {searchResults.length > 0 ? (
        <SortableTable headers={headers} data={searchResults} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default SearchPage;
