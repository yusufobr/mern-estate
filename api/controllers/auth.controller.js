import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  console.log(hashedPassword);
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const userInfos = {
      id: validUser._id,
      username: validUser.username,
      email: validUser.email,
    };

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userInfos);
  } catch (error) {
    next(error);
  }
};
