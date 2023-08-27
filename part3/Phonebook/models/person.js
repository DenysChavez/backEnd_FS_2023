const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI.replace("%s", process.env.PASSWORD);

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  // The schema tells Mongoose how the person objects are to be stored in the database.
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
    },
  number: {
    type: String,
    minLength: 8,
    required: true,
    match: [/^\d{2,3}-\d+$/, 'The phone number format is invalid.']
    },
});
  
// modify the toJSON method of the schema, which is used on all instances of the models produced with that schema.
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
