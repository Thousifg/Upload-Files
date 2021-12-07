const express = require("express");

const User = require("../model/user.model");

const upload = require("../middlewares/upload");

const router = express.Router();

const fs = require("fs");

// router.post("/",upload.single("profilImage"), async (req, res) => { //productImages - name anythings fine
//     try{
//         const user = await User.create({
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             profile_pic: req.file.path,
//         });

//         return res.status(201).json({user})
//     }catch(e){
//         return res.status(500).json({ status:"failed",message: e.message });
//     }
// });

router.post("", upload.single("profile_pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    res.status(200).send(user);
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).send(users);
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.patch("/:id", upload.single("profile_image"), async (req, res) => {
  try {
    const userone = await User.findById(req.params.id).lean().exec();
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body?.first_name,
        last_name: req.body?.last_name,
        profile_image: req.file?.path,
      },
      { new: true }
    )
      .lean()
      .exec();
    res.status(200).send(user);
    if (req.file?.path) {
      fs.unlinkSync(userone.profile_image);
    }
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    res.send(user);
    fs.unlinkSync(user.profile_image);
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;
