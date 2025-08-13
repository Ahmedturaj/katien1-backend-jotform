import { v2 as cloudinary } from "cloudinary";
import config from "../config/index.js";
import multer from "multer";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export const sendImageToCloudinary = (imageName, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }

        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("File is deleted.");
          }
        });
      }
    );
  });
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
