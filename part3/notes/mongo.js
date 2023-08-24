const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =

mongoose.set('strictQuery',false)
mongoose.connect(url)

// set of rules or a blueprint
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Model so-called 'constructor functions'
const Note = mongoose.model('Note', noteSchema)

// // the application creates a new note object with the help of the Note model
// const note = new Note({
//   content: "Micho is a cutie cat",
//   important: true,
// })

// note.save().then(result => {
//     console.log(result);
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// // retrieved all data from the database
// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close()
// })

// //  only include important notes
// Note.find({ important: true }).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close()
// })
