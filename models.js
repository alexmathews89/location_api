const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let locationSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  LocatedAt: {
    FromStadiums: String,
    CitySubdivision: String,
  },
  DateNamed: String,
  ImagePath: String,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String },
  Birthday: Date,
  FavoriteLocations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  ],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Location = mongoose.model("Location", locationSchema);
let User = mongoose.model("User", userSchema);

module.exports.Location = Location;
module.exports.User = User;
