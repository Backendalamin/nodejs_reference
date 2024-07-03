const { error } = require("console");
const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoose
  .connect("mongodb://localhost:27017/dbconnect",  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoose connected"))
  .catch((error) => console.log(error))
  //schemas
  let blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

//models
const Blog = mongoose.model('blogs', blogSchema);

app.use(express.json())

app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.send({ blogs });
    } catch (error) {
        res.end({error: true, message: 'error occurred'})
    }

});

app.post("/blogs",async (req, res) => {
  //create blog
  try {
    await Blog.create(req.body)
    res.send({ success: true, message: "blog created" });
  } catch (error) {
    res.status(500).end({error: true, message: 'error occurred'})

  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server runningon port: ${port}`);
});
