import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import { Modal } from 'react-responsive-modal';

function App() {
  const blankUser = {
    batsman: "",
    dismissal: "",
    runs: "",
    balls: "",
    "4s": "",
    "6s": "",
  };

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Add');
  const [teams, setTeams] = useState([
    { name: "", batsmen: [] },
    { name: "", batsmen: [] }
  ]);
  const [user, setUser] = useState(blankUser);
  const [editIndex, setEditIndex] = useState(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
  };

  const addUser = () => {
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].batsmen.push(user);
    setTeams(updatedTeams);
    setUser(blankUser);
    onCloseModal();
  };

  const editUser = (index) => {
    setAction('Edit');
    const selectedUser = teams[currentTeamIndex].batsmen[index];
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  };

  const updateUser = () => {
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].batsmen[editIndex] = user;
    setTeams(updatedTeams);
    setUser(blankUser);
    setEditIndex(null);
    onCloseModal();
  };

  const deleteUser = (index) => {
    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].batsmen.splice(index, 1);
    setTeams(updatedTeams);
  };

  const addTeamName = (index) => {
    const name = prompt(`Enter Team ${index + 1} Name:`);
    if (name) {
      const updatedTeams = [...teams];
      updatedTeams[index].name = name;
      setTeams(updatedTeams);
    }
  };

  const calculateTotalScore = (teamIndex) => {
    return teams[teamIndex].batsmen.reduce((total, batsman) => {
      return total + (parseInt(batsman.runs) || 0); // Ensure runs are treated as numbers
    }, 0);
  };

  const calculateTotalWickets = (teamIndex) => {
    return teams[teamIndex].dismissal.reduce((total, dismissal) => {
      return total + (parseInt(batsman.dismissal) || 0); // Ensure runs are treated as numbers
    }, 0);
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h1>Cricket Scorer</h1>
     
        <button className='tbtn1' onClick={() => addTeamName(0)}>
          Add Team 1 Name 
        </button>
      </div>
      {teams[currentTeamIndex].name && <h2 className='team'>{teams[currentTeamIndex].name} {calculateTotalScore(currentTeamIndex)}/ {calculateTotalWickets(currentTeamIndex)}</h2>}

      <div className="toolbar">
        <button className='btn btn-p' onClick={() => { setCurrentTeamIndex(0); onOpenModal(); }}>
          <PlusCircle size={16} />
          <span>Add Batsman for Team 1 </span>
        </button>
       
      </div>
      <hr />
      
      {/* Team 1 Batsman Table */}
      <h3>Batsmen</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Batsman</th>
            <th>Dismissal</th>
            <th>Runs</th>
            <th>Balls</th>
            <th>4s</th>
            <th>6s</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams[0].batsmen.length > 0 && teams[0].batsmen.map((user, index) => (
            <tr key={index}>
              <td>{user.batsman}</td>
              <td>{user.dismissal}</td>
              <td>{user.runs}</td>
              <td>{user.balls}</td>
              <td>{user["4s"]}</td>
              <td>{user["6s"]}</td>
              <td className='action'>
                <button className='btn ml2' onClick={() => editUser(index)}>
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button className='btn ml2' onClick={() => deleteUser(index)}>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   <hr/>
      <button className='tbtn2' onClick={() => addTeamName(1)}>
          Add Team 2 Name 
        </button>

      <button className='btn btn-p' onClick={() => { setCurrentTeamIndex(1); onOpenModal(); }}>
          <PlusCircle size={16} />
          <span>Add Batsman for Team 2 </span>
        </button>

      {/* Team 2 Name and Batsman Table */}
      {teams[1].name && <h2 className='team'>{teams[1].name}</h2>}
      <h3>Batsmen</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Batsman</th>
            <th>Dismissal</th>
            <th>Runs</th>
            <th>Balls</th>
            <th>4s</th>
            <th>6s</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams[1].batsmen.length > 0 && teams[1].batsmen.map((user, index) => (
            <tr key={index}>
              <td>{user.batsman}</td>
              <td>{user.dismissal}</td>
              <td>{user.runs}</td>
              <td>{user.balls}</td>
              <td>{user["4s"]}</td>
              <td>{user["6s"]}</td>
              <td className='action'>
                <button className='btn ml2' onClick={() => { setCurrentTeamIndex(1); editUser(index); }}>
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button className='btn ml2' onClick={() => { setCurrentTeamIndex(1); deleteUser(index); }}>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} Batsman</h2>
        <div className='form'>
          <label htmlFor="batsman">Batsman</label>
          <input
            type="text"
            id="batsman"
            value={user.batsman}
            onChange={(e) => setUser({ ...user, batsman: e.target.value })}
          />
          <label htmlFor="dismissal">Dismissal</label>
          <select
            id="dismissal"
            value={user.dismissal}
            onChange={(e) => setUser({ ...user, dismissal: e.target.value })}
          >
            <option value="">Select</option>
            <option value="N.out">N.out</option>
            <option value="R.out">R.out</option>
            <option value="C.behind">C.behind</option>
            <option value="C.out">C.out</option>
            <option value="Bowled">Bowled</option>
            <option value="St.out">St.out</option>
          </select>
          <label htmlFor="runs">Runs</label>
          <input
            type="number"
            id="runs"
            value={user.runs}
            onChange={(e) => setUser({ ...user, runs: e.target.value })}
          />
          <label htmlFor="balls">Balls</label>
          <input
            type="number"
            id="balls"
            value={user.balls}
            onChange={(e) => setUser({ ...user, balls: e.target.value })}
          />
          <label htmlFor="4s">4s</label>
          <input
            type="number"
            id="4s"
            value={user["4s"]}
            onChange={(e) => setUser({ ...user, "4s": e.target.value })}
          />
          <label htmlFor="6s">6s</label>
          <input
            type="number"
            id="6s"
            value={user["6s"]}
            onChange={(e) => setUser({ ...user, "6s": e.target.value })}
          />
          {action === 'Add' ? (
            <button className='btn' onClick={addUser}>Submit</button>
          ) : (
            <button className='btn' onClick={updateUser}>Update</button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;