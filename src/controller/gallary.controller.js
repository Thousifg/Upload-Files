const express = require("express");

const Gallery = require("../model/gallery.model");

const upload = require("../middlewares/upload");

const router = express.Router();

const fs = require("fs");

router.post("/", upload.any("pictures"), async (req, res) => {
  const filePaths = req.files.map((file) => file.path);
  try {
    const gallery = await Gallery.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_id: req.body.user_id,
      pictures: filePaths,
    });

    return res.status(201).json({ gallery });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("", async (req, res) => {
  try {
    // const gallery = await Gallery.find().populate({path: "user_id", select: "first_name last_name"}).lean().exec();
    const gallery = await Gallery.find().lean().exec();
    res.status(201).send(gallery);
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    res.send(gallery);
    for (let i = 0; i < gallery.pictures.length; i++) {
      fs.unlinkSync(gallery.pictures[i]); //The fs.unlinkSync() method is used to synchronously remove a file or symbolic link from the filesystem
    }
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
