const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI.replace('%s', password)

mongoose.set('strictQuery',false)
mongoose.connect(url)

// The schema tells Mongoose how the note objects are to be stored in the database.
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

//the first "Note" parameter is the singular name of the model
// Models are so-called constructor functions that create new JavaScript objects based on the provided parameters. 
const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  })
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })