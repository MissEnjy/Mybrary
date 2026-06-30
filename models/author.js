const mongoose = require("mongoose");
const Book = require("./book");
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre("deleteOne", async function (next) {
  let books;
  try {
    books = await Book.find({ author: this.id });
  } catch (err) {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error("This author has books - delete the books first."));
    } else {
      next();
    }
  }
});

module.exports = mongoose.model("Author", authorSchema);

(err, books) => {};
