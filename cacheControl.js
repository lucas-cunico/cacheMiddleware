const mime = require("mime-types");

module.exports = {
  maxAge: "1d",
  setHeaders: (res, path) => {
    const filemime = mime.lookup(path);
    if (/\.(jpe?g|png|gif|bmp|ico|svg)$/i.test(filemime)) {
      res.setHeader("Cache-Control", "public, max-age=31536000"); // one year
    } else if (/\.(eot|ttf|woff|woff2)$/i.test(filemime)) {
      res.setHeader("Cache-Control", "public, max-age=31536000"); // one year
    } else if (/\.(mp4|mpeg)$/i.test(filemime)) {
      res.setHeader("Cache-Control", "public, max-age=31536000"); // one year
    } else if (/\.(js)$/i.test(filemime)) {
      res.setHeader("Cache-Control", "public, max-age=2628000"); // one month
    } else {
      res.setHeader("Cache-Control", "public, max-age=2628000"); // one month
    }
  }
};
