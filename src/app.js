const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '..', 'templates', 'views'));
hbs.registerPartials(path.resolve(__dirname, '..', 'templates', 'partials'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather Web',
    name: 'Iran'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Iran'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    help: 'Everything is gonna be ok',
    name: 'Iran'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: '404 - Help article not found',
    name: 'Iran'
  });
});

app.get('/weather', (req, res) => {
  const { address = undefined } = req.query;

  if (!address) {
    return res.status(400).json({
      error: 'An address need to be provided! Try again'
    });
  }

  geocode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    forecast(latitude, longitude, (err, forecast) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      res.json({ location, forecast, address });
    });
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: '404 - Page not found',
    name: 'Iran'
  });
});

app.listen(3000, () => {
  console.log('🔥🔥 Server is up on port 3000.');
});