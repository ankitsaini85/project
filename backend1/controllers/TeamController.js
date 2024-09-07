// backend/controllers/teamController.js

const Team = require('../models/Team');
const Task = require('../models/Task');

const createTeam = async (req, res) => {
    const { name, members } = req.body;
    try {
        const team = new Team({ name, members });
        await team.save();
        res.status(201).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating team' });
    }
};

const assignTask = async (req, res) => {
    const { task, assignee } = req.body;
    try {
        const newTask = new Task({ task, assignee });
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error assigning task' });
    }
};

const getTeamProgress = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching team progress' });
    }
};

module.exports = {
    createTeam,
    assignTask,
    getTeamProgress,
};