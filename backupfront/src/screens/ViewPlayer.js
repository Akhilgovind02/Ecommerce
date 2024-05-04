import './ViewPlayer.css'
import {useState, useEffect,useCallback} from 'react'
import { Api } from '../utils/Api';
import {useHistory} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'


const ViewPlayer = () => {
  const {replace} = useHistory()

    const [players, setPlayers] = useState([]);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [bidAmount,setBidAmound] = useState('')
    const user = useSelector(state => state.user)
    console.log(user);


    const currentUser = user.userInfo.details
    const  bidder = currentUser.fullName
    const userId = currentUser._id 
    console.log(bidder);
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const { data } = await Api.getRequest('/api/players');
          const parsedData = JSON.parse(data);
          setPlayers(parsedData[0]);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching players:', error);
          setError('Error fetching players. Please try again.'); 
          setLoading(false);
        }
      };
      fetchPlayers();
    }, []);

    const bid = useCallback(async () => {
      if (bidder && bidAmount<players.price && userId) {
        setLoading(true)
        const {statusCode, data} = await Api.postRequest('/api/auction/bidding', {
          bidder,
          bidAmount,
          userId,
          playerId : players._id,
          email:players.email,
          description:players.description,
          startingBid:bidAmount,
          currentBid:bidAmount,
          // imageUrl:players.imageUrl,
          // endDate
        })
        // console.log(statusCode);
        setLoading(false)
        if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
          setLoading(false)
          alert(data)
          return
        }
        // const {token} = JSON.parse(data)
        // setToken(token)
        alert('Bid Successfull')
      }
    }, [bidder, bidAmount, players.price, userId])

    console.log(players);
  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={players.imageUrl} />
            </div>
            <div className="left__info">
              <p className="left__name">{players.firstname}</p>
              <p>Price: ${players.price}</p>
              <p>Description: {players.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>₹{players.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {players.status > 0 ? 'Not Available' : 'Available'}
                </span>
              </p>
              <p>
                Bid Price
                <input type='number' placeholder='Bid Amount' onChange={e => setBidAmound(e.target.value)}></input>
              </p>
              <p>
                <button type="button" onClick={bid}>
                  Bid
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ViewPlayer
