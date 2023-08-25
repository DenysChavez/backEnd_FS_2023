const express = require("express");
const morgan = require("morgan")
const cors = require("cors");
const app = express();
const Person = require('./models/person')
// create a new token for 'body'
morgan.token("body", function (req, res) { return JSON.stringify(req.body) })

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
// use morgan middleware with custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/people", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p);
  });
});

app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${Person.find({}).length} people</p>
  
  <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body
  const randomId = Math.floor(Math.random() * 9999999)

  if (phonebook.find(p => p.name.toLowerCase() === body.name.toLowerCase())) {
    response.status(404).json({
      error: 'name must be unique'
    }) 
  } else if (!body.number || !body.name) {
    response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person = {
    id: randomId,
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(person)

  response.json(person)
})

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body
  const personIndex = phonebook.find((p) => p.id === id)
  
  if (personIndex === -1) {
    return response.status(404).json({
      error: 'Person not found'
    });
  }

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'name or number is missing'
    });
  }

  const updatedPerson = {
    id: id,
    name: body.name,
    number: body.number
  };

  phonebook[personIndex] = updatedPerson;

  response.json(updatedPerson);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
