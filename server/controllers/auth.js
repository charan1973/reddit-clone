const User = require("../models/User");
const {
  loginValidation,
} = require("../validator/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Check the criteria meets
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check email exists
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists)
    return res.status(400).json({ error: "username already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({
      message: "User registered",
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check user exists
  const findUser = await User.findOne(
    { username: req.body.username },
    "username email password"
  );
  if (!findUser)
    return res.status(400).json({ error: "Username/password is wrong" });

  const validatePassword = await bcrypt.compare(
    req.body.password,
    findUser.password
  );
  if (!validatePassword)
    return res.status(400).json({ error: "Username/Password is wrong" });

  const token = jwt.sign({ _id: findUser.id }, process.env.SECRET);
  res
    .header("auth-token", token)
    .json({
      token,
      user: {
        _id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      },
    });
};
