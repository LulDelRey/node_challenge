const simpleArticle = {
  author: {
    name: "Author Name",
    picture: "https://picture.url",
  },
  category: "Category",
  title: "Article title",
  summary: "This is a summary of the article",
  firstParagraph: "<p>This is the first paragraph of this article</p>",
};

const completeArticle = {
  author: {
    name: "Author Name",
    picture: "https://picture.url",
  },
  category: "Category",
  title: "Article title",
  summary: "This is a summary of the article",
  firstParagraph: "<p>This is the first paragraph of this article</p>",
  body: "<div><p>Second paragraph</p><p>Third paragraph</p></div>",
};

module.exports = {
  simpleArticle,
  completeArticle,
};
