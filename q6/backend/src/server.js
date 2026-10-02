const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors());
const PORT = 8080;

app.get("/api/health", (req, res) => {
    res.send("Healthy");
});

app.get("/api/shows", async (req, res) => {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();

    const limitedShows = data.slice(0, 25);

    res.json(limitedShows);
});

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})