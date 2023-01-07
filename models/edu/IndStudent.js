const mongoose = require("mongoose");
const IndStudent = new mongoose.Schema({
  المحافظة: {
    type: String,
  },
  النوع: {
    type: String,
  },
  "تبعية المدرسة": {
    type: String,
  },
  السنة: {
    type: String,
  },
  "عدد التلاميذ": {
    type: String,
  },
  "محل الإقامة": {
    type: String,
  },
});
module.exports = mongoose.model("indstudent", IndStudent);
