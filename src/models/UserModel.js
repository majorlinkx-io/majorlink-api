const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    
  },
  stageName: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    userPhoto:{
      type: String,
    },
    role: {
      type: String,
    },
    description: {
      type: String,
    },
    genre: {
      type: String,
    },
    instagram: {
      type: String,
    },
    soundcloud: {
      type: String,
    },
    twitter: {
      type: String,
    },
    spotify: {
      type: String,
    },
    applemusic: {
      type: String,
    },
  },
})
module.exports =  mongoose.model("User", userSchema)
