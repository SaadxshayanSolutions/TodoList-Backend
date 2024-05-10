const { generateToken, generateResponse } = require("../Util/Toke");
const User = require("../model/userSchema");
const { response } = require("../response");

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, gender } = req.body;

    const userExists = await User.findOne({ mail: email });

    if (userExists) {
      return res.status(409).json(generateResponse(false, response.userExist));
    }

    const user = await User.create({
      firstName,
      lastName,
      mail: email,
      password,
      dob,
      gender,
    });

    if (user) {
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.mail,
        dob: user.dob,
        gender: user.gender,
        token: generateToken(user._id),
      };

      return res
        .status(200)
        .json(generateResponse(true, response.userCreated, data));
    }
  } catch (err) {
    return res.status(500).json(generateResponse(false, err.message));
  }
};

const authUser = async (req, res) => {
  try {
    const enteredData = req.body;

    const isUser = await User.findOne({ mail: enteredData.mail });

    if (isUser && (await isUser.matchPassword(enteredData.password))) {
      const data = {
        firstName: isUser.firstName,
        lastName: isUser.lastName,
        dob: isUser.dob,
        gender: isUser.gender,
        token: generateToken(isUser.id),
      };

      return res
        .status(200)
        .json(generateResponse(true, response.signin, data));
    } else {
      return res
        .status(401)
        .json(generateResponse(false, response.failedSignin));
    }
  } catch (err) {
    return res.status(500).json(generateResponse(false, err.message));
  }
};

const loggedInUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const token = req.token;

    const user = await User.findOne({ _id: userId });

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      gender: user.gender,
      token: token,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = { signupUser, authUser, loggedInUser };
