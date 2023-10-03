import { GetStaticProps, NextPage, GetServerSideProps } from "next";
import SortableTable from "../../components/table/SortableTable";
import { useState } from "react";
import { getArticles, removeArticle } from "@/api/articles";

interface ArticlesInterface {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  abstract: string;
  comment: string;
  score: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};
const Articles: NextPage<ArticlesProps> = ({ articles }) => {
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

  const [articlesData, setArticlesData] = useState(articles);

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
      <h1>Articles:</h1>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (
  _
) => {
  try {
    const articles = await getArticles();
    // articles.map(
    //   (article: {
    //     id: any;
    //     _id: any;
    //     title: any;
    //     authors: any;
    //     source: any;
    //     pubyear: any;
    //     doi: any;
    //     abstract: any;
    //     comment: any;
    //     score: any;
    //   }) => ({
    //     id: article.id ?? article._id,
    //     title: article.title,
    //     authors: article.authors,
    //     source: article.source,
    //     pubyear: article.pubyear,
    //     doi: article.doi,
    //     abstract: article.abstract,
    //     comment: article.comment,
    //     score: article.score,
    //   })
    // );
    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [{ title: "No article found" }],
      },
    };
  }
};

export default Articles;
