const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const dbURI = "mongodb+srv://sanket:sanket123321@task-cluster.oykzt.mongodb.net/project-int";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.get('/details', (req, res) => {
  res.render('details', { title: 'Details' });
});

app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});