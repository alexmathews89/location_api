const mongoose = require("mongoose");

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

let Location = mongoose.model("Location", locationSchema);
let User = mongoose.model("User", userSchema);

module.exports.Location = Location;
module.exports.User = User;
