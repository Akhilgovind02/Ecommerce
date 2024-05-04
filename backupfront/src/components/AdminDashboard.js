import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import { Api } from '../utils/Api';
import './Dashboard.css';
import { logout } from '../utils/localstorage'


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await Api.getRequest('/api/user/all');
        setUsers(JSON.parse(userData));
        const { data: playerData } = await Api.getRequest('/api/players/');
        setPlayers(JSON.parse(playerData));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const adminlogout = () => {
    logout()
    history.push("/admin/signin")
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
    <div style={{width:'100%', height:'100px', backgroundColor:'lightgray', marginBottom:'30px', display:'flex', alignItems:'center',justifyContent:'center'}}>
    <h1 >Admin Dashboard</h1>
         <button className="logout-button" onClick={adminlogout}>Logout</button>
      </div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Players</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Price</th>
            <th>Sport</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.email}</td>
              <td>{player.firstname} {player.lastname}</td>
              <td>{player.phone}</td>
              <td>{player.price}</td>
              <td>{player.sports}</td>
              <td>{player.status == 0? 'Available':'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
