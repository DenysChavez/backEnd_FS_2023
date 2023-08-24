const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = process.env.DB_URL.replace("%s", password);

mongoose.set("strictQuery", false);
mongoose.connect(url);

// The schema tells Mongoose how the person objects are to be stored in the database.
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//the first "person" parameter is the singular name of the model
// Models are so-called constructor functions that create new JavaScript objects based on the provided parameters.
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length < 5) {
  console.log("missing name or number as argument");
  process.exit(1);
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("no valid argument");
  process.exit(1);
}
