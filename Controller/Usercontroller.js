const UserModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail, SendOtp } = require("../Config/mailer");

const signup = async (req, res) => {
  const { FullName, Email, Password } = req.body;
  if (!FullName || !Email || !Password) {
    res.status(400).send({ message: "all field are mandatory" });
  } else {
    try {
      const validation = await UserModel.findOne({ Email });

      const HashPassword = await bcrypt.hash(Password, 10);
      // const cart = Array(300).fill(0);

      if (validation) {
        res.status(409).send({ message: "User already exist" });
      } else {
        const creatuser = await UserModel.create({
          // to create user
          FullName,
          Email,
          Password: HashPassword,
          CartData: {},
        });
        let SecretKey = process.env.JWT_SECRET;
        const generatetoken = jwt.sign(
          {
            user: {
              id: creatuser._id,
              FullName: creatuser.FullName,
              Email: creatuser.Email,
            },
          },
          SecretKey,
          { expiresIn: "1d" }
        );

        const createdUser = {
          FullName: creatuser.FullName,
          Email: creatuser.Email,
        };
        sendMail(FullName, Email);
        res.status(200).send({
          message: `account created successfully for ${createdUser.FullName}`,
          status: "success",
          success: "true",
          generatetoken,
        });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

// const signup = async (req, res) => {
//   const { FullName, Email, Password } = req.body;

//   let errors = [];
//   if (!FullName) errors.push("FullName is required");
//   if (!Email) errors.push("Email is required");
//   if (!Password) errors.push("Password is required");

//   if (errors.length > 0) {
//     return res.status(400).send({ message: errors.join(", "), status: false });
//   }

//   try {
//     const existingUser = await UserModel.findOne({ Email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .send({ message: "User already exists", status: false });
//     }

//     const hashedPassword = await bcrypt.hash(Password, 10);
//     await UserModel.create({ FullName, Email, Password: hashedPassword });

//     return res.status(201).send({
//       message: `Account created successfully for ${FullName}`,
//       status: true,
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return res
//       .status(500)
//       .send({ message: "Internal server error", status: false });
//   }
// };

const login = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    res.status(400).send({ message: "all field are mandatory" });
  } else {
    try {
      const getUser = await UserModel.findOne({ Email });
      if (getUser) {
        const comparePassword = await bcrypt.compare(
          Password,
          getUser.Password
        );
        let SecretKey = process.env.JWT_SECRET;
        const generatetoken = jwt.sign(
          {
            user: {
              id: getUser._id,
              FullName: getUser.FullName,
              Email: getUser.Email,
            },
          },
          SecretKey,
          { expiresIn: "1d" }
        );
        // const details = {
        //   FullName: getUser.FullName,
        //   Email: getUser.Email,
        //   Password: getUser.Password
        // }

        if (comparePassword) {
          res.status(200).send({
            message: `welcome ${getUser.FullName}`,
            generatetoken,
            status: "success",
          });
        } else {
          res.status(403).send({ message: "password does not match" });
        }
      } else {
        res
          .status(403)
          .send({ message: "invalid email user not found try create acc" });
      }
    } catch (error) {
      res.status(500).send({ message: "internal server error", error });
    }
  }
};

const EditAcc = async (req, res) => {
  const user = req.user;
  console.log("User : ", user);

  console.log("User Trying To Edit Acc : ", user);
  const { FullName, Email, Password } = req.body;
  if (!FullName || !Email || !Password) {
    res.status(400).send({ message: "All Fields are mandatory" });
  } else {
    try {
      const HashPassword = await bcrypt.hash(Password, 10);

      const newuser = await UserModel.findOneAndUpdate(
        { Email: user.Email },
        { FullName, Email, Password: HashPassword },
        { new: true }
      );
      if (newuser) {
        let SecretKey = process.env.JWT_SECRET;
        const generatetoken = jwt.sign(
          {
            user: {
              FullName: newuser.FullName,
              Email: newuser.Email,
            },
          },
          SecretKey,
          { expiresIn: "1d" }
        );
        res.status(200).send({
          message: "user updated sucessfully",
          generatetoken,
          status: "success",
        });
        console.log(newuser);
      } else {
        res.status(400).send({ message: "user is not found" });
      }
    } catch (error) {
      console.log("error updating user", error);
      res.status(500).send({ message: "internal server error" });
    }
  }
};
const getCurrentUser = async (req, res) => {
  const user = req.user;
  console.log("user : ", user);
  try {
    const fetchCurrentUser = await UserModel.findOne({ Email: user.Email });
    if (fetchCurrentUser) {
      const userDetails = {
        FullName: fetchCurrentUser.FullName,
        Email: fetchCurrentUser.Email,
        Password: fetchCurrentUser.Password,
      };
      res.status(200).send({ message: "User userDetails", userDetails });
    }
  } catch (error) {
    console.log("no ssee", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getOtp = async () => {
  const user = req.user;
  try {
    const getUser = await UserModel.findOne({ Email: user.Email });
    if (getUser) {
      const generateRandum = Math.floor(Math.random() * 9999);
      console.log("Random Number : ", generateRandum);
      SendOtp(generateRandum, getUser.FullName, getUser.Email);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const Delete = async (req, res) => {
  const user = req.user;

  //  console.log(user)

  const deleteuser = await UserModel.findOneAndDelete({ Email: user.Email });
  if (deleteuser) {
    console.log(deleteuser);
    res
      .status(400)
      .send({ message: "account deleted suceessfully", status: true });
  } else {
    res.status(400).send({ message: "user is not found" });
  }
};

// creating endpoint for adding product in cartdata
// const addtocart = async (req, res) => {
//   let userData = await UserModel.findOne({ _id: req.user.id });
//   userData.CartData[req.body.itemId] += 1;
//   await UserModel.findOneAndUpdate(
//     { _id: req.user.id },
//     { CartData: userData.CartData }
//   );
//   res.status(200).send("added");
// };

const addtocart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    const userData = await UserModel.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!userData.CartData || typeof userData.CartData !== "object") {
      userData.CartData = {};
    }

    const itemId = req.body.itemId;

    if (!itemId) {
      return res.status(400).send({ message: "Item ID is required" });
    }

    // Ensure CartData exists & update safely
    userData.CartData[itemId] = (userData.CartData[itemId] || 0) + 1;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { [`CartData.${itemId}`]: userData.CartData[itemId] } },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "Item added to cart", cart: updatedUser.CartData });
  } catch (error) {
    console.error("Error in addtocart:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const removefromcart = async (req, res) => {
  let userData = await UserModel.findOne({ _id: req.user.id });
  if (userData.CartData[req.body.itemId > 0])
    userData.CartData[req.body.itemId] -= 1;
  await UserModel.findOneAndDelete(
    { _id: req.user.id },
    { CartData: userData.CartData }
  );
  res.status(200).send("removed");
};

const getuser = async (req, res) => {
  const userData = await UserModel.findOne({ _id: req.user.id });
  console.log(userData);

  res.status(200).send(userData.CartData);
};

module.exports = {
  signup,
  login,
  EditAcc,
  Delete,
  getCurrentUser,
  getOtp,
  addtocart,
  removefromcart,
  getuser,
};
