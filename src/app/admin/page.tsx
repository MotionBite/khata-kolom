"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, AlertCircle, Plus, Store } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setIsLoading(false);
      })
      .catch(e => {
        console.error("Failed to load dashboard data", e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500 font-medium">Loading dashboard overview...</div>;
  }

  const stats = [
    { name: 'Total Revenue', value: `৳${data?.stats?.totalRevenue?.toLocaleString() || 0}`, change: '+12.5%', icon: TrendingUp, positive: true },
    { name: 'Total Orders', value: data?.stats?.totalOrders?.toLocaleString() || 0, change: '+8.2%', icon: ShoppingCart, positive: true },
    { name: 'Active Customers', value: data?.stats?.activeCustomers?.toLocaleString() || 0, change: '+2.4%', icon: Users, positive: true },
    { name: 'Total Products', value: data?.stats?.totalProducts?.toLocaleString() || 0, change: 'Active', icon: Package, positive: true },
  ];

  const recentOrders = data?.recentOrders || [];
  const lowStockAlerts = data?.lowStock || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1F2937] flex items-center gap-2">
            Dashboard Overview
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Live Store Status: Active • Last updated: Today, 09:30 AM</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="px-4 py-2.5 text-sm font-semibold text-[#7355A4] bg-purple-50 hover:bg-purple-100 rounded-full transition-colors flex items-center gap-2">
            <Store size={16} /> Live Store
          </Link>
          <Link href="/admin/products/new" className="px-4 py-2.5 text-sm font-semibold text-white bg-[#7355A4] hover:bg-[#5e4389] rounded-full shadow-sm transition-colors flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-purple-50/80 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center text-[#7355A4]">
                <stat.icon size={22} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full ${stat.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
              <h3 className="text-3xl font-bold text-[#1F2937] mt-1 font-serif">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-purple-50/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-[#1F2937] font-serif">Recent Orders</h2>
            <button className="text-xs font-bold text-[#7355A4] hover:text-[#5e4389] uppercase tracking-wider">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Order ID</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Amount</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#1F2937]">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-bold text-[#1F2937]">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700' // Processing / Pending
                      }`}>
                        {order.status || 'Processing'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-purple-50/80 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
            <h2 className="text-lg font-bold text-[#1F2937] font-serif flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" /> Low Stock
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            {lowStockAlerts.length > 0 ? lowStockAlerts.map((alert: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-[#1F2937]">{alert.item}</p>
                  <p className="text-xs text-gray-500 mt-0.5">SKU: {alert.sku || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-md">{alert.stock} Left</span>
                  <button className="text-[#7355A4] hover:bg-purple-50 p-1.5 rounded-lg transition-colors" title="Replenish">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-8">
                <Package size={48} className="mb-3 opacity-20" />
                <p className="text-sm font-medium text-gray-500">Inventory looks good</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
