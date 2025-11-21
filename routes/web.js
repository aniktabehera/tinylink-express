// routes/web.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  // server-side get links for dashboard
  const q = await db.query(`SELECT code, url, total_clicks, last_clicked, created_at FROM links WHERE deleted = FALSE ORDER BY created_at DESC`);
  res.render('index', { links: q.rows, baseUrl: process.env.BASE_URL || '' });
});

router.get('/code/:code', async (req, res) => {
  const code = req.params.code;
  const q = await db.query(`SELECT code, url, total_clicks, last_clicked, created_at FROM links WHERE code = $1 AND deleted = FALSE`, [code]);
  if (q.rows.length === 0) {
    return res.status(404).render('404', { code });
  }
  res.render('stats', { link: q.rows[0], baseUrl: process.env.BASE_URL || '' });
});

module.exports = router;
