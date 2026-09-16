"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Package, Download, Truck, ExternalLink, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrdersPage() {
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const res = await fetch('/api/user/orders');
          if (res.ok) {
            const data = await res.json();
            setOrders(data.orders || []);
          }
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated]);

  if (!isMounted || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#FAF9FC] py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#7355A4] transition-colors w-fit">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#7355A4]">
              <Package size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#1F2430]">Order History</h1>
              <p className="text-sm text-gray-500">Track and manage your recent purchases</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-[#F0ECF4]">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-[#1F2430] mb-2">No orders found</h3>
              <p className="text-gray-500 text-sm mb-6">Looks like you haven't made any purchases yet.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#7355A4] text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:bg-[#5E4389]">
                Start Shopping
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-[#F0ECF4] overflow-hidden transition-shadow hover:shadow-md">
                
                {/* Order Header Ribbon */}
                <div className="bg-[#F8F9FA] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0ECF4]">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Order Number</span>
                      <span className="font-semibold text-[#1F2430]">{order.id.split('-')[0]}...</span>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Date Placed</span>
                      <span className="font-medium text-[#1F2430]">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Amount</span>
                      <span className="font-bold text-[#7355A4]">${Number(order.totalAmount).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="shrink-0">
                    {order.status === 'COMPLETED' ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-green-200">
                        <CheckCircle2 size={14} /> Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-100">
                        <Truck size={14} /> {order.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Rows */}
                <div className="px-6 py-2">
                  {order.orderItems.map((item: any, idx: number) => (
                    <div key={item.id} className={`py-4 flex items-center gap-4 ${idx !== order.orderItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF9FC] rounded-xl overflow-hidden border border-gray-100 shrink-0">
                        {item.product?.imageSrc ? (
                          <Image 
                            src={item.product.imageSrc} 
                            alt={item.product.title} 
                            fill 
                            className="object-cover mix-blend-multiply p-1" 
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#1F2430] truncate">{item.product?.title || 'Unknown Product'}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-gray-400">Qty: {item.quantity}</span>
                          <span className="text-xs font-medium text-gray-300">•</span>
                          <span className="text-xs font-bold text-[#1F2430]">${Number(item.price).toFixed(2)}</span>
                        </div>
                      </div>

                      <Link href={`/product/${item.product?.slug}`} className="hidden sm:flex text-[#7355A4] hover:text-[#5E4389] hover:bg-[#7355A4]/10 p-2 rounded-full transition-colors">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Action Strip */}
                <div className="bg-white px-6 py-4 flex flex-wrap items-center gap-3 border-t border-[#F0ECF4]">
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 hover:text-[#1F2430] hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    <Download size={14} /> Download Receipt
                  </button>
                  
                  {order.status === 'PENDING' || order.status === 'PROCESSING' ? (
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#7355A4] bg-[#7355A4]/5 hover:bg-[#7355A4]/10 rounded-lg transition-colors border border-[#7355A4]/20 ml-auto">
                      Track Package <ExternalLink size={14} />
                    </button>
                  ) : null}
                  
                  {order.status === 'COMPLETED' ? (
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1F2430] hover:bg-black rounded-lg transition-colors shadow-sm ml-auto">
                      Write a Review
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}
