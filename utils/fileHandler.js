const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data");
const filePath = path.join(dataDir, "tasks.json");

// Ensure data directory & file exist
const ensureFileExists = () => {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
};

// Read tasks safely
const readTasks = () => {
    ensureFileExists();
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

// Write tasks safely
const writeTasks = (tasks) => {
    ensureFileExists();
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

module.exports = {
    readTasks,
    writeTasks,
};