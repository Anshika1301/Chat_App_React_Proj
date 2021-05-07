import { useState } from 'react';
import axios from 'axios';

// const projectID = '16e1cedb-23a2-47bd-8bf4-3d2e58598e9f';
const projectID = 'f8d32fd5-6b3f-4ee5-aaed-b0e6924df065'; // anshika
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try 
    {
      // username / password => chatengine -> give messages
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });
      
      // works out -> logged in
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } 
    catch (err) 
    {
       //error -> try with new username ...
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;