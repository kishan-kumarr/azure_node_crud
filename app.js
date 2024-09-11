import express from "express";
import "dotenv/config"

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(200).json({success: true, message: "I am working... at home"});
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});