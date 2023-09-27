import { ArticleInterface } from "./index";

let reviews: ArticleInterface[] = [];

export const getReviews = (): ArticleInterface[] => reviews;

export const addReview = (article: ArticleInterface) => {
    reviews.push(article);
};
