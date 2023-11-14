import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const userController = (req, res) => {
  res.json({ message: "Hello User?!" });
};

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "Forbidden"));
  }

  try {
    if(req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUserInfo = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
      },
    }, { new: true });

    const userInfos = {
      id: updateUserInfo._id,
      username: updateUserInfo.username,
      email: updateUserInfo.email,
      profilePicture: updateUserInfo.profilePicture,
    };

    res
      .status(200)
      .json(userInfos);

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can delete only your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been deleted successfully!" })
  } catch (error) {
    next(error);
  }

};