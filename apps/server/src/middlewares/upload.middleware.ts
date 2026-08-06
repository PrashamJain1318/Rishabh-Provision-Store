import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB Limit
  },
  fileFilter: (req, file, cb) => {
    const mimetype = file.mimetype.toLowerCase();
    const originalName = file.originalname.toLowerCase();

    // Explicitly reject prohibited extensions
    if (
      originalName.endsWith(".pdf") ||
      originalName.endsWith(".zip") ||
      originalName.endsWith(".exe") ||
      !allowedMimeTypes.includes(mimetype)
    ) {
      return cb(new Error("Invalid file format. Only JPG, JPEG, PNG, and WEBP image files are allowed."));
    }

    cb(null, true);
  },
});

export const uploadSingleImageMiddleware = uploadMiddleware.single("image");
export default uploadMiddleware;
