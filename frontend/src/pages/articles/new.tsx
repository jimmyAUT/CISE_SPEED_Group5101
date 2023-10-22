import { createSubmit } from "@/api/submit";
import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<string>("0");
  const [doi, setDoi] = useState("");
  const status = "unreview";

  const [bibtexContent, setBibtexContent] = useState("");

  const handleBibtexPaste = (
    event: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    // 在粘贴事件中获取粘贴的文本
    const pastedText = event.clipboardData.getData("text/plain");

    // 将粘贴的文本设置为 BibTeX 内容
    setBibtexContent(pastedText);

    // 提取Bibtex內容
    // 定义正则表达式模式以匹配 /title={([^}]*)}/;
    const titleRegex = /title=\s*{([^}]*)}/;
    const authorRegex = /(?:author|editor)=\{([^}]*)}/;
    const sourceRegex = /(?:booktitle|source|journal)=\{([^}]+)\}/;
    const yearRegex = /year=\{(\d+)\}/;

    // 使用正则表达式匹配内容
    const titleMatch = bibtexContent.match(titleRegex);
    const authorMatch = bibtexContent.match(authorRegex);
    const sourceMatch = bibtexContent.match(sourceRegex);
    const yearMatch = bibtexContent.match(yearRegex);
    const doiMatch = bibtexContent.match(/doi=\{([^}]+)\}/);

    // 检查是否找到内容
    if (titleMatch) {
      setTitle(titleMatch[1]);
    }

    if (authorMatch) {
      const authorString = authorMatch[1];
      // 使用 " and " 作为分隔符拆分作者字符串
      const authorArray = authorString
        .split(" and ")
        .map((item) => item.trim());
      setAuthors(authorArray);
    }

    if (sourceMatch) {
      setSource(sourceMatch[1]);
    }

    if (yearMatch) {
      setPubYear(yearMatch[1]);
    }

    if (doiMatch) {
      setDoi(doiMatch[1]);
    }
  };

  // ================================================================================================

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authorsString = authors.join(", "); //connect the authors by ',' and turn array to string

    if (title === "" || source == "") {
      alert("Please enter valid article's detail");
    } else {
      const subArticle = JSON.stringify({
        title,
        authors: authorsString,
        source,
        pubyear: pubYear,
        doi,
        status,
        method: "Set new class",
      });
      console.log(subArticle);

      try {
        // Send the data to the server using createSubmit
        await createSubmit(subArticle);

        alert("Your suggestion has been submitted! Thank you!");
        setTitle("");
        setAuthors([""]);
        setSource("");
        setPubYear("0");
        setDoi("");
        setBibtexContent("");
      } catch (error) {
        console.error("Submission error:", error);
      }
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
      <h1>BibTeX Content</h1>
      <div>
        <textarea
          value={bibtexContent}
          onPaste={handleBibtexPaste}
          placeholder="Paste your BibTeX content here..."
          rows={10}
          cols={80}
        />
      </div>
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
          value={parseInt(pubYear) === 0 ? "" : parseInt(pubYear)}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear("0");
            } else {
              setPubYear(val);
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
    </div>
  );
};

export default NewDiscussion;
