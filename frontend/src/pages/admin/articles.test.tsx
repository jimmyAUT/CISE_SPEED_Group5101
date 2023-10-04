// import React from "react";
// import { render, screen } from "@testing-library/react";
// import Articles from "./articles";
// import "@testing-library/jest-dom";
// // 模拟传递给组件的文章数据
// const mockArticles = [
//   {
//     _id: "1",
//     title: "Article 1",
//     authors: "Author 1",
//     source: "Source 1",
//     pubyear: "2023",
//     doi: "doi-1",
//     abstract: "Abstract 1",
//     comment: "Comment 1",
//     score: "5",
//   },
//   {
//     _id: "2",
//     title: "Article 2",
//     authors: "Author 2",
//     source: "Source 2",
//     pubyear: "2022",
//     doi: "doi-2",
//     abstract: "Abstract 2",
//     comment: "Comment 2",
//     score: "4",
//   },
// ];

// test("renders articles in a table", () => {
//   render(<Articles articles={mockArticles} />);

//   // 使用测试库查询元素
//   const tableElement = screen.getByRole("table");
//   const tableHeaders = screen.getAllByRole("columnheader");
//   const tableRows = screen.getAllByRole("row");

//   // 检查表格是否存在
//   expect(tableElement).toBeInTheDocument();

//   // 检查表头
//   expect(tableHeaders).toHaveLength(8); // 检查是否有8个表头单元格

//   // 检查表格行数（加上表头应该是数据长度 + 1）
//   expect(tableRows).toHaveLength(mockArticles.length + 1);

//   // 检查是否显示文章数据
//   mockArticles.forEach((article) => {
//     expect(screen.getByText(article.title)).toBeInTheDocument();
//     expect(screen.getByText(article.authors)).toBeInTheDocument();
//     expect(screen.getByText(article.source)).toBeInTheDocument();
//     expect(screen.getByText(article.pubyear)).toBeInTheDocument();
//     expect(screen.getByText(article.doi)).toBeInTheDocument();
//     expect(screen.getByText(article.abstract)).toBeInTheDocument();
//     expect(screen.getByText(article.comment)).toBeInTheDocument();
//     expect(screen.getByText(article.score)).toBeInTheDocument();
//   });
// });
