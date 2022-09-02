const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();
/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: none
 */
router.get("/", (req, res) => {
  res.status(201).json({
    success: true,
    data: books,
  });
});
/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id == id);
  if (!book)
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  return res.status(202).json({
    success: true,
    data: book,
  });
});
/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", (req, res) => {
  const userwithIssuedbook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  userwithIssuedbook.map((each) => {
    const book = books.find((booke) => booke.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "No books issued yet",
    });
  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});
/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parameters: none
 * Data: author, name, genre, price, publisher, id
 */
router.post("/", (req, res) => {
  const { data } = req.body;
  const book = books.find((ekekkarke) => ekekkarke.id == data.id);
  books.push({
    ...data,
  });
  return res.status(201).json({
    success: true,
    data: books,
  });
});
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book
 * Access: Public
 * Parameters: id
 * Data: author, name, genre, price, publisher, id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((ekekkarke) => ekekkarke.id == id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "This book is not present ",
    });
  }
  const updateBook = books.map((ekekkarke) => {
    if (ekekkarke.id === id) {
      return {
        ...ekekkarke,
        ...data,
      };
    }
    return ekekkarke;
  });

  return res.status(201).json({
    success: true,
    data: updateBook,
  });
});
router.get("/issuedbook/fine", (req, res) => {
  const userwithIssuedbook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const getDateInDays = (Data = "") => {
    let date;
    if (Data === "") {
      date = new Date();
    } else {
      date = new Date(Data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const bookwithFine = [];
  userwithIssuedbook.map((each) => {
    const book = books.find((eache) => {
      if (eache.id === each.issuedBook) {
        let currentDate = getDateInDays();
        console.log(currentDate);
        let returnDate = getDateInDays(each.returnDate);
        console.log(returnDate);
        if (returnDate <= currentDate) {
          bookwithFine.push(eache);
        }
        console.log(bookwithFine);
        
      }
    });
  });
  res.status(201).json({
    success: true,

    bookwithFine,
  });
});

module.exports = router;
