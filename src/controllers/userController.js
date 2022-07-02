const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")

exports.getAllUsers = (req, res) => {
  User.find().then((allUsers) => res.status(200).json(allUsers))
}

exports.getSingleUser = (req, res) => {
  const { stageName } = req.params

  User.findOne({ stageName: stageName })
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log("Error Getting User: ", err))
}

exports.loginUser = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: "Error Invalid Username or Password", success: false })
        return
      } else {
        const myuser = jwt.sign(
          {
            email: user.email,
            stageName: user.stageName,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
          },
          process.env.SECRET
        )

        res.status(200).json({ token: myuser, success: true })
      }
    })
    .catch((err) => console.log("Error Getting User: ", err))
}

exports.signupUser = (req, res) => {
  const { firstName, lastName, email, password, birthday, stageName } = req.body
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    birthday,
    stageName,
  })

  user
    .save()
    .then(() => {
      // now get the record from Mongoose -> newResults
      // then create the token
      User.findOne({ email: email, password: password })
      .then((user) => {
        if (!user) {
          res.status(401).send({message: "Error Invalid Username or Password", success: false})
          return
        } else {
          const newResults = jwt.sign(
            {
              email: user.email,
              stageName: user.stageName,
              firstName: user.firstName,
              lastName: user.lastName,
              userId: user._id,
            },
            process.env.SECRET
          )
  
          res.status(200).json({data: newResults, success: true})
        }
      })
    })
    .catch((err) => console.log("Error Saving User : ", err))
}

exports.createUserProfile = (req, res) => {
  const { stageName } = req.params
  const { profile } = req.body
  console.log(req.header('Authorization'))
if (!req.header('Authorization')){
  res.status(403).send('Missing Credentials')
  return
}
  // need to fix this ?
  const coded = req.header('Authorization').split(" ")[1]
  const decoded = jwt.verify(coded, process.env.SECRET)
  if (decoded.stageName !== stageName ){
    res.status(403).send('Access Denied')
    return
  }
  console.log(req.body)
  User.findOneAndUpdate(
    { stageName: stageName },
    { profile: profile },
    { returnOriginal: false }
  )
    .then((user) => {
      if(!user){
        res.status(401).send({ message: "Error Invalid StageName && Genre Required", success: false })
      }else{

        User.findOne({ stageName: stageName }).then((user) =>
          res.status(200).json({data: user ,success: true}))
        }
    })
    .catch((err) => console.log("Error Updating User : ", err))
}

exports.deleteUser = (req, res) => {
  const { stageName } = req.params
  User.findOneAndDelete({ stageName: stageName })
    .then((user) => res.status(200).send(user))
    .catch((err) => console.log("Error Deleting User :", err))
}
