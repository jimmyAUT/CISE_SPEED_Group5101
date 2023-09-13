import React, { FormEvent, useState } from "react";
import { searchArticles } from "@/api/search";
import formStyles from "../../../styles/Form.module.scss";
import { GetStaticProps, NextPage } from "next";
import SortableTable from "@/components/table/SortableTable";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  abstract: string;
  comment: string;
  score: string;
}

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "abstract", label: "Abstract" },
    { key: "comment", label: "Comment" },
    { key: "score", label: "Score" },
  ];

  const submitSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = JSON.stringify({
      keyword,
      year,
    });
    console.log(query);
    try {
      const response = await searchArticles(query);
      console.log(response);
      if (response.length !== 0) {
        setSearchResults(response);
      } else {
        console.log("No result");
      }
    } catch (error) {
      console.error("Error searching article:", error);
    }
  };

  return (
    <div className="container">
      <form className={formStyles.form} onSubmit={submitSearch}>
        <label htmlFor="title">SE method Keyword:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="keyword"
          id="keyword"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="year"
          id="year"
          value={year}
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />
        <button className={formStyles.formItem} type="submit">
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <SortableTable headers={headers} data={searchResults} />
      )}
    </div>
  );
};

export default SearchPage;
