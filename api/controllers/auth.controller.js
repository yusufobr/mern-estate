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
      profilePicture: validUser.profilePicture || "",
    };

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userInfos);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ message: "Signout successfully!" });
    
  } catch (error) {
    next(error);
  }
}

export const google = async (req, res, next) => {
  const { name, email, photo, googleId } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      const generateRaomPassword = Math.random().toString(36).slice(-8);
      
      const splitName = name.split(" ")
      const generatedUsername = splitName[0] + Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: generatedUsername.toLowerCase(),
        email,
        password: bcryptjs.hashSync(generateRaomPassword, 10),
        profilePicture: photo,
        googleId,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const userInfos = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      };

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userInfos);


    } else {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      // add photo to user if not exist
      if (!validUser.profilePicture || validUser.profilePicture === "") {
        validUser.profilePicture = photo;
        await validUser.save();
      }

      if (!validUser.googleId || validUser.googleId === "") {
        validUser.googleId = googleId;
        await validUser.save();
      }

      const userInfos = {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        profilePicture: validUser.profilePicture || photo,
      };

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userInfos);
    }
  } catch (error) {
    next(error);
  }
}
