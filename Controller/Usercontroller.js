const UserModel = require("../Model/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {sendMail, SendOtp} = require("../Config/mailer")




const signup = async (req, res) => {
  const { FullName, Email, Password } = req.body
  if (!FullName || !Email || !Password) {
    res.status(400).send({ message: "all field are mandatory" })
  } else {
    try {

      const validation = await UserModel.findOne({ Email })

      const HashPassword = await bcrypt.hash(Password, 10)

      if (validation) {
        res.status(404).send({ message: "already exist user" })
      } else {
        const creatuser = await UserModel.create({    // to create user
          FullName,
          Email,
          Password: HashPassword,

        })

        const createdUser = {
          FullName: creatuser.FullName,
          Email: creatuser.Email

        }
        sendMail(FullName, Email)
        res.status(200).send({ message: `account created successfully for ${createdUser.FullName}`, status: "success" });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' })
    }
  }

}



const login = async (req, res) => {
  const { Email, Password } = req.body
  if (!Email || !Password) {
    res.status(400).send({ message: "all field are mandatory" })
  } else {
    try {
      const getUser = await UserModel.findOne({ Email })
      if (getUser) {
        const comparePassword = await bcrypt.compare(Password, getUser.Password);
        let SecretKey = process.env.JWT_SECRET
        const generatetoken = jwt.sign({
          user: {
            FullName: getUser.FullName,
            Email: getUser.Email,
          },

        },
          SecretKey,
          { expiresIn: "1d" }
        )
        // const details = {
        //   FullName: getUser.FullName,
        //   Email: getUser.Email,
        //   Password: getUser.Password
        // }

        if (comparePassword) {
          res.status(200).send({ message: `welcome ${getUser.FullName}`, generatetoken, status: "success"  });

        } else {
          res.status(403).send({ message: "password does not match" });
        }
      } else {
        res.status(403).send({ message: "invalid email user not found try create acc" });
      }
    } catch (error) {
      res.status(500).send({ message: "internal server error", error });
    }
  }
}


const EditAcc = async (req, res) => {
  const user = req.user;
  console.log("User : ", user)

  console.log("User Trying To Edit Acc : ", user);
  const { FullName, Email, Password } = req.body;
  if (!FullName || !Email || !Password) {
    res.status(400).send({ message: "All Fields are mandatory" });
  } else {
    try {
      const HashPassword = await bcrypt.hash(Password, 10)

      const newuser = await UserModel.findOneAndUpdate({ Email: user.Email }, { FullName, Email, Password: HashPassword }, { new: true });
      if (newuser) {
      //   let SecretKey = process.env.JWT_SECRET
      // const generatetoken = jwt.sign({
      //   user: {
      //     FullName: newuser.FullName,
      //     Email: newuser.Email,
      //   },

      // },
      //   SecretKey,
      //   { expiresIn: "1d" }
      // )
        res.status(200).send({ message: "user updated sucessfully", generatetoken, status:"success" })
        console.log(newuser)
      } else {
        res.status(400).send({ message: "user is not found" })
      }
    } catch (error) {
      console.log("error updating user", error)
      res.status(500).send({ message: "internal server error" })
    }

  }

};
const getCurrentUser = async (req, res) => {
  const user = req.user;
  console.log(user)
  try {
    const fetchCurrentUser = await UserModel.findOne({Email: user.Email });
    if (fetchCurrentUser) {
      const userDetails = {
        FullName: fetchCurrentUser.FullName,
        Email: fetchCurrentUser.Email,
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
    const getUser = await UserModel.findOne({Email: user.Email });
    if(getUser){
      const generateRandum =  Math.floor(Math.random() * 9999)
console.log("Random Number : ", generateRandum)
SendOtp(generateRandum, getUser.FullName, getUser.Email)
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const Delete = async (req, res) => {
  const user = req.user


  //  console.log(user)

  const deleteuser = await UserModel.findOneAndDelete({Email: user.Email})
  if (deleteuser) {
    console.log(deleteuser)
    res.status(400).send({ message: "account deleted suceessfully"})
  } else {
    res.status(400).send({ message: "user is not found" })
  }

};





module.exports = { signup, login, EditAcc, Delete, getCurrentUser, getOtp}
