const express = require("express");
const app = express();

// middleware
app.use(express.json());

// routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// base routes
app.get("/", (req, res) => {
    res.send("Zoya backend is running 🚀");
});

app.get("/health", (req, res) => {
    res.json({ status: "Zoya backend healthy 💚" });
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});