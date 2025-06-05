const mongoose = require("mongoose");
const Models = require("./models.js");

const Locations = Models.Location;
const Users = Models.User;

/** 
mongoose.connect("mongodb://localhost:27017/locationDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const uuid = require("uuid");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());

let auth = require("./auth.js")(app);
const passport = require("passport");
require("./passport.js");

/**let users = [
  {
    Username: "Mary",
    UserID: 1,
    FavoriteLocations: [],
  },
];

let locations = [
  {
    Title: "Magnuson Park",
    Description:
      "First surveyed in 1855, one of Seattle’s largest parks was once home to a boat building company in the 1880s back when it was known as Sand Point peninsula and just before 1890, Pontiac Brick & Tile Company was established there as well where it would remain until the early 1900s.  Not long after, Seattle’s first airfield began it’s construction there in 1920 and remained active until the 1990s.  Magnuson Park acquired its name in 1977 and was named after Senator Warren Magnuson.  Magnuson park is also known for bird watching as well as Kite Hill, the National Oceanic and Atmospheric Administration’s Western Regional Center, and during certain times of year, the marsh ponds.",
    LocatedAt: { FromStadiums: "East", CitySubdivision: "Sand Point" },
    DateNamed: "1977",
  },
  {
    Title: "Discovery Park",
    Description:
      "Discovery park is Seattle’s largest park and wasn’t considered city property until 1973.  It is home to Daybreak Star which contains an art gallery and the visitors center has information about the park’s history.  Many of the trees here are the bigleaf maple and as far as wildlife goes, there is a small population of blue heron, as well as cormorants and bald eagles.  There is also a view of the Puget Sound here in the park.",
    LocatedAt: { FromStadiums: "West", CitySubdivision: "Magnolia" },
    DateNamed: "1973",
  },
  {
    Title: "Capitol Hill",
    Description:
      "There are many desirable locations in Capitol Hill, one of them is Louisa Boren park which has a view of Lake Washington, the Cascade Mountains, and Union Bay.  Capitol Hill acquired its name in 1901.  In 1914, Cornish College of Arts was started by Nellie Cornish in this part of Seattle and the Cornish College dance and music department is still located here while the school’s main campus is in the Denny Triangle neighborhood.  Volunteer Park is also located in Capitol Hill and also received its name in 1901 and is now one of the most popular public areas of Seattle.  Volunteer Park has some of its own locations such as the original Seattle Art Museum and Volunteer Park Conservatory.",
    LocatedAt: { FromStadiums: "East" },
    DateNamed: "1901",
  },
  {
    Title: "West Seattle",
    Description:
      "One of the first places in West Seattle to receive its name was Alki Point which was named in 1853, however, it wasn’t until 1901 when West Seattle would officially become part of the city of Seattle after Alki initially developed as a resort community.  In 1908, 30 acres of land was given to the city which would become the initial development of Schmitz Preserve Park.  Located in Alki Point is also a geological feature known as Blakely Formation which is a sandstone somewhere around 25 million years old.  Alki Point is also where you will find the Alki Lighthouse.  Outside of Alki Point, West Seattle is also known for Lincoln Park.",
    LocatedAt: { FromStadiums: "West" },
    DateNamed: "1901",
  },
  {
    Title: "Green Lake",
    Description:
      "Green Lake was once connected to Lake Washington by the Ravenna Creek which is now known as Ravenna Blvd which leads to Ravenna Park.  At one time, Green Lake was larger than it is now and used to cover what is now the main parking lot, baseball/soccer fields, and the community center.",
    LocatedAt: { FromStadiums: "West", CitySubdivision: "Phinney Ridge" },
    DateNamed: "1911",
  },
  {
    Title: "Beacon Hill",
    Description:
      "Some of the first roads built in the area were in Beacon Hill.  Jose Rizal Park is located here and  became park property in 1971.  Seattle Central College has its satellite campus in Beacon Hill which was a medical center beforehand.  A lot of the cities industrial areas are located here and other parts of south downtown.  The Beacon Hill branch of the Seattle Public Library is also located here and was built with the same material as Seattle’s downtown library.",
    LocatedAt: { FromStadiums: "South" },
    DateNamed: "1869",
  },
  {
    Title: "Lake Union",
    Description:
      "Originally, Lake union received its name in 1854 by Thomas Mercer.  The meaning behind the name came from the thought that it would link salt water and fresh water.  The distance around the lake is about six miles and one of the most popular locations on the lake is Gas Works Park.  One of the bridges that can be seen going over the lake is University Bridge and was originally opened in 1919.  Lake Union is known for many houseboats being located on the water and you will often be able to see water planes landing on the lake as well.",
    LocatedAt: { FromStadiums: "North" },
    DateNamed: "1854",
  },
  {
    Title: "Delridge",
    Description:
      "Before receiving its name, Delridge, this area was referred to as Youngstown in 1905 because of the Seattle Steel Company that was in this area at the time.  Youngstown was also the name of a steel making town in Ohio where the founders of the Seattle Steel Company were originally from.  In 1940, the name was changed to Delridge since steel was no longer as important to the community as it had been.  Some areas of interest in Delridge  are Longfellow Creek which passes through the West Seattle Golf Course and Greg Davis Park.  Delridge also has an art center known as the Youngstown Cultural Arts Center.",
    LocatedAt: { FromStadiums: "South" },
    DateNamed: "1940",
  },
  {
    Title: "Elliott Bay",
    Description:
      "One of the most well known areas for visitors in the city runs along Elliott Bay which includes the Seattle Aquarium and the ferry terminal.  In 1905, this area was mainly made up of railroad tracks.  This location is where Seattle Steam was established in 1889, so buildings wouldn’t need to contain coal-fired boilers which increased the risk of fire.  Seattle Steam still heats some buildings the the downtown area.",
    LocatedAt: { FromStadiums: "West", CitySubdivision: "Belltown/Downtown" },
    DateNamed: "1850",
  },
  {
    Title: "Downtown Seattle",
    Description:
      "In addition to the stadiums, downtown Seattle is made up of many other features.  Many people notice the street clocks which were built in the 1920s and there is also a clock built inside the shape of a question mark on the intersection of 5th ave and Pine street which was built in the 1990s.  Many of the street’s hatch covers in the downtown area are covered with artwork and also maps of the downtown area.  The Rainier Tower is located downtown and this was the original location of the University of Washington back in the 19th century.",
    LocatedAt: { FromStadiums: "South" },
    DateNamed: "1850",
  },
];  */

// GET Requests

app.get("/", (req, res) => {
  res.send("Welcome to my Locations API");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get(
  "/locations",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Locations.find()
      .then((locations) => {
        res.status(201).json(locations);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/locations/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Locations.findOne({ Title: req.params.title })
      .then((location) => {
        res.json(location);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/locations/locatedat/:direction",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Locations.find({ "LocatedAt.FromStadiums": req.params.direction })
      .then((location) => {
        res.json(location);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//CREATE Requests

app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Adds a location to a users list of favorites
app.post(
  "/users/:Username/locations/:locationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteLocations: req.params.locationID } },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// UPDATE Requests

app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// DELETE Requests

//Removes a location from a users list of favorites
app.delete(
  "/users/:Username/locations/:locationID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteLocations: req.params.locationID } },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Listens for requests through an evironment variable

/** 
app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
*/

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
