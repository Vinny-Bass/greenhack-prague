/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SavingsChart from '../SavingChart/SavingChart';
import FomoBtn from '../common/FomoBtn/FomoBtn';
import './SolarSavingsOverview.css';
import czImage from '../../assets/cz.png'
import CumulativeSavingsChart from '../CumulativeSavingsChart/CumulativeSavingsChart';

const formatCurrency = (value, currency = 'GBP') => {
    if (currency === "GB") {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(value);
    } else {
        return new Intl.NumberFormat('CZK', {
            style: 'currency',
            currency: 'CZK'
        }).format(value);
    }
};

const SolarSavingsOverview = ({ data }) => {
    const [panelsNumber, setPanelsNumber] = useState(4);
    const navigate = useNavigate();

    if (!data) return (<></>)

    let years = 0;
    data[0].yearlyUtilityBillEstimates.forEach(() => years++);
    const panels = data.filter(d => d.yearlyUtilityBillEstimates[years - 1] > 0).map(d => d.panelsCount);
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
            <div className="content-section">
                <div className="info-section">
                    <p><strong>Country:</strong> {data.country}</p>
                    <p><strong>Installation Cost:</strong> {formatCurrency(data.installationCost, data.country)}</p>
                    <p><strong>Government Incentive:</strong> {formatCurrency(data.govIncentive, data.country)}</p>
                    <p><strong>Number of Panels:</strong> {panelsNumber}</p>
                    <p><strong>Total cost without solar in the next {years} years:</strong> {formatCurrency(data.totalCostWithoutSolar, data.country)}</p>
                    <p><strong>Total cost with solar in the next {years} years:</strong> {formatCurrency(data.totalCostWithSolar, data.country)}</p>
                    <p><strong>Savings with Solar:</strong> {formatCurrency(data.savings, data.country)}</p>
                    <p><strong>Years until ROI overcome costs:</strong> {data.roiYears}</p>
                </div>
                <img src={czImage} alt="Solar panels on a house" className="solar-image"/>
            </div>
            <div className="chart-section">
                <SavingsChart data={data} />
                <CumulativeSavingsChart data={data}/>
            </div>
            <FomoBtn label={"I want to invest"} onClick={() => navigate("/companies")}/>
        </div>
    );
};


export default SolarSavingsOverview;
