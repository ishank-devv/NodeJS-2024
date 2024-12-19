const express = require("express");
const app = express();

// Advanced routing concepts
// 1. /ab?c - means b is optional over here due to ?, means "ac" will work as well
// /ac & /abc both will work
app.get("/ab?c", (req, res) => {
  res.send({ firstname: "ab?c", lastname: "Mehta" });
});

//bc is optional so /ad will work
app.get("/a(bc)?d", (req, res) => {
  res.send({ firstname: "a(bc)?d", lastname: "Mehta" });
});

// 2. /ab+c - means you can add as many b as you want to
// /abc & /abbbbbbc will both work
app.get("/ab+c", (req, res) => {
  res.send({ firstname: "ab+c", lastname: "mehta" });
});

// /abcbcbcd will work
app.get("/a(bc)+d", (req, res) => {
  res.send({ firstname: "a(bc)+d", lastname: "mehta" });
});

// 3. /ab*cd - /ab(anythinginbetween)cd will work
// /abcd & /abVARUNcd
app.get("/ab*cd", (req, res) => {
  res.send({ firstname: "abVARUNcd", lastname: "mehta" });
});

//4. if in the word, anywhere a letter is there it will work
// /cab
app.get(/a/, (req, res) => {
  res.send({ firstname: "/a/", lastname: "mehta" });
});

//REGEX
//5. /.*fly$/ - it wil work if anything starts with anything but surely ends with fly, dragonfly12 won't work
app.get(/.*fly$/, (req, res) => {
  res.send({ firstname: "endsWithFly", lastname: "mehta" });
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
