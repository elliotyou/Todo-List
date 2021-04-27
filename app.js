const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const Todo = require('./models/todo')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})