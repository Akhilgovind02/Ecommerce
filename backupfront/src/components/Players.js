import './Players.css'
import { Link } from "react-router-dom";

const Players = ({ description, price, firstname, playerId,lastname,imageUrl }) => {
  return (
    <div className="product">
      <img src={imageUrl} />

      <div className="product__info">
        <p className="info__name">{firstname}{" "}{lastname}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>

        <Link to={`/player/${playerId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Players;
