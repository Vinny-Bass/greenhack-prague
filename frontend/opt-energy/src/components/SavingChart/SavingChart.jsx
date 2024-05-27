/* eslint-disable react/prop-types */
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const SavingsChart = ({ data }) => {
    const {
        currentlyCostPerYear,
        savingPerYear,
        yearsToRecover,
    } = data;

    const labels = Array.from({ length: yearsToRecover + 1 }, (_, i) => `Year ${i}`);
    const costData = Array.from({ length: yearsToRecover + 1 }, (_, i) => currentlyCostPerYear * i);
    const savingsData = Array.from({ length: yearsToRecover + 1 }, (_, i) => savingPerYear * i);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Cumulative Cost with Basic Energy',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: costData,
            },
            {
                label: 'Cumulative Savings with Solar Energy',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: savingsData,
            },
        ],
    };

    return (
        <div>
            <h2>Energy Cost Savings Over Time</h2>
            <Bar
                data={chartData}
                width={100}
                height={50}
                options={{
                    maintainAspectRatio: true,
                }}
            />
        </div>
    );
};

export default SavingsChart;
