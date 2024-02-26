import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port:${PORT}`)
});

//we changed it to mmjs to be able to use type:module
//to enable import keyword instead of require
