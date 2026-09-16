"use client";

import { useState } from 'react';
import { Search, Eye, Filter, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockOrders = [
  { id: '#KKS-4829', customer: 'Rayan Ahmed', phone: '01711223344', date: 'Oct 24, 2026', items: 3, total: 2450, status: 'Processing', payment: 'COD' },
  { id: '#KKS-4828', customer: 'Sara Rahman', phone: '01811223355', date: 'Oct 24, 2026', items: 1, total: 1200, status: 'Completed', payment: 'bKash' },
  { id: '#KKS-4827', customer: 'Farhan Ali', phone: '01911223366', date: 'Oct 23, 2026', items: 2, total: 850, status: 'Pending', payment: 'Card' },
  { id: '#KKS-4826', customer: 'Tasnim Hossain', phone: '01611223377', date: 'Oct 23, 2026', items: 5, total: 5600, status: 'Completed', payment: 'Nagad' },
  { id: '#KKS-4825', customer: 'Karimul Islam', phone: '01511223388', date: 'Oct 22, 2026', items: 1, total: 3200, status: 'Cancelled', payment: 'COD' },
];

const tabs = [
  { id: 'all', label: 'সব অর্ডার', count: 124 },
  { id: 'Pending', label: 'নতুন অর্ডার (Pending)', count: 12 },
  { id: 'Processing', label: 'কুরিয়ারে আছে (Processing)', count: 28 },
  { id: 'Completed', label: 'ডেলিভারি সম্পন্ন (Completed)', count: 84 },
];

export default function OrdersAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState(mockOrders);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getPaymentBadge = (payment: string) => {
    switch (payment) {
      case 'bKash': return <span className="bg-pink-50 text-pink-600 border border-pink-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">bKash</span>;
      case 'Nagad': return <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Nagad</span>;
      case 'Card': return <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Card</span>;
      default: return <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">COD</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-serif font-bold text-[#1F2937]">Order Management</h1>
      </div>

      {/* Quick Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === tab.id 
                ? 'bg-[#7355A4] text-white border-[#7355A4] shadow-md shadow-purple-500/20' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Search by Order ID, Name, or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7355A4] transition-all bg-white shadow-sm"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-[#FAF9FC] text-gray-500 uppercase text-[10px] tracking-widest border-b border-gray-100 font-black">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center text-gray-500 font-medium">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order, idx) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-[#1F2937]">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1F2937]">{order.customer}</span>
                          <a href={`tel:${order.phone}`} className="text-[11px] font-medium text-gray-500 hover:text-[#7355A4] flex items-center gap-1 mt-0.5 transition-colors">
                            <Phone size={10} /> {order.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">{order.date}</td>
                      <td className="px-6 py-4 text-gray-600 font-bold">{order.items} items</td>
                      <td className="px-6 py-4 font-bold text-[#1F2937]">৳{order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">{getPaymentBadge(order.payment)}</td>
                      <td className="px-6 py-4">
                        <div className="relative w-fit">
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full outline-none cursor-pointer border appearance-none pr-6 shadow-sm transition-colors ${
                              order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' :
                              order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' :
                              order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' :
                              'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none w-1.5 h-1.5 rounded-full ${
                              order.status === 'Completed' ? 'bg-green-500' :
                              order.status === 'Processing' ? 'bg-blue-500' :
                              order.status === 'Cancelled' ? 'bg-red-500' :
                              'bg-amber-500'
                          }`}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="flex items-center justify-center ml-auto gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7355A4] bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-100" title="View Details">
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-white">
          <span className="font-medium text-xs">Showing 1 to {filteredOrders.length} of {filteredOrders.length} entries</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 font-bold text-xs uppercase tracking-wider transition-colors disabled" disabled>Prev</button>
            <button className="px-4 py-2 bg-[#7355A4] text-white rounded-xl shadow-md font-bold text-xs uppercase tracking-wider">1</button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 font-bold text-xs uppercase tracking-wider transition-colors disabled" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
