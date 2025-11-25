import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const DonationChart = ({ data }) => {
  const labels = data.length ? data.map(d => d.date) : ['No data']
  const dataset = data.length ? data.map(d => d.amount) : [0]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Donations',
        data: dataset,
        fill: false,
        backgroundColor: '#2c7a7b',
        borderColor: '#4fd1c5',
        tension: 0.3
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    }
  }

  return <Line data={chartData} options={options} />
}

export default DonationChart
