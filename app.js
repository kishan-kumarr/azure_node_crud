import express from "express";

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
    res.status(200).json({success: true, message: "I am working..."});
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});