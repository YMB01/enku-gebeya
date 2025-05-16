"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Slider from "react-slick";

// Dummy product data
const products = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + 1,
  name: `Product ${idx + 1}`,
  description: "A short product description with key features and benefits.",
}));

const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage() {
  // ------------------------ States ------------------------
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ------------------------ Filtering & Pagination ------------------------
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // ------------------------ Image Slider Settings ------------------------
 

  return (
    <>
      {/* Top Navbar */}
      <Navbar />
<br />
<br />
<br />

      {/* ---------- Product Search + Grid Section ---------- */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-10 px-4 min-h-screen">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset page
                }}
                placeholder="Search products..."
                className="w-full px-5 py-3 pl-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-800"
              />
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[#FFA500] p-2 rounded-full text-white hover:opacity-90 transition">
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ---------- Modal (Product Detail) ---------- */}
          {isModalOpen && selectedProduct && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative animate-fade-in">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                  aria-label="Close"
                >
                  &times;
                </button>

                <div className="mb-6 h-48 bg-gray-100 rounded-xl" />

                <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-3">
                  {selectedProduct.name}
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedProduct.description} This is a more detailed description that may
                  include benefits, specs, pricing options, and more.
                </p>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ---------- Product Grid ---------- */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 border border-gray-100"
              >
                <div className="h-48 bg-gray-200 rounded-xl mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="inline-block font-semibold bg-[#FFA500] text-white px-4 py-2 rounded-full transition hover:bg-orange-600"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* ---------- Pagination ---------- */}
          <div className="flex justify-center items-center mt-14 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-orange-600 transition disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-9 h-9 rounded-full text-sm font-semibold ${
                  currentPage === idx + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-orange-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
