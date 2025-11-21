// controllers/linkControllers.js
const db = require('../db');
const { generateRandom } = require('../utils/codegen');
const validator = require('validator');

// Regex rule for custom codes
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

// ----------------------- CREATE NEW LINK -----------------------
async function createLink(req, res) {
  try {
    // UI sends: targetUrl
    const url = req.body.url || req.body.targetUrl;
    const customCode = req.body.code ? String(req.body.code).trim() : null;

    if (!url || !validator.isURL(url, { require_protocol: true })) {
      return res.status(400).json({
        ok: false,
        message: "Invalid URL. Include http/https protocol."
      });
    }

    let finalCode = customCode;

    // Handle custom code
    if (finalCode) {
      if (!CODE_REGEX.test(finalCode)) {
        return res.status(400).json({
          ok: false,
          message: "Code must be 6–8 characters (A-Z a-z 0-9)"
        });
      }

      const existing = await db.query(
        `SELECT id FROM links WHERE code=$1 AND deleted=FALSE`,
        [finalCode]
      );

      if (existing.rows.length > 0) {
        return res.status(409).json({
          ok: false,
          message: "Code already exists"
        });
      }
    } else {
      // Generate random unique code
      let attempts = 0;
      do {
        finalCode = generateRandom();
        const exists = await db.query(
          `SELECT id FROM links WHERE code=$1`,
          [finalCode]
        );
        if (exists.rows.length === 0) break;
        attempts++;
      } while (attempts < 5);
    }

    // Insert new link
    await db.query(
      `INSERT INTO links (code, url, created_at, total_clicks, last_clicked, deleted)
       VALUES ($1, $2, now(), 0, NULL, FALSE)`,
      [finalCode, url]
    );

    const base = process.env.BASE_URL.replace(/\/$/, '');

    return res.status(201).json({
      ok: true,
      code: finalCode,
      short_url: `${base}/${finalCode}`,
      targetUrl: url
    });
  } catch (err) {
    console.error("Create Link Error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}

// ----------------------- LIST ALL LINKS (Dashboard) -----------------------
async function listLinks(req, res) {
  try {
    const q = await db.query(
      `SELECT 
         code,
         url AS "targetUrl",
         total_clicks AS "clicks",
         last_clicked AS "lastClicked",
         created_at AS "createdAt"
       FROM links
       WHERE deleted = FALSE
       ORDER BY created_at DESC`
    );

    return res.json({ ok: true, links: q.rows });
  } catch (err) {
    console.error("List Links Error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}

// ----------------------- GET STATS FOR ONE LINK -----------------------
async function getLinkStats(req, res) {
  const code = req.params.code;

  try {
    const q = await db.query(
      `SELECT 
          code,
          url AS "targetUrl",
          total_clicks AS "clicks",
          last_clicked AS "lastClicked",
          created_at AS "createdAt"
        FROM links
        WHERE code=$1 AND deleted=FALSE`,
      [code]
    );

    if (q.rows.length === 0) {
      return res.status(404).json({ ok: false, message: "Not found" });
    }

    return res.json({ ok: true, link: q.rows[0] });
  } catch (err) {
    console.error("Stats Error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}

// ----------------------- DELETE LINK -----------------------
async function deleteLink(req, res) {
  const code = req.params.code;

  try {
    const q = await db.query(
      `UPDATE links 
       SET deleted=TRUE 
       WHERE code=$1 AND deleted=FALSE 
       RETURNING code`,
      [code]
    );

    if (q.rows.length === 0) {
      return res.status(404).json({ ok: false, message: "Not found" });
    }

    return res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
}

// ----------------------- REDIRECT HANDLER -----------------------
async function redirectHandler(req, res) {
  const code = req.params.code;

  try {
    const q = await db.query(
      `SELECT id, url 
       FROM links 
       WHERE code=$1 AND deleted=FALSE`,
      [code]
    );

    if (q.rows.length === 0) {
      return res.status(404).render("404", { code });
    }

    const link = q.rows[0];

    // Update stats
    await db.query(
      `UPDATE links
       SET total_clicks = total_clicks + 1,
           last_clicked = now()
       WHERE id=$1`,
      [link.id]
    );

    return res.redirect(302, link.url);
  } catch (err) {
    console.error("Redirect Error:", err);
    return res.status(500).send("Server error");
  }
}

module.exports = {
  createLink,
  listLinks,
  getLinkStats,
  deleteLink,
  redirectHandler
};
