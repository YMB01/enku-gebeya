'use client';

import { Wallet, ArrowDown, ArrowUp } from 'lucide-react';

export default function FinancePage() {
  return (
    <div className="p-6 md:ml-64 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Finance Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          icon={<Wallet className="text-blue-500 w-8 h-8" />}
          label="Total Balance"
          amount="$12,450.00"
        />
        <SummaryCard
          icon={<ArrowDown className="text-green-500 w-8 h-8" />}
          label="Income"
          amount="$3,200.00"
        />
        <SummaryCard
          icon={<ArrowUp className="text-red-500 w-8 h-8" />}
          label="Expenses"
          amount="$1,850.00"
        />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Chart</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
          Chart Component Placeholder
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  icon: React.ReactNode;
  label: string;
  amount: string;
};

function SummaryCard({ icon, label, amount }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{amount}</p>
      </div>
    </div>
  );
}
