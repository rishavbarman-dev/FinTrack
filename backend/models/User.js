const mongoose = require("mongoose");

const bycrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user model
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bycrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
