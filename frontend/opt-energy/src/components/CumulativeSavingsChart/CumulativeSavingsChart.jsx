/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

const calculateCumulativeSavings = (yearlySavings, initialInvestment) => {
    let cumulativeSavings = [];
    let totalSavings = 0;

    for (let i = 0; i < yearlySavings.length; i++) {
        totalSavings += yearlySavings[i];
        cumulativeSavings.push(totalSavings - initialInvestment);
    }

    return cumulativeSavings;
};

const CumulativeSavingsChart = ({ data }) => {
    const { installationCost, govIncentive, yearlyUtilityBillEstimates, yearlyCostWithoutSolar, roiYears } = data;
    const initialInvestment = installationCost - govIncentive;

    const yearlySavings = yearlyCostWithoutSolar.map((cost, index) => cost - yearlyUtilityBillEstimates[index]);
    const cumulativeSavings = calculateCumulativeSavings(yearlySavings, initialInvestment);

    const labels = yearlySavings.map((_, index) => `Year ${index + 1}`);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Cumulative Savings',
                data: cumulativeSavings,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cumulative Savings Over Time',
            },
            annotation: {
                annotations: initialInvestment !== null ? [{
                    type: 'line',
                    scaleID: 'x',
                    value: `Year ${roiYears}`,
                    borderColor: 'red',
                    borderWidth: 2,
                    label: {
                        content: `ROI in Year ${roiYears}`,
                        enabled: true,
                        position: 'top',
                    }
                }] : []
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cumulative Savings ',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default CumulativeSavingsChart;
