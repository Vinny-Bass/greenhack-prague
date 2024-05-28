/* eslint-disable react/prop-types */
import './CompanyCardList.css';

const CompanyCardList = ({ companies }) => {
    return (
        <div className="company-card-list">
            {companies && companies.map((company, index) => (
                <div key={index} className="company-card">
                    <div className="company-card-header">
                        <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
                        <div>
                            <h2>{company.name}</h2>
                            <p className="google-rating">Rating: {company.rating} ⭐</p>
                        </div>
                    </div>
                    <p className="company-description">{company.description}</p>
                    <div className="company-card-footer">
                        <p className="company-price">Price: {company.price}</p>
                        <button className="buy-button" onClick={() => alert('You clicked Buy Now!')}>
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CompanyCardList;
