const Ind = require("../../../models/edu/classes/Ind");
var fs = require("fs");
const request = require("request");
const path = require("path");
const getClasses = async (req, res) => {
  try {
    const classes = await Ind.aggregate([
      {
        $group: {
          _id: {
            year: "$السنة",
          },

          total_classes_urban: {
            $sum: {
              $toInt: "$حضر",
            },
          },
          total_classes_rural: {
            $sum: {
              $toInt: "$ريف",
            },
          },
          total_classes_public: {
            $sum: {
              $toInt: "$حكومى",
            },
          },
          total_classes_private: {
            $sum: {
              $toInt: "$خاص",
            },
          },
        },
      },
    ]);

    res.json(classes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
const getClassesByCity = async (req, res) => {
  try {
    const classes = await Ind.aggregate([
      {
        $match: { المديرية: req.params.city },
      },
      {
        $group: {
          _id: {
            year: "$السنة",
          },

          total_classes_urban: {
            $sum: {
              $toInt: "$حضر",
            },
          },
          total_classes_rural: {
            $sum: {
              $toInt: "$ريف",
            },
          },
          total_classes_public: {
            $sum: {
              $toInt: "$حكومى",
            },
          },
          total_classes_private: {
            $sum: {
              $toInt: "$خاص",
            },
          },
        },
      },
    ]);

    res.json(classes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
const importData = async (req, res) => {
  const { json } = req.body;
  console.log(json);
  try {
    await Ind.deleteMany();

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
        const createdData = await Ind.insertMany(data);
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
  getClasses,
  getClassesByCity,
  importData,
};
