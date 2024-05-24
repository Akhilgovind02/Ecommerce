import React, { useEffect, useState } from 'react';
import { Api } from '../utils/Api';
import Players from '../components/Players'
import './PlayerScreen.css';

function PlayerScreen() {
  const [players, setPlayers] = useState([]);
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await Api.getRequest('/api/players');
        const parsedData = JSON.parse(data);
        setPlayers(parsedData);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Error fetching players. Please try again.'); 
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  console.log(players);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Players List</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
            players.map(player => (
            <Players
              key={player._id}
              firstname={player.firstname}
              description={player.description}
              price={player.price}
              lastname={player.lastname}
              imageUrl={player.imageUrl}
              playerId={player._id}
            />
          ))

        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  bike: state.bike.bike,
  error: state.bike.error,
});

export default connect(mapStateToProps, { getBikeById })(BikeDetails);
