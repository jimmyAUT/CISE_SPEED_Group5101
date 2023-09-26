import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import { useRouter } from "next/router";
import { createArticle } from "@/api/articles";
import { Console } from "console";

const NewDiscussion = () => {

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [submittedArticles, setSubmittedArticles] = useState<any[]>([]);
  //const router = useRouter();

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authorsString = authors.join(", "); //connect the authors by ',' and turn array to string

    
      setTitle("");
      setAuthors([""]);
      setSource(""); 
      setPubYear(0); 
      setDoi("");
      setShowPopup(true);

    const subArticle = {
      title,
      authors: authorsString,
      source,
      publication_year: pubYear,
      doi,
    };
    // console.log(subArticle)

    // setSubmittedArticles(submittedArticles=> [...submittedArticles, subArticle]);
    // console.log(setSubmittedArticles)
    setSubmittedArticles([...submittedArticles, subArticle]);
    clearForm();
  };
    const clearForm = () => {
    setTitle("");
    setAuthors([""]);
    setSource("");
    setPubYear(0);
    setDoi("");
    setShowPopup(true);
  };
    const closePopup = () => {
      setShowPopup(false);
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

      {/* {submittedArticles.length > 0 && (
        <div>
          <h2>Submitted Articles</h2>
          <ul>
            {submittedArticles.map((article, index) => (
              <li key={index}>{article}</li>
            ))}
          </ul>
        </div> in button show submit
      )} */}

      {submittedArticles.length > 0 && (
  <div>
    <h2>Submitted Articles</h2>
    <ul>
      {submittedArticles.map((article, index) => (
        <li key={index}>
          <pre>
            {`[${Object.entries(article)
              .map(([key, value]) => `"${key}": "${value}"`)
              .join(", ")}]`}
          </pre>
        </li>
      ))}
    </ul>
  </div>
)}


      {showPopup && (
        <div className={formStyles.popup}>
          <button className={formStyles.closeButton} onClick={closePopup}>
            &times;
          </button>
          <p>Thanks for submitting your article! We will sned an Email after your suggest is approve.</p>
        </div>
      )}
    </div>
  );
};

export default NewDiscussion;
