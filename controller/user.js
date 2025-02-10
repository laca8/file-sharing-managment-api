const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};
const addUser = async (req, res, next) => {
  try {
    const user = await User.create({ email: req.body.email });
    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
module.exports = {
  addUser,
};
