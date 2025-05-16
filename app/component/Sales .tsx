import React, { Component, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Sale {
  id: number;
  product: string;
  quantity: string;
  total: string;
}

interface State {
  sales: Sale[];
  form: Omit<Sale, 'id'>;
  editingId: number | null;
  showModal: boolean;
  deleteId: number | null;
}

export default class SaleForm extends Component<{}, State> {
  state: State = {
    sales: [
      { id: 1, product: 'Laptop', quantity: '2', total: '2000' },
      { id: 2, product: 'Phone', quantity: '5', total: '3000' },
      { id: 3, product: 'Headphones', quantity: '10', total: '500' },
    ],
    form: { product: '', quantity: '', total: '' },
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
    const { sales, form, editingId } = this.state;

    if (!form.product || !form.quantity || !form.total) {
      toast.error('All fields are required!');
      return;
    }

    if (editingId === null) {
      const newSale: Sale = {
        id: Date.now(),
        ...form,
      };
      this.setState(
        { sales: [...sales, newSale], form: { product: '', quantity: '', total: '' } },
        () => toast.success('Sale added successfully!')
      );
    } else {
      const updated = sales.map(s =>
        s.id === editingId ? { ...s, ...form } : s
      );
      this.setState(
        { sales: updated, form: { product: '', quantity: '', total: '' }, editingId: null },
        () => toast.info('Sale updated successfully!')
      );
    }
  };

  handleEdit = (id: number) => {
    const sale = this.state.sales.find(s => s.id === id);
    if (sale) {
      this.setState({
        form: { product: sale.product, quantity: sale.quantity, total: sale.total },
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
    const { deleteId, sales } = this.state;
    if (deleteId !== null) {
      const filtered = sales.filter(s => s.id !== deleteId);
      this.setState(
        { sales: filtered, showModal: false, deleteId: null },
        () => toast.error('Sale deleted successfully!')
      );
    }
  };

  render() {
    const { form, sales, editingId, showModal } = this.state;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <ToastContainer position="top-right" />

        {/* Form */}
        <form onSubmit={this.handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6 mb-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Sale' : 'Add Sale'}
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="product" className="block text-lg font-medium text-gray-700">Product</label>
              <input
                name="product"
                id="product"
                placeholder="Product"
                value={form.product}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
              <input
                name="quantity"
                id="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
            <div>
              <label htmlFor="total" className="block text-lg font-medium text-gray-700">Total</label>
              <input
                name="total"
                id="total"
                placeholder="Total"
                value={form.total}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500          "
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            {editingId ? 'Update' : 'Submit'}
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 text-gray-800">{s.product}</td>
                  <td className="py-4 px-6 text-gray-800">{s.quantity}</td>
                  <td className="py-4 px-6 text-gray-800">{s.total}</td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => this.handleEdit(s.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.confirmDelete(s.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">No sales recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="text-gray-700 mb-6">Are you sure you want to delete this sale?</p>
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
