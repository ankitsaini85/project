// TeamLeaderDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam, assignTask, getTeamProgress, deleteTeam } from '../api/team';
import { getToken } from '../api/auth';
import './teamLeaderDashboard.css';  // Import the yellow tech theme CSS

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');
  const [task, setTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [teamProgress, setTeamProgress] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [team, setTeam] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
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

    const storedTeam = localStorage.getItem('team');
    if (storedTeam) {
      const parsedTeam = JSON.parse(storedTeam);
      setTeam(parsedTeam);
      setTeamMembers(parsedTeam.members);
    } else {
      const fetchTeamDetails = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/teams', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setTeam(data.data);
            setTeamMembers(data.data.members);
            localStorage.setItem('team', JSON.stringify(data.data));
          } else {
            setErrorMessage('Error fetching team details');
          }
        } catch (error) {
          setErrorMessage('Error fetching team details');
        }
      };

      fetchTeamDetails();
    }
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam({ name: teamName, members: members.split(',') });
      if (response.success) {
        setSuccessMessage('Team created successfully');
        setErrorMessage('');
        setTeamName('');
        setMembers('');
        const newTeamMembers = members.split(',');
        setTeamMembers(newTeamMembers);
        const newTeam = { name: teamName, members: newTeamMembers };
        setTeam(newTeam);
        localStorage.setItem('team', JSON.stringify(newTeam));
      } else {
        setErrorMessage(response.message || 'Error creating team');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error creating team');
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

  const handleDeleteTeam = async () => {
    try {
      const response = await deleteTeam();
      if (response.success) {
        setSuccessMessage('Team deleted successfully');
        setErrorMessage('');
        setTeam(null);
        setTeamMembers([]);
        localStorage.removeItem('team');
      } else {
        setErrorMessage(response.message || 'Error deleting team');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error deleting team');
      setSuccessMessage('');
    }
  };

  return (
    <div className="team-leader-dashboard-container">
      <h2>Team Leader Dashboard</h2>

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

      {team && (
        <div className="team-details-section">
          <h3>Team Details</h3>
          <p><strong>Team Name:</strong> {team.name}</p>
          <p><strong>Members:</strong> {team.members.join(', ')}</p>
          <button onClick={handleDeleteTeam}>Delete Team</button>
        </div>
      )}

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
            <label>Assignee:</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            >
              <option value="">Select a team member</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Assign Task</button>
        </form>
      </div>

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

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default TeamLeaderDashboard;
