const Demography = require("../../models/international/Demography");
var fs = require("fs");
const request = require("request");
const path = require("path");
const getData = async (req, res) => {
  try {
    const data = await Demography.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
const importData = async (req, res) => {
  const { json } = req.body;
  console.log(json);
  try {
    await Demography.deleteMany();

    request(
      {
        url: json,
        json: true,
      },
      async (err, res, data) => {
        if (err) {
          console.log(err);
          //res.send({ msg: err.message });
        }
        //console.log(data);
        const createdData = await Demography.insertMany(data);
        //res.send("data imported");
      }
    );
    res.json("Data Imported");

    //console.log("Data Imported");
  } catch (err) {
    //console.error(`${err}`);
    res.json({ msg: err.message });
    process.exit(1);
  }
};
module.exports = {
  getData,
  importData,
};
