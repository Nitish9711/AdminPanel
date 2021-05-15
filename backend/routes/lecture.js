const express = require("express");


const Lecture = require("../models/lecture");
const lectureController = require("../controllers/lecture");

const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "nitishkumar12c",
  api_key: "167876133873855",
  api_secret: "akmb3c21BCoxTdddGONzUKy0bxI",
});

router.get("", lectureController.getLectures);

router.post("", upload.single("imagePath"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, async function (result) {
    const lecture = new Lecture({
      name: req.body.name,
      profession: req.body.profession,
      lectureTitle: req.body.lectureTitle,
      date: {
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
      },
      regLink: req.body.regLink,
      status: req.body.status,
      imagePath: result.secure_url,
      cloudImageId: result.public_id,
      time: req.body.time,
    });
   
    b = lecture;
    await lecture.save().then((createdPost) => {
      res.status(201).json({ b });
    });
  });
});

router.delete("/:id", function (req, res) {
  Lecture.findById(req.params.id, async function (err, lecture) {
    if (err) {
      console.log(err);
    } else {
      try {
        await cloudinary.v2.uploader.destroy(lecture.cloudImageId);
        lecture.remove();
        res.status(200).json({ message: "Lecture deleted!" });
      } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  });
});

router.get("/:id", lectureController.findLecture);

router.put("/:id", upload.single("imagePath"), function (req, res) {
  Lecture.findById(req.params.id, async function (err, lecture) {
    if (err) {
      console.log(err);
    } else {
      if (req.file) {
        try {
          await cloudinary.v2.uploader.destroy(lecture.cloudImageId);
          var result = await cloudinary.v2.uploader.upload(req.file.path);
          lecture.cloudImageId = result.public_id;
          lecture.imagePath = result.secure_url;
        } catch (err) {
          console.log(err);
        }
      }
      lecture.name = req.body.name;
      lecture.profession = req.body.profession;
      lecture.lectureTitle = req.body.lectureTitle;
      lecture.date = {
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
      };
      lecture.regLink = req.body.regLink;
      lecture.status = req.body.status;
      lecture.time = req.body.time;
      lecture.save();
      res.status(200).json({ lecture });
    }
  });
});

module.exports = router;
