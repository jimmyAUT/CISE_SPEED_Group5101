import { FormEvent, useState, useEffect } from "react";
import formStyles from "../../../styles/Form.module.scss";
import { createSubmit } from "@/api/submit";

const NewDiscussion = () => {

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [volume, setVolume] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [pages, setPages] = useState<string>("");
  const status = "unreview";

  useEffect(() => {
    const isFormValid = Boolean(
      title &&
      authors.length > 0 &&
      authors.every(author => author) &&
      source &&
      pubYear &&
      volume &&
      number &&
      pages &&
      doi
    );
    setIsValid(isFormValid);
  }, [title, authors, source, pubYear, volume, number, pages, doi]);
  

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const authorsString = authors.join(", "); //connect the authors by ',' and turn array to string
    const subArticle = JSON.stringify({
      title,
      authors: authorsString,
      source,
      publication_year: pubYear,
      doi,
      status,

      volume,
      number,
      pages,
    });

    try {
      // Send the data to the server using createSubmit
      await createSubmit(subArticle);    
    setTitle("");
    setAuthors([""]);
    setSource("");
    setPubYear(0);
    setDoi("");
    setVolume("");
    setNumber("");
    setPages("");   
    alert("Thanks for submitting your article!");

  } catch (error) {
    console.error("Submission error:", error);
  }
};

  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  // Return the full form

  return (
    <div className="container">
      <h1>New Article</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="author">Authors:</label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear === 0 ? "" : pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
        />

<label htmlFor="volume">Volume:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="volume"
        id="volume"
        value={volume}
        onChange={(event) => {
          setVolume(event.target.value);
        }}
      />

      <label htmlFor="number">Number:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="number"
        id="number"
        value={number}
        onChange={(event) => {
          setNumber(event.target.value);
        }}
      />

      <label htmlFor="pages">Pages:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="pages"
        id="pages"
        value={pages}
        onChange={(event) => {
          setPages(event.target.value);
        }}
      />

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />
        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;