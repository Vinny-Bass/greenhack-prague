/* eslint-disable react/prop-types */
import FomoBtn from '../common/FomoBtn/FomoBtn';
import './NeighbourOffers.css';

const NeighbourOffers = ({ offers }) => {
    const TITLE = "Looks like your neighbour's already made the investment";
    const DESCRIPTION = "If you don't want to invest in implementing green energy, you can buy from your neighbors \
        that made the investment and are registered on our platform."
    return (
        <div className="neighbour-offers">
            <h2>{TITLE}</h2>
            <h3>
                {DESCRIPTION}
            </h3>
            <div className="offers-list">
                {offers.map((offer, index) => (
                    <div key={index} className="offer-card">
                        <img src={offer.profilePic} alt={`${offer.name}'s profile`} className="profile-pic" />
                        <div className="offer-details">
                            <p><strong>{offer.name}</strong></p>
                            <p>{offer.distance} meters away</p>
                            <p>Price: {offer.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 20 }}>
                <FomoBtn label={"Enter in contact"}/>
            </div>
        </div>
    );
};

export default NeighbourOffers;
