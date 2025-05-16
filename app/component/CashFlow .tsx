import React, { Component, ChangeEvent, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CashFlow {
  id: number;
  date: string;
  description: string;
  amount: string;
}

interface State {
  cashFlows: CashFlow[];
  form: Omit<CashFlow, 'id'>;
  editingId: number | null;
  showModal: boolean;
  deleteId: number | null;
}

export default class CashFlowForm extends Component<{}, State> {
  state: State = {
    cashFlows: [
      { id: 1, date: '2025-05-01', description: 'Salary', amount: '5000' },
      { id: 2, date: '2025-05-03', description: 'Investment Return', amount: '1200' },
      { id: 3, date: '2025-05-06', description: 'Loan Repayment', amount: '-800' },
    ],
    form: { date: '', description: '', amount: '' },
    editingId: null,
    showModal: false,
    deleteId: null,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      form: { ...prev.form, [name]: value },
    }));
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { cashFlows, form, editingId } = this.state;

    if (!form.date || !form.description || !form.amount) {
      toast.error('All fields are required!');
      return;
    }

    if (editingId === null) {
      const newCashFlow: CashFlow = {
        id: Date.now(),
        ...form,
      };
      this.setState({
        cashFlows: [...cashFlows, newCashFlow],
        form: { date: '', description: '', amount: '' },
      });
      toast.success('Cash flow added!');
    } else {
      const updated = cashFlows.map(c =>
        c.id === editingId ? { ...c, ...form } : c
      );
      this.setState({
        cashFlows: updated,
        form: { date: '', description: '', amount: '' },
        editingId: null,
      });
      toast.info('Cash flow updated!');
    }
  };

  handleEdit = (id: number) => {
    const cashFlow = this.state.cashFlows.find(c => c.id === id);
    if (cashFlow) {
      this.setState({
        form: {
          date: cashFlow.date,
          description: cashFlow.description,
          amount: cashFlow.amount,
        },
        editingId: id,
      });
    }
  };

  confirmDelete = (id: number) => {
    this.setState({ showModal: true, deleteId: id });
  };

  cancelDelete = () => {
    this.setState({ showModal: false, deleteId: null });
  };

  handleDelete = () => {
    const { deleteId, cashFlows } = this.state;
    if (deleteId !== null) {
      const filtered = cashFlows.filter(c => c.id !== deleteId);
      this.setState({ cashFlows: filtered, showModal: false, deleteId: null });
      toast.warning('Cash flow deleted!');
    }
  };

  render() {
    const { form, cashFlows, editingId, showModal } = this.state;

    return (
      <div className="max-w-5xl mx-auto p-6">
        <ToastContainer position="top-right" />

        {/* Form */}
        <form
          onSubmit={this.handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6 mb-8 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {editingId ? 'Edit Cash Flow' : 'Add Cash Flow'}
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={form.date}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={form.description}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>

            <div>
              <label htmlFor="amount" className="block font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={form.amount}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            {editingId ? 'Update' : 'Submit'}
          </button>
        </form>

        {/* Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-600 text-white">
              <tr>
                <th className="px-6 py-3 text-white">Date</th>
                <th className="px-6 py-3 text-white">Description</th>
                <th className="px-6 py-3 text-white">Amount</th>
                <th className="px-6 py-3 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cashFlows.map(c => (
                <tr key={c.id} className="bborder-b hover:bg-gray-100">
                  <td className="py-4 px-6 text-gray-800">{c.date}</td>
                  <td className="py-4 px-6 text-gray-800">{c.description}</td>
                  <td className="ppy-4 px-6 text-gray-800">{c.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                      <button
                        onClick={() => this.handleEdit(c.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.confirmDelete(c.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cashFlows.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No cash flow records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/70 backdrop-blur-sm transition duration-300">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this cash flow record?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={this.cancelDelete}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={this.handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
