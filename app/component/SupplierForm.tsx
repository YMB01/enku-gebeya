import React, { Component, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface State {
  suppliers: Supplier[];
  form: Omit<Supplier, 'id'>;
  editingId: number | null;
  showModal: boolean;
  deleteId: number | null;
}

export default class SupplierForm extends Component<{}, State> {
  state: State = {
    suppliers: [
      { id: 1, name: 'Supplier 1', phone: '123-456-7890', address: '123 Main St' },
      { id: 2, name: 'Supplier 2', phone: '987-654-3210', address: '456 Oak Ave' },
      { id: 3, name: 'Supplier 3', phone: '555-123-4567', address: '789 Pine Rd' },
    ],
    form: { name: '', phone: '', address: '' },
    editingId: null,
    showModal: false,
    deleteId: null,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      form: { ...prev.form, [name]: value },
    }));
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { suppliers, form, editingId } = this.state;

    if (editingId === null) {
      const newSupplier: Supplier = {
        id: Date.now(),
        ...form,
      };
      this.setState({ suppliers: [...suppliers, newSupplier], form: { name: '', phone: '', address: '' } });
      toast.success('Supplier added successfully!');
    } else {
      const updated = suppliers.map(s =>
        s.id === editingId ? { ...s, ...form } : s
      );
      this.setState({ suppliers: updated, form: { name: '', phone: '', address: '' }, editingId: null });
      toast.info('Supplier updated successfully!');
    }
  };

  handleEdit = (id: number) => {
    const supplier = this.state.suppliers.find(s => s.id === id);
    if (supplier) {
      this.setState({
        form: { name: supplier.name, phone: supplier.phone, address: supplier.address },
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
    const { deleteId, suppliers } = this.state;
    if (deleteId !== null) {
      const filtered = suppliers.filter(s => s.id !== deleteId);
      this.setState({ suppliers: filtered, showModal: false, deleteId: null });
      toast.error('Supplier deleted successfully!');
    }
  };

  render() {
    const { form, suppliers, editingId, showModal } = this.state;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <ToastContainer position="top-right" />

        {/* Form */}
        <form onSubmit={this.handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6 mb-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Supplier' : 'Add Supplier'}
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Supplier Name</label>
              <input
                name="name"
                id="name"
                placeholder="Supplier Name"
                value={form.name}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                id="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                id="address"
                placeholder="Address"
                value={form.address}
                onChange={this.handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg">
            {editingId ? 'Update' : 'Submit'}
          </button>
        </form>

        {/* Supplier List Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-600 text-white">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 text-gray-800">{s.name}</td>
                  <td className="py-4 px-6 text-gray-800">{s.phone}</td>
                  <td className="py-4 px-6 text-gray-800">{s.address}</td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                      <button
                        onClick={() => this.handleEdit(s.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.confirmDelete(s.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">No suppliers available.</td>
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
              <p className="text-gray-600 mb-6">Are you sure you want to delete this supplier?</p>
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
