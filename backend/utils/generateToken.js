const jwt = require("jsonwebtoken");

const generateAcessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expireIn: "15m" },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
};

module.exports = {
  generateAcessToken,
  generateRefreshToken,
};
