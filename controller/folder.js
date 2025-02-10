const Folder = require("../models/Folder");
const User = require("../models/User");
const fs = require("fs");
const ApiError = require("../utils/apiError");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be stored in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "_" +
        Date.now() +
        path.parse(file.originalname).ext
    ); // Unique filename
  },
});

// File filter function
// const fileFilter = (req, file, cb) => {
//   // Accept only specific file types

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"), false);
//   }
// };

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});
//add folder
const addFolder = async (req, res, next) => {
  const { name, files } = req.body;
  try {
    const folders = await Folder.find({ userId: req.user._id });
    console.log(folders.length);

    const folder = await Folder.create({
      maxSize: 100 / Number(folders.length),
      name,
      files,
      userId: req.user._id,
    });
    res.status(201).json(folder);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
//delete folder
const deleteFolder = async (req, res, next) => {
  try {
    const folderExist = await Folder.findOne({
      userId: req.user._id,
      _id: req.params.id,
    });
    if (!folderExist) {
      return next(new ApiError("folder not found...", 500));
    }
    await folderExist.files.map((x) => {
      const filePath = path.join(__dirname, "uploads", x.name);
      // Check if the file exists
      // Split the path into parts
      const parts = filePath.split(path.sep);

      // Remove the 'controller' part from the array
      const filteredParts = parts.filter((part) => part !== "controller");

      // Join the parts back together
      const newPath = filteredParts.join(path.sep);

      if (newPath) {
        fs.unlinkSync(newPath); // Delete the file
        console.log(`File ${x.name} deleted from uploads folder.`);
      }
    });
    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
    });

    return res.status(400).json("folder deleted...");
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
//get all folders
const getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({ userId: req.user._id });

    res.status(200).json(folders);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
//get folder
const getFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
    });

    res.status(200).json(folder);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
//add file to folder
const addFileToFolder = async (req, res, next) => {
  try {
    // console.log(req.file);

    const folder = await Folder.findOne({
      _id: req.params.folderId,
      userId: req.user._id,
    });
    if (!folder) {
      return next(new ApiError("folder not found", 500));
    }

    const update = await Folder.findOneAndUpdate(
      {
        _id: req.params.folderId,
        userId: req.user._id,
      },
      {
        $push: {
          files: {
            name: req.file.filename,
            size: req.file.size,
            type: req.file.mimetype,
          },
        },
      },
      {
        $set: {
          size: {
            $sum: "$files.size", // Sum up the sizes of all files in the `files` array
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(201).json(update);
  } catch (error) {
    console.log(error);

    return next(new ApiError(error.message, 500));
  }
};
//delete file fro folders
const deleteFileFromFolder = async (req, res, next) => {
  const { name } = req.params;
  try {
    const folder = await Folder.findOne({
      _id: req.params.folderId,
      userId: req.user._id,
    });
    if (!folder) {
      return next(new ApiError("folder not found", 500));
    }

    const update = await Folder.findOneAndUpdate(
      {
        _id: req.params.folderId,
        userId: req.user._id,
      },
      {
        $pull: {
          files: {
            name: name,
          },
        },
      },
      {
        $set: {
          size: {
            $sum: "$files.size", // Sum up the sizes of all files in the `files` array
          },
        },
      },
      {
        new: true,
      }
    );
    const filePath = path.join(__dirname, "uploads", name);
    // Split the path into parts
    const parts = filePath.split(path.sep);

    // Remove the 'controller' part from the array
    const filteredParts = parts.filter((part) => part !== "controller");

    // Join the parts back together
    const newPath = filteredParts.join(path.sep);
    if (fs.existsSync(newPath)) {
      // Check if the file exists
      fs.unlinkSync(newPath); // Delete the file
      console.log(`File ${name} deleted from uploads folder.`);
    } else {
      console.log(`File ${name} does not exist in uploads folder.`);
      return next(new ApiError("not file exist", 404));
    }
    res.status(201).json("file deleted");
  } catch (error) {
    console.log(error);

    return next(new ApiError(error.message, 500));
  }
};
//download file
const downloadFile = async (req, res, next) => {
  try {
    const fileName = req.params.name;
    const filePath = path.join(__dirname, "uploads", fileName);
    // Split the path into parts
    const parts = filePath.split(path.sep);

    // Remove the 'controller' part from the array
    const filteredParts = parts.filter((part) => part !== "controller");

    // Join the parts back together
    const newPath = filteredParts.join(path.sep);
    console.log(newPath);

    if (fs.existsSync(newPath)) {
      const fileStream = fs.createReadStream(newPath);
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      fileStream.pipe(res);
    } else {
      return next(new ApiError("file not found", 500));
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(error.message, 500));
  }
};

//send file from user to another user and create recieved folder
const sendFile = async (req, res) => {
  const { email } = req.body;
  const { folderId, file } = req.params;

  try {
    const userReciever = await User.findOne({ email: email });
    if (!userReciever) {
      return next(new ApiError("user not found", 500));
    }
    // console.log(req.body);
    const folder = await Folder.findById({ _id: folderId });
    if (!userReciever) {
      return next(new ApiError("folder not found", 500));
    }
    const fileExist = folder.files.filter((x) => x.name == file);
    // console.log(fileExist);
    const folder_exist = await Folder.findOne({
      name: "Received",
      userId: userReciever._id,
    });
    if (!folder_exist) {
      const folder_created = await Folder.create({
        name: "Received",
        userId: userReciever._id,
        files: fileExist,
      });
      return res.status(200).json(folder_created);
    } else {
      console.log("exist");

      const update = await Folder.findOneAndUpdate(
        {
          name: "Received",
          userId: userReciever._id,
        },
        {
          $push: {
            files: {
              name: fileExist[0].name,
              size: fileExist[0].size,
              type: fileExist[0].type,
            },
          },
        },
        {
          $set: {
            size: {
              $sum: "$files.size", // Sum up the sizes of all files in the `files` array
            },
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json(update);
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(error.message, 500));
  }
};
module.exports = {
  addFolder,
  getFolders,
  getFolder,
  upload,
  addFileToFolder,
  deleteFolder,
  sendFile,
  deleteFileFromFolder,
  downloadFile,
};
