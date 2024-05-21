const fs = require("fs");

exports.read = () => {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    throw error;
  }
};

exports.write = (users) => {
  fs.writeFileSync("data.json", JSON.stringify(users), "utf8");
};
