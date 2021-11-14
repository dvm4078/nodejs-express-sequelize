import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return res.status(200).json({ ip });
});

export default router;
