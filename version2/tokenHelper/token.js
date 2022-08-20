const jwt = require("jsonwebtoken");
const tokenGenerate = (emailid) => {
  const token = jwt.sign({ emailid }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
const tokenValidator = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization.replace("Bearer ", "");
    //   console.log(bearer);
    const verified = jwt.verify(bearer, process.env.JWT_KEY);
    //   console.log(verified);
    next();
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  tokenGenerate,
  tokenValidator,
};
