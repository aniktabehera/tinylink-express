// routes/api.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/linkControllers');

router.post('/links', ctrl.createLink);          // POST /api/links
router.get('/links', ctrl.listLinks);            // GET /api/links
router.get('/links/:code', ctrl.getLinkStats);   // GET /api/links/:code
router.delete('/links/:code', ctrl.deleteLink);  // DELETE /api/links/:code

module.exports = router;
