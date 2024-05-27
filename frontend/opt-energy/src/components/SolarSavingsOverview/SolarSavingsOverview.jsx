/* eslint-disable react/prop-types */
import SavingsChart from '../SavingChart/SavingChart';
import './SolarSavingsOverview.css';

const formatCurrency = (value, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency
    }).format(value);
};

const SolarSavingsOverview = ({ data }) => {
    return (
        <div className="solar-savings-overview">
            <h1>Solar Energy Savings Overview</h1>
            <div className="info-section">
                <p><strong>Country:</strong> {data.country}</p>
                <p><strong>Installation Cost:</strong> {formatCurrency(data.installationCost)}</p>
                <p><strong>Government Incentive:</strong> {formatCurrency(data.govIncentive)}</p>
                <p><strong>Number of Panels:</strong> {data.panels}</p>
                <p><strong>Years to Recover Cost:</strong> {data.yearsToRecover}</p>
                <p><strong>Current Annual Energy Cost:</strong> {formatCurrency(data.currentlyCostPerYear)}</p>
                <p><strong>Annual Savings with Solar:</strong> {formatCurrency(data.savingPerYear)}</p>
                <p><strong>Monthly Savings with Solar:</strong> {formatCurrency(data.savingPerMonth)}</p>
            </div>
            <div className="chart-section">
                <SavingsChart data={data} />
            </div>
            <button className="buy-button" onClick={() => alert('You want to buy!')}>I want to invest</button>
        </div>
    );
};

export default SolarSavingsOverview;
