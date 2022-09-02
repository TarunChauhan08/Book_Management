const express = require("express");
const app = express();
const port = 8081;
app.use(express.json());

// const { users } = require("./data/users.json");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
app.use("/users", usersRouter);
app.use("/books", booksRouter);
// app.get("/users", (req, res) => {
//   res.status(201).json({
//     success: true,
//     data: users,
//   });
// });
// app.get("/books", (req, res) => {
//   res.status(201).json({
//     success: true,
//     data: books,
//   });
// });

// app.get("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "This User is not present ",
//     });
//   }
//   res.status(201).json({
//     success: true,
//     data: user,
//   });
// });

// app.put("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "This User is not present ",
//     });
//   }
//   const updateUser = users.map((each) => {
//     // here .map((each) means we are getting through all the objects
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//     // return each; means return every object
//   });
//   return res.status(201).json({
//     success: true,
//     data: updateUser,
//   });
// });
// app.post("/users", (req, res) => {
//   const { data } = req.body;
//   const user = users.find((each) => each.id === data.id);
//   if (user) {
//     return res.status(405).json({
//       success: false,
//       message: "user already exist",
//     });
//   }
//   users.push({
//     ...data,
//   });
//   return res.status(201).json({
//     success: true,
//     data: users,
//   });
// });
// app.delete("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => {
//     each.id === id;
//   });
//   if (!user) {
//     success: false;
//     message: "user not found";
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);
//   res.status(201).json({
//     success: true,
//     message: "User deleted",
//     data: users
//   });
// });

app.listen(port, () => {
  console.log(`Node started at ${port}`);
});
