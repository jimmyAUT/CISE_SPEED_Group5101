// import { FormEvent, useState } from "react";
// import formStyles from "../../../styles/Form.module.scss";
// import { createSubmit } from "@/api/submit";

// const NewDiscussion = () => {

//   const [title, setTitle] = useState("");
//   const [authors, setAuthors] = useState<string[]>([]);
//   const [source, setSource] = useState("");
//   const [pubYear, setPubYear] = useState<number>(0);
//   const [doi, setDoi] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const status = "unreview";

//   const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const authorsString = authors.join(", "); //connect the authors by ',' and turn array to string

//     setShowPopup(true);
      

//     const subArticle = JSON.stringify ({
//       title,
//       authors: authorsString,
//       source,
//       publication_year: pubYear,
//       doi,
//       status,
//     });
//     console.log(subArticle);

   

//     const closePopup = () => {
//       setTitle("");
//       setAuthors([""]);
//       setSource(""); 
//       setPubYear(0); 
//       setDoi("");
//       setShowPopup(false);
//     };

//   // const addAuthor = () => {
//   //   setAuthors(authors.concat([""]));
//   // };

//   const addAuthor = () => {
//     setAuthors([...authors, ""]);
//   };

//   const removeAuthor = (index: number) => {
//     setAuthors(authors.filter((_, i) => i !== index));
//   };

//   const changeAuthor = (index: number, value: string) => {
//     setAuthors(
//       authors.map((oldValue, i) => {
//         return index === i ? value : oldValue;
//       })
//     );
//   };

//   // Return the full form

//   return (
//     <div className="container">
//       <h1>New Article</h1>
//       <form className={formStyles.form} onSubmit={submitNewArticle}>
//         <label htmlFor="title">Title:</label>
//         <input
//           className={formStyles.formItem}
//           type="text"
//           name="title"
//           id="title"
//           value={title}
//           onChange={(event) => {
//             setTitle(event.target.value);
//           }}
//         />

//         <label htmlFor="author">Authors:</label>
//         {authors.map((author, index) => {
//           return (
//             <div key={`author ${index}`} className={formStyles.arrayItem}>
//               <input
//                 type="text"
//                 name="author"
//                 value={author}
//                 onChange={(event) => changeAuthor(index, event.target.value)}
//                 className={formStyles.formItem}
//               />
//               <button
//                 onClick={() => removeAuthor(index)}
//                 className={formStyles.buttonItem}
//                 style={{ marginLeft: "3rem" }}
//                 type="button"
//               >
//                 -
//               </button>
//             </div>
//           );
//         })}
//         <button
//           onClick={() => addAuthor()}
//           className={formStyles.buttonItem}
//           style={{ marginLeft: "auto" }}
//           type="button"
//         >
//           +
//         </button>

//         <label htmlFor="source">Source:</label>
//         <input
//           className={formStyles.formItem}
//           type="text"
//           name="source"
//           id="source"
//           value={source}
//           onChange={(event) => {
//             setSource(event.target.value);
//           }}
//         />

//         <label htmlFor="pubYear">Publication Year:</label>
//         <input
//           className={formStyles.formItem}
//           type="number"
//           name="pubYear"
//           id="pubYear" 
//           value={pubYear === 0 ? "" : pubYear}
//           onChange={(event) => {
//             const val = event.target.value;
//             if (val === "") {
//               setPubYear(0);
//             } else {
//               setPubYear(parseInt(val));
//             }
//           }}
//         />

//         <label htmlFor="doi">DOI:</label>
//         <input
//           className={formStyles.formItem}
//           type="text"
//           name="doi"
//           id="doi"
//           value={doi}
//           onChange={(event) => {
//             setDoi(event.target.value);
//           }}
//         />
//         <button className={formStyles.formItem} type="submit">
//           Submit
//         </button>
//       </form>

//       {showPopup && (
//         <div className={formStyles.popup}>
//           <button className={formStyles.closeButton} onClick={closePopup}>
//             &times;
//           </button>
//           <p>Thanks for submitting your article! We will sned an Email after your suggest is approve.</p>
//         </div>
//       )}
//     </div>
//   );
// };
// };

// export default NewDiscussion;

import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import { createSubmit } from "@/api/submit";

const NewDiscussion = () => {

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const status = "unreview";

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authorsString = authors.join(", "); //connect the authors by ',' and turn array to string

    
    const subArticle = JSON.stringify ({
      title,
      authors: authorsString,
      source,
      publication_year: pubYear,
      doi,
      status,
    });
    console.log(subArticle)

    try {
      // Send the data to the server using createSubmit
      await createSubmit(subArticle);
    
    setTitle("");
    setAuthors([""]);
    setSource("");
    setPubYear(0);
    setDoi("");
    setShowPopup(true);
  } catch (error) {
    console.error("Submission error:", error);
  }
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