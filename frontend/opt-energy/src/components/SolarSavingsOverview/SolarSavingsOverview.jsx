/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SavingsChart from '../SavingChart/SavingChart';
import FomoBtn from '../common/FomoBtn/FomoBtn';
import './SolarSavingsOverview.css';

const formatCurrency = (value, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency
    }).format(value);
};

const SolarSavingsOverview = ({ data }) => {
    const [panelsNumber, setPanelsNumber] = useState(4);
    const navigate = useNavigate();

    if (!data) return (<></>)

    let years = 0;
    const panels = data.map(d => d.panelsCount);
    data[0].yearlyUtilityBillEstimates.forEach(() => years++);
    data = data.find(d => d.panelsCount == panelsNumber);
    const handlePanelsChange = (event) => {
        setPanelsNumber(parseInt(event.target.value));
    };
    return (
        <div className="solar-savings-overview">
            <h1>Solar Energy Savings Overview</h1>
            <label>
                Select Panels:
                <select value={panelsNumber} onChange={handlePanelsChange}>
                    {panels && panels.map(p => (
                        <option value={p} key={p}>{p} Panels</option>
                    ))}
                </select>
            </label>
            <div className="info-section">
                <p><strong>Country:</strong> {data.country}</p>
                <p><strong>Installation Cost:</strong> {formatCurrency(data.installationCost)}</p>
                <p><strong>Government Incentive:</strong> {formatCurrency(data.govIncentive)}</p>
                <p><strong>Number of Panels:</strong> {panelsNumber}</p>
                <p><strong>Total cost without solar in the next {years} years:</strong> {formatCurrency(data.totalCostWithoutSolar)}</p>
                <p><strong>Total cost with solar in the next {years} years:</strong> {formatCurrency(data.totalCostWithSolar)}</p>
                <p><strong>Savings with Solar:</strong> {formatCurrency(data.savings)}</p>
            </div>
            <div className="chart-section">
                <SavingsChart data={data} />
            </div>
            <FomoBtn label={"I want to invest"} onClick={() => navigate("/companies")}/>
        </div>
    );
};

export default SolarSavingsOverview;
