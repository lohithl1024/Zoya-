const fs = require("fs");
const path = require("path");

// Render allows writes ONLY in /tmp
const filePath = path.join("/tmp", "tasks.json");

// Ensure file exists
const ensureFileExists = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
};

const readTasks = () => {
    ensureFileExists();
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

const writeTasks = (tasks) => {
    ensureFileExists();
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

module.exports = {
    readTasks,
    writeTasks,
};