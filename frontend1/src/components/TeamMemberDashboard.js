// import React, { useState, useEffect } from 'react';
// import { getAssignedTasks, updateTaskStatus } from '../api/task';  // Import API calls

// const TeamMemberDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     // Fetch tasks assigned to the team member on component mount
//     fetchAssignedTasks();
//   }, []);

//   const fetchAssignedTasks = async () => {
//     try {
//       const response = await getAssignedTasks();
//       if (response.success) {
//         setTasks(response.data);
//       } else {
//         setErrorMessage('Failed to fetch tasks.');
//       }
//     } catch (error) {
//       setErrorMessage('Error occurred while fetching tasks.');
//     }
//   };

//   const handleStatusChange = async (taskId, status) => {
//     try {
//       const response = await updateTaskStatus(taskId, { status });
//       if (response.success) {
//         setSuccessMessage('Task status updated successfully.');
//         setErrorMessage('');
//         // Refresh the task list after status update
//         fetchAssignedTasks();
//       } else {
//         setErrorMessage('Failed to update task status.');
//       }
//     } catch (error) {
//       setErrorMessage('Error occurred while updating task status.');
//     }
//   };

//   return (
//     <div className="team-member-dashboard">
//       <h2>Team Member Dashboard</h2>

//       {/* Success and Error Messages */}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       {/* Assigned Tasks List */}
//       <div className="assigned-tasks-section">
//         <h3>Assigned Tasks</h3>
//         {tasks.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Status</th>
//                 <th>Update Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task._id}>
//                   <td>{task.task}</td>
//                   <td>{task.status}</td>
//                   <td>
//                     <select
//                       value={task.status}
//                       onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="in progress">In Progress</option>
//                       <option value="completed">Completed</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No tasks assigned</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeamMemberDashboard;
