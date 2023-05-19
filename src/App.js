import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import MyProfile from './components/MyProfile';

function App() {
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(
          'https://api.github.com/users/abdiaziz2112'
        );
        const followersResponse = await axios.get(
          'https://api.github.com/users/abdiaziz2112/followers'
        );
        const followingResponse = await axios.get(
          'https://api.github.com/users/abdiaziz2112/following'
        );

        setProfile(profileResponse.data);
        setFollowers(followersResponse.data);
        setFollowing(followingResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden">
        <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <MyProfile profile={profile} followers={followers} following={following} />
      </div>
    </Router>
  );
}

export default App;
