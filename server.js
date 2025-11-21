// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const ctrl = require('./controllers/linkControllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// health
app.get('/healthz', (req, res) => res.json({ ok: true, version: "1.0" }));

// API
app.use('/api', apiRoutes);

// Web routes (dashboard + stats)
app.use('/', webRoutes);

// Redirect last: /:code -> redirect
app.get('/:code', ctrl.redirectHandler);

// fallback 404
app.use((req,res) => res.status(404).render('404', { code: null }));

app.listen(PORT, () => {
  console.log(`TinyLink listening on ${PORT}`);
});
