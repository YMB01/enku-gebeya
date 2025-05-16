import React, { Component, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Expense {
  id: number;
  category: string;
  amount: string;
  date: string;
}

interface State {
  expenses: Expense[];
  form: Omit<Expense, 'id'>;
  editingId: number | null;
  showModal: boolean;
  deleteId: number | null;
}

export default class ExpenseForm extends Component<{}, State> {
  state: State = {
    expenses: [
      { id: 1, category: 'Food', amount: '50.00', date: '2025-05-01' },
      { id: 2, category: 'Transport', amount: '20.00', date: '2025-05-02' },
      { id: 3, category: 'Utilities', amount: '150.00', date: '2025-05-03' },
    ],
    form: { category: '', amount: '', date: '' },
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
    const { expenses, form, editingId } = this.state;

    if (!form.category || !form.amount || !form.date) {
      toast.error('All fields are required!');
      return;
    }

    if (editingId === null) {
      const newExpense: Expense = {
        id: Date.now(),
        ...form,
      };
      this.setState(
        { expenses: [...expenses, newExpense], form: { category: '', amount: '', date: '' } },
        () => toast.success('Expense added successfully!')
      );
    } else {
      const updated = expenses.map(e =>
        e.id === editingId ? { ...e, ...form } : e
      );
      this.setState(
        { expenses: updated, form: { category: '', amount: '', date: '' }, editingId: null },
        () => toast.info('Expense updated successfully!')
      );
    }
  };

  handleEdit = (id: number) => {
    const expense = this.state.expenses.find(e => e.id === id);
    if (expense) {
      this.setState({
        form: { category: expense.category, amount: expense.amount, date: expense.date },
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
    const { deleteId, expenses } = this.state;
    if (deleteId !== null) {
      const filtered = expenses.filter(e => e.id !== deleteId);
      this.setState({ expenses: filtered, showModal: false, deleteId: null });
      toast.error('Expense deleted successfully!');
    }
  };

  render() {
    const { form, expenses, editingId, showModal } = this.state;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <ToastContainer position="top-right" />

        {/* Form */}
        <form onSubmit={this.handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6 mb-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Expense' : 'Add Expense'}
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
              <input
                name="category"
                id="category"
                placeholder="Category"
                value={form.category}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-lg font-medium text-gray-700">Amount</label>
              <input
                name="amount"
                id="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={form.date}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4"
          >
            {editingId ? 'Update' : 'Submit'}
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 text-gray-800">{e.category}</td>
                  <td className="py-4 px-6 text-gray-800">{e.amount}</td>
                  <td className="py-4 px-6 text-gray-800">{e.date}</td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                      <button
                        onClick={() => this.handleEdit(e.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.confirmDelete(e.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No expense records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/70 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this expense record?</p>
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
