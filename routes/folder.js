const express = require("express");
const {
  addFolder,
  getFolders,
  getFolder,
  addFileToFolder,
  upload,
  deleteFolder,
  sendFile,
  deleteFileFromFolder,
  downloadFile,
} = require("../controller/folder");
const { protect } = require("../middlewares/auth");
const router = express.Router();
router.post("/", protect, addFolder);
router.post("/file/:folderId", protect, upload.single("file"), addFileToFolder);
router.get("/", protect, getFolders);
router.get("/:id", protect, getFolder);
router.delete("/:id", protect, deleteFolder);
router.post("/send/:file/:folderId", protect, sendFile);
router.delete("/:name/:folderId", protect, deleteFileFromFolder);
router.get("/download/:name", protect, downloadFile);
module.exports = router;
