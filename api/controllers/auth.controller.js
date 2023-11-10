import User from "../models/user.model.js";
import hashPassword from "../utils/hashPassword.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: await hashPassword(password),
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};
