const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const s3 = require("../config/aws");
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

router.post("/addProject/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const imageSrc = req.file;
  const { title, description, stack, url } = req.body;

  if (!imageSrc || !title || !description || !stack || !url) {
    res.status(400).json({ message: "All required fields are to be given!" });
    return;
  }

  if (req.file) {
    const s3Params = {
      Bucket: "yourownbucket",
      Key: `${Date.now()}-${req.file?.originalname}`,
      Body: req.file.buffer,
      ACL: "public-read",
    };

    const s3Data = await s3.upload(s3Params).promise();
    profileImageUrl = s3Data.Location;
  }

  try {
    const project = new Project({
      _id: id,
      imageUrl: profileImageUrl,
      title,
      description,
      stack,
      url,
    });

    await project.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding project" });
  }
});

router.get("/allProject", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving projects" });
  }
});

module.exports = router;
