const nodemailer = require("nodemailer");

const sendMail = async (FullName, Email, res,)=>{
    const contactTemplate = `<div>
    <div>
      <h2 style="color: #00a859;">Welcome to Stackplus Technology</h2>
    </div>
    <ul>
      <li>Name: ${FullName}</li>
      <li>Email: ${Email}</li>
    </ul>
    <div>
      <p>
        Dear ${FullName},
      </p>
      <p>
        Welcome to our community! We are thrilled to have you on board.
      </p>
      <p>
        With your new account, you can explore all the features our website has to offer.
      </p>
      <p>
        If you have any questions or need assistance, feel free to contact us.
      </p>
    </div>
    <p style="color: #00a859;"><i>Stackplus Technology</i></p>
  </div>
`;

const transporter = nodemailer.createTransport({
   service : "gmail",
   auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD
   }
})
   
const mailOptions={
    from: process.env.GOOGLE_EMAIL,
    to: Email,
    subject: "Welcome to hello world",
    html: contactTemplate,
    text: "hello world community"
};
   try {
     await transporter.sendMail(mailOptions)
    // res.status(200).send({message : "email sent successfully"})
    
   } catch (error) {
    // res.status(500).send({message : "internal server error"})
   }

}




const SendOtp = async (Otp, FullName, Email) => {
  const contactTemplate = `<div>
    <div>
      <h2 style="color: brown;">ForgotPassword Request</h2>
    </div>
    <ul>
      <li>Name: ${FullName}</li>
      <li>Email: ${Email}</li>
    </ul>
    <div>
      <p>
        Dear ${FullName},
      </p>
      <p>
       We Received Your request for a password reset.
      </p>
      <p>
          Your OTP is: ${Otp}
      </p>
      <p>
        If you have any questions or need assistance, feel free to contact us.
      </p>
    </div>
    <p style="color: #brown;"><i>Stackplus Technology</i></p>
  </div>
`;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD, 
    },
  });

//   transporter.verify(function (error, success) {
//     if (error) {
//       console.error("Transporter verification failed:", error);
//     } else {
//       console.log("Transporter is ready to send messages");
//     }
//   });


  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: Email,
    subject: "Forgot Password Request",
    html: contactTemplate,
    text  : "Hello World Community"
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }

};

module.exports = {sendMail, SendOtp}