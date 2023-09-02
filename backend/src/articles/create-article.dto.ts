/* eslint-disable prettier/prettier */
// 数据传输对象（DTO）：DTO 是一种对象，用于在客户端和服务器之间传输数据。它定义了客户
// 端和服务器之间的数据格式，可以用于验证和限制传输的数据。DTO 可以帮助有效地传递和处理数据，
// 并确保数据的完整性和有效性

export class CreateArticleDto {
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}
