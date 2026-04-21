const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "please enter a valid email"],
      index: true
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      index: true
    },
    blocked: {
      type: Boolean,
      default: false,
      index: true
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.index({role: 1,blocked: 1});

// hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// match user entered password to Hashed password

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
