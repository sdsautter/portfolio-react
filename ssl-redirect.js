module.exports = (environments = 'production', status = 302) => {
  return (req, res, next) => {
    if (environments.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(status, `https://${req.hostname}${req.originalUrl}`);
      } else {
        next();
      }
    } else {
      next();
    }
  };
};
