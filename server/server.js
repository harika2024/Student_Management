const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/studentdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch(() => console.log("error"));

const studentList = mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
});

const Student = mongoose.model("student", studentList);

app.get("/api", async (req, res) => {
  const result = await Student.find();
  res.json(result);
});

app.post("/api", async (req, res) => {
  const cnt = await Student.find().count();
  const stu = new Student({
    _id: cnt + 1,
    name: req.body.name,
    email: req.body.email,
  });
  await stu.save();
  res.json(stu);
  console.log("added");
});

app.patch("/api/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  const stu = await Student.find({ _id: studentId });
  if (!stu) {
    res.json({ message: "error message" });
  }

  Name = req.body.name;
  Email = req.body.email;

  await Student.updateOne(
    { _id: studentId },
    { $set: { name: Name, email: Email } }
  );
  res.json({ message: "updated" });
});

app.delete("/api/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  const stu = await Student.find({ _id: studentId });
  if (!stu) res.json({ message: "error message" });

  await Student.deleteOne({ _id: studentId });
  res.json({ message: "deleted" });
});

app.listen(5500, () => {
  console.log("sever has started");
});
