import React, { useEffect, useState } from 'react';
import { Api } from '../utils/Api';
import { useSelector } from 'react-redux';
import './OfferScreen.css'; // Import CSS file for custom styles

function OfferScreen() {
    const user = useSelector(state => state.user);
    const playerId = user.userInfo.details._id;
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const {data} = await Api.getRequest(`/api/auction/bid/${playerId}`);
                setOffers(JSON.parse(data)); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching offers:', error);
                setError('Error fetching offers. Please try again.'); 
                setLoading(false);
            }
        };

        fetchOffers();
    }, [playerId]);

    return (
        <div className="offer-container">
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <div>
                    <h2 className="offer-heading">Offers:</h2>
                    <ul className="offer-list">
                        {offers.map((offer, index) => (
                            <li key={index} className="offer-item">
                                <p><span className="offer-label">Bidder:</span> {offer.bids[0].bidder}</p>
                                <p><span className="offer-label">Description:</span> {offer.bids[0].bidAmount}</p>
                                <p><span className="offer-label">Starting Bid:</span> {offer.startingBid}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default OfferScreen;
