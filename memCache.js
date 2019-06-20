const mcache = require("memory-cache");
module.exports = (expireInSeconds = 5, active = true) => (req, res, next) => {
  if (active) {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.setHeader("X-cache", "hit");
      res.send(cachedBody);
      return res.end();
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        mcache.put(key, body, 1000 * expireInSeconds);
        res.setHeader("X-cache", "miss");
        res.sendResponse(body);
      };
    }
  }

  next();
};
