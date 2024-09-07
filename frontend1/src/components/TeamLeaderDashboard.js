// frondend/src/components/TeamLeaderDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam, assignTask, getTeamProgress } from '../api/team.js';  // Import API calls

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');
  const [task, setTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [teamProgress, setTeamProgress] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch team progress on component mount
    const fetchTeamProgress = async () => {
      try {
        const response = await getTeamProgress();
        if (response.success) {
          setTeamProgress(response.data);
        } else {
          setErrorMessage('Error fetching team progress');
        }
      } catch (error) {
        setErrorMessage('Error fetching team progress');
      }
    };

    fetchTeamProgress();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam({ name: teamName, members: members.split(',') });
      if (response.success) {
        setSuccessMessage('Team created successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Error creating team');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error creating team catch');
      setSuccessMessage('');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      const response = await assignTask({ task, assignee });
      if (response.success) {
        setSuccessMessage('Task assigned successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Error assigning task');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error assigning task');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Team Leader Dashboard</h2>

      {/* Create Team Section */}
      <div className="create-team-section">
        <h3>Create Team</h3>
        <form onSubmit={handleCreateTeam}>
          <div className="form-group">
            <label>Team Name:</label>
            <input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Members (comma-separated emails):</label>
            <input
              type="text"
              placeholder="Enter team member emails"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Team</button>
        </form>
      </div>

      {/* Assign Task Section */}
      <div className="assign-task-section">
        <h3>Assign Task</h3>
        <form onSubmit={handleAssignTask}>
          <div className="form-group">
            <label>Task:</label>
            <input
              type="text"
              placeholder="Enter task description"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Assignee (email):</label>
            <input
              type="text"
              placeholder="Enter team member email"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>

          <button type="submit">Assign Task</button>
        </form>
      </div>

      {/* View Team Progress Section */}
      <div className="team-progress-section">
        <h3>View Team Progress</h3>
        {teamProgress.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamProgress.map((progress, index) => (
                <tr key={index}>
                  <td>{progress.task}</td>
                  <td>{progress.assignee}</td>
                  <td>{progress.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No progress available</p>
        )}
      </div>

      {/* Display Messages */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default TeamLeaderDashboard;