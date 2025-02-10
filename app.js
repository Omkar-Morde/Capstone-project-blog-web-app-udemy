const express = require("express");
const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse URL-encoded bodies (from forms)
app.use(express.urlencoded({ extended: true }));

// In-memory storage for blog posts
let posts = [];
let idCounter = 1;

// Home route: display all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Route to show the "Create New Post" form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Route to handle the creation of a new post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: idCounter++, title, content });
  res.redirect("/");
});

// Route to show the "Edit Post" form for a given post
app.get("/posts/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

// Route to handle the update of a post
app.post("/posts/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  let post = posts.find((p) => p.id === postId);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect("/");
});

// Route to handle deletion of a post
app.post("/posts/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
