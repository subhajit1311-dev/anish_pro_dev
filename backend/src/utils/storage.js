const path = require("path");
const fs = require("fs").promises;

const uploadDir = process.env.UPLOAD_DIR || "public/uploads";

async function ensureUploadDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function uploadToLocal(tmpPath, filename) {
  const dateDir = new Date().toISOString().slice(0, 10);
  const destDir = path.join(uploadDir, dateDir);
  await ensureUploadDir(destDir);
  const destFilename = `${Date.now()}-${filename.replace(/\s+/g, "_")}`;
  const destPath = path.join(destDir, destFilename);
  await fs.copyFile(tmpPath, destPath);
  try {
    await fs.unlink(tmpPath);
  } catch (e) {}

  // Return a URL path that matches `app.use('/uploads', express.static(...))`
  // If uploadDir is 'public/uploads', return `/uploads/<date>/<file>`
  const parts = destPath.split(path.sep);
  // find index of 'uploads' in path
  const uploadsIndex = parts.lastIndexOf("uploads");
  const publicPath = "/" + parts.slice(uploadsIndex).join("/");
  return publicPath.replace(/\\/g, "/");
}

module.exports = { uploadToLocal };

// Resolve a stored public fileUrl (e.g., /uploads/2025-09-15/123-file.pdf)
// to an absolute filesystem path based on UPLOAD_DIR.
function resolveFileUrlToPath(fileUrl) {
  if (!fileUrl) return null;
  const normalized = fileUrl.replace(/\\/g, "/");
  const idx = normalized.indexOf("/uploads/");
  if (idx === -1) return null;
  const relative = normalized.slice(idx + "/uploads/".length);
  const absolute = path.join(uploadDir, relative);
  return absolute;
}

module.exports.resolveFileUrlToPath = resolveFileUrlToPath;