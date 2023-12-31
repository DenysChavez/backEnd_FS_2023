const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
// create a new token for 'body'
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
// use morgan middleware with custom format
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/people", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    response.send(`<p>Phonebook has info of ${result.length} people</p>
    <p>${new Date()}</p>`);
  });
});

app.get("/api/people/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).send({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/people/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/people", (request, response, next) => {
  const body = request.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.put("/api/people/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).send({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
