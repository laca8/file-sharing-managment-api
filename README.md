File Sharing Application
A Node.js application for managing files and folders with features for uploading, downloading, and organizing files securely.
Features

File upload using Multer
Folder creation and management
File download capabilities
Secure file handling
File deletion
Folder navigation

Tech Stack

Node.js
Express.js
Multer (file handling)
MongoDB (for storing file metadata)

Prerequisites

Node.js 
MongoDB
npm

API Endpoints
Folders
Create Folder
httpCopyPOST /api/folders
Body:
jsonCopy{
  "name": "My Folder",
  "userId":req.user._id

}

#Get Folders
httpCopyGET /api/folders
#Get Single Folder
httpCopyGET /api/folders/:id
#Delete Folder
httpCopyDELETE /api/folders/:id
#Files
Upload File
httpCopyPOST /api/file/:folderId
Form-data:
file: (file)
folderId: req.params.folderId
#Download File
httpCopyGET /api/folder/download/:name
#Delete File
httpCopyDelete /api/folder/:name/:folderId
#Send File
httpCopyPost api/folder/send/:file/:folderId
