// backend/routes/teamRoutes.js

const express = require('express');
const { createTeam, assignTask, getTeamProgress } = require('../controllers/TeamController');
const router = express.Router();

router.post('/team', createTeam);
router.post('/task/assign', assignTask);
router.get('/team/progress', getTeamProgress);

module.exports = router;