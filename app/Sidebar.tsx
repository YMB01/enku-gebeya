'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaRegChartBar,
  FaCashRegister,
  FaTags,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 text-2xl text-black"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-black p-6 shadow-lg border-r-4 border-orange-500 z-40 transition-transform transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-3xl font-bold mb-10 text-center text-orange-600">Finance</h1>

        <ul className="space-y-4">
          <SidebarItem href="/finance/product" icon={<FaBox />} label="Products" pathname={pathname} onClick={closeSidebar} />
          <SidebarItem href="/finance/suppliers" icon={<FaUsers />} label="Suppliers" pathname={pathname} onClick={closeSidebar} />
          <SidebarItem href="/finance/sales" icon={<FaShoppingCart />} label="Sales" pathname={pathname} onClick={closeSidebar} />
          <SidebarItem href="/finance/expenses" icon={<FaDollarSign />} label="Expenses" pathname={pathname} onClick={closeSidebar} />
          <SidebarItem href="/finance/cashflow" icon={<FaCashRegister />} label="Cash Flow" pathname={pathname} onClick={closeSidebar} />
          <SidebarItem href="/finance/categories" icon={<FaTags />} label="Categories" pathname={pathname} onClick={closeSidebar} />
          <SidebarItem href="/finance/reports" icon={<FaRegChartBar />} label="Reports" pathname={pathname} onClick={closeSidebar} />
        </ul>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const SidebarItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  onClick?: () => void;
}> = ({ href, icon, label, pathname, onClick }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center space-x-4 py-3 px-4 rounded-md transition-all
        ${pathname === href ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'}`}
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-md font-medium">{label}</span>
    </Link>
  </li>
);

export default Sidebar;
