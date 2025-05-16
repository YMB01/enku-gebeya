'use client';
import React from 'react';
import {
  FaDollarSign,
  FaChartLine,
  FaRegCreditCard,
  FaClipboardList,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const FinanceReport: React.FC = () => {
  const pieChartData = {
    labels: ['Revenue', 'Expenses'],
    datasets: [
      {
        label: 'Revenue vs Expenses',
        data: [12350, 7200],
        backgroundColor: ['#34D399', '#F87171'],
        borderColor: ['#34D399', '#F87171'],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Cash Flow',
        data: [1500, 1200, 2000, 2500, 2200],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barChartData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Revenue by Product',
        data: [4000, 3000, 5350],
        backgroundColor: ['#60A5FA', '#FBBF24', '#10B981'],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutChartData = {
    labels: ['Credit Card', 'PayPal', 'Cash'],
    datasets: [
      {
        label: 'Payment Method Distribution',
        data: [5000, 3500, 1850],
        backgroundColor: ['#6366F1', '#EC4899', '#F59E0B'],
        borderColor: ['#4F46E5', '#DB2777', '#D97706'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Finance Report</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Revenue"
          amount="$12,350"
          icon={<FaDollarSign className="text-green-500 text-4xl" />}
          trend="up"
          trendText="5% increase"
          color="bg-green-100"
        />
        <SummaryCard
          title="Total Expenses"
          amount="$7,200"
          icon={<FaRegCreditCard className="text-red-500 text-4xl" />}
          trend="down"
          trendText="3% decrease"
          color="bg-red-100"
        />
        <SummaryCard
          title="Net Profit"
          amount="$5,150"
          icon={<FaChartLine className="text-blue-500 text-4xl" />}
          trend="up"
          trendText="8% increase"
          color="bg-blue-100"
        />
        <SummaryCard
          title="Pending Transactions"
          amount="35"
          icon={<FaClipboardList className="text-orange-500 text-4xl" />}
          trend="down"
          trendText="12% decrease"
          color="bg-orange-100"
        />
      </div>

      {/* Graphs Section */}
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Revenue vs Expenses</h2>
          <div className="w-full h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Cash Flow Over Time</h2>
          <div className="w-full h-64">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Revenue by Product</h2>
          <div className="w-full h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Payment Method Breakdown</h2>
          <div className="w-full h-64">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="mt-12">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">#1234</td>
                <td className="px-4 py-2">May 10, 2025</td>
                <td className="px-4 py-2">$250</td>
                <td className="px-4 py-2">Expense</td>
                <td className="px-4 py-2 text-red-500">Pending</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">#1235</td>
                <td className="px-4 py-2">May 9, 2025</td>
                <td className="px-4 py-2">$1,200</td>
                <td className="px-4 py-2">Revenue</td>
                <td className="px-4 py-2 text-green-500">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">#1236</td>
                <td className="px-4 py-2">May 8, 2025</td>
                <td className="px-4 py-2">$450</td>
                <td className="px-4 py-2">Expense</td>
                <td className="px-4 py-2 text-green-500">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{
  title: string;
  amount: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendText: string;
  color: string;
}> = ({ title, amount, icon, trend, trendText, color }) => (
  <div className={`flex items-center justify-between p-6 rounded-lg shadow-lg ${color}`}>
    <div>
      <h3 className="text-xl font-medium text-gray-800">{title}</h3>
      <p className="text-lg text-gray-600">{amount}</p>
      <div
        className={`mt-2 text-sm font-semibold ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        } flex items-center gap-1`}
      >
        {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
        {trendText}
      </div>
    </div>
    <div>{icon}</div>
  </div>
);

export default FinanceReport;
