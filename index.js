const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

let topLocations = [
  {
    title: "Magnuson Park",
    descrition:
      "First surveyed in 1855, one of Seattle’s largest parks was once home to a boat building company in the 1880s back when it was known as Sand Point peninsula and just before 1890, Pontiac Brick & Tile Company was established there as well where it would remain until the early 1900s.  Not long after, Seattle’s first airfield began it’s construction there in 1920 and remained active until the 1990s.  Magnuson Park acquired its name in 1977 and was named after Senator Warren Magnuson.  Magnuson park is also known for bird watching as well as Kite Hill, the National Oceanic and Atmospheric Administration’s Western Regional Center, and during certain times of year, the marsh ponds.",
    locatedAt: { fromStadiums: "East", citySubdivision: "Sand Point" },
    dateNamed: "1977",
  },
  {
    title: "Discovery Park",
    descrition:
      "Discovery park is Seattle’s largest park and wasn’t considered city property until 1973.  It is home to Daybreak Star which contains an art gallery and the visitors center has information about the park’s history.  Many of the trees here are the bigleaf maple and as far as wildlife goes, there is a small population of blue heron, as well as cormorants and bald eagles.  There is also a view of the Puget Sound here in the park.",
    locatedAt: { fromStadiums: "West", citySubdivision: "Magnolia" },
    dateNamed: "1973",
  },
  {
    title: "Capitol Hill",
    descrition:
      "There are many desirable locations in Capitol Hill, one of them is Louisa Boren park which has a view of Lake Washington, the Cascade Mountains, and Union Bay.  Capitol Hill acquired its name in 1901.  In 1914, Cornish College of Arts was started by Nellie Cornish in this part of Seattle and the Cornish College dance and music department is still located here while the school’s main campus is in the Denny Triangle neighborhood.  Volunteer Park is also located in Capitol Hill and also received its name in 1901 and is now one of the most popular public areas of Seattle.  Volunteer Park has some of its own locations such as the original Seattle Art Museum and Volunteer Park Conservatory.",
    locatedAt: { fromStadiums: "East" },
    dateNamed: "1901",
  },
  {
    title: "West Seattle",
    descrition:
      "One of the first places in West Seattle to receive its name was Alki Point which was named in 1853, however, it wasn’t until 1901 when West Seattle would officially become part of the city of Seattle after Alki initially developed as a resort community.  In 1908, 30 acres of land was given to the city which would become the initial development of Schmitz Preserve Park.  Located in Alki Point is also a geological feature known as Blakely Formation which is a sandstone somewhere around 25 million years old.  Alki Point is also where you will find the Alki Lighthouse.  Outside of Alki Point, West Seattle is also known for Lincoln Park.",
    locatedAt: { fromStadiums: "West" },
    dateNamed: "1901",
  },
  {
    title: "Green Lake",
    descrition:
      "Green Lake was once connected to Lake Washington by the Ravenna Creek which is now known as Ravenna Blvd which leads to Ravenna Park.  At one time, Green Lake was larger than it is now and used to cover what is now the main parking lot, baseball/soccer fields, and the community center.",
    locatedAt: { fromStadiums: "West", citySubdivision: "Phinney Ridge" },
    dateNamed: "1911",
  },
  {
    title: "Beacon Hill",
    descrition:
      "Some of the first roads built in the area were in Beacon Hill.  Jose Rizal Park is located here and  became park property in 1971.  Seattle Central College has its satellite campus in Beacon Hill which was a medical center beforehand.  A lot of the cities industrial areas are located here and other parts of south downtown.  The Beacon Hill branch of the Seattle Public Library is also located here and was built with the same material as Seattle’s downtown library.",
    locatedAt: { fromStadiums: "South" },
    dateNamed: "1869",
  },
  {
    title: "Lake Union",
    descrition:
      "Originally, Lake union received its name in 1854 by Thomas Mercer.  The meaning behind the name came from the thought that it would link salt water and fresh water.  The distance around the lake is about six miles and one of the most popular locations on the lake is Gas Works Park.  One of the bridges that can be seen going over the lake is University Bridge and was originally opened in 1919.  Lake Union is known for many houseboats being located on the water and you will often be able to see water planes landing on the lake as well.",
    locatedAt: { fromStadiums: "North" },
    dateNamed: "1854",
  },
  {
    title: "Delridge",
    descrition:
      "Before receiving its name, Delridge, this area was referred to as Youngstown in 1905 because of the Seattle Steel Company that was in this area at the time.  Youngstown was also the name of a steel making town in Ohio where the founders of the Seattle Steel Company were originally from.  In 1940, the name was changed to Delridge since steel was no longer as important to the community as it had been.  Some areas of interest in Delridge  are Longfellow Creek which passes through the West Seattle Golf Course and Greg Davis Park.  Delridge also has an art center known as the Youngstown Cultural Arts Center.",
    locatedAt: { fromStadiums: "South" },
    dateNamed: "1940",
  },
  {
    title: "Elliott Bay",
    descrition:
      "One of the most well known areas for visitors in the city runs along Elliott Bay which includes the Seattle Aquarium and the ferry terminal.  In 1905, this area was mainly made up of railroad tracks.  This location is where Seattle Steam was established in 1889, so buildings wouldn’t need to contain coal-fired boilers which increased the risk of fire.  Seattle Steam still heats some buildings the the downtown area.",
    locatedAt: { fromStadiums: "West", citySubdivision: "Belltown/Downtown" },
    dateNamed: "1850",
  },
  {
    title: "Downtown Seattle",
    descrition:
      "In addition to the stadiums, downtown Seattle is made up of many other features.  Many people notice the street clocks which were built in the 1920s and there is also a clock built inside the shape of a question mark on the intersection of 5th ave and Pine street which was built in the 1990s.  Many of the street’s hatch covers in the downtown area are covered with artwork and also maps of the downtown area.  The Rainier Tower is located downtown and this was the original location of the University of Washington back in the 19th century.",
    locatedAt: { fromStadiums: "South" },
    dateNamed: "1850",
  },
];

// GET Requests

app.get("/", (req, res) => {
  res.send("Welcome to my Locations API");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/locations", (req, res) => {
  res.json(topLocations);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Listens for requests

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
