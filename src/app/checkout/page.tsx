"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart } from '@/redux/slices/cartSlice';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Truck, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Valid phone number required"),
  address: z.string().min(3, "Detailed address is required"),
  city: z.string().min(2, "City is required"),
});

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'digital'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const SHIPPING_COST = 100;
  const FREE_SHIPPING_THRESHOLD = 1500;
  const finalShipping = totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = totalAmount + finalShipping;

  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#1F2937] mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Add some items before proceeding to checkout.</p>
        <button onClick={() => router.push('/')} className="bg-[#7355A4] text-white px-6 py-3 rounded-md hover:bg-[#5E4389] transition-colors">
          Return to Shop
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (step === 1) {
      const result = checkoutSchema.safeParse(formData);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message || "Please fill all required fields correctly");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/user/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          totalAmount: finalTotal,
          shippingAddress: `${formData.address}, ${formData.city}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      dispatch(clearCart());
      setStep(4);
      toast.success("Order placed successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred while placing your order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Steps Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-center mb-12">
          {['Delivery', 'Payment', 'Review'].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= idx + 1 ? 'bg-[#7355A4] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {idx + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= idx + 1 ? 'text-[#7355A4]' : 'text-gray-400'}`}>{s}</span>
              {idx < 2 && <div className={`w-12 h-px mx-4 ${step > idx + 1 ? 'bg-[#7355A4]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      )}

      <div className={`flex flex-col lg:flex-row gap-12 ${step === 4 ? 'justify-center' : ''}`}>
        {/* Main Content Area */}
        <div className={step < 4 ? "lg:w-2/3" : "w-full max-w-2xl mx-auto"}>
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-serif font-bold text-[#1F2937] mb-6">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#8A9A86] focus:border-[#8A9A86] outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#8A9A86] focus:border-[#8A9A86] outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#8A9A86] focus:border-[#8A9A86] outline-none transition-all" placeholder="017********" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#8A9A86] focus:border-[#8A9A86] outline-none transition-all" placeholder="Dhaka" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Detailed Address</label>
                    <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#8A9A86] focus:border-[#8A9A86] outline-none transition-all h-24 resize-none" placeholder="House/Flat No, Street Name, Area..." />
                  </div>
                </div>
                <button onClick={handleNext} className="mt-8 bg-[#7355A4] text-white px-8 py-4 rounded-md font-medium hover:bg-[#5E4389] transition-colors flex items-center gap-2">
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-serif font-bold text-[#1F2937] mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className={`flex items-center p-6 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#7355A4] bg-[#7355A4]/5' : 'border-gray-200 bg-white hover:border-[#7355A4]'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${paymentMethod === 'cod' ? 'border-[#7355A4]' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-[#7355A4]" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1F2937]">Cash on Delivery</h4>
                      <p className="text-sm text-gray-500 mt-1">Pay with cash when your order is delivered.</p>
                    </div>
                    <Truck className={paymentMethod === 'cod' ? 'text-[#7355A4]' : 'text-gray-400'} size={24} />
                  </label>

                  <label className={`flex items-center p-6 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'digital' ? 'border-[#7355A4] bg-[#7355A4]/5' : 'border-gray-200 bg-white hover:border-[#7355A4]'}`}>
                    <input type="radio" name="payment" value="digital" checked={paymentMethod === 'digital'} onChange={() => setPaymentMethod('digital')} className="hidden" />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${paymentMethod === 'digital' ? 'border-[#7355A4]' : 'border-gray-300'}`}>
                      {paymentMethod === 'digital' && <div className="w-3 h-3 rounded-full bg-[#7355A4]" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1F2937]">Digital Payment</h4>
                      <p className="text-sm text-gray-500 mt-1">Pay via bKash, Nagad, or Credit Card.</p>
                    </div>
                    <CreditCard className={paymentMethod === 'digital' ? 'text-[#7355A4]' : 'text-gray-400'} size={24} />
                  </label>
                </div>
                
                <div className="flex items-center gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="px-6 py-4 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                  <button onClick={handleNext} className="bg-[#7355A4] text-white px-8 py-4 rounded-md font-medium hover:bg-[#5E4389] transition-colors flex items-center gap-2">
                    Review Order <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-serif font-bold text-[#1F2937] mb-6">Review & Confirm</h2>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Delivery Information</h3>
                    <p className="font-medium text-[#1F2937]">{formData.fullName} ({formData.phone})</p>
                    <p className="text-gray-600 mt-1">{formData.address}, {formData.city}</p>
                    <button onClick={() => setStep(1)} className="text-sm text-[#7355A4] underline mt-2">Edit Details</button>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Payment Method</h3>
                    <p className="font-medium text-[#1F2937]">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Digital Payment'}</p>
                    <button onClick={() => setStep(2)} className="text-sm text-[#7355A4] underline mt-2">Edit Payment</button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="px-6 py-4 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1 bg-[#7355A4] text-white px-8 py-4 rounded-md font-medium hover:bg-[#5E4389] transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {isProcessing ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#1F2937] mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Thank you for shopping with Khata Kolom Shop. Your order <span className="font-bold text-[#1F2937]">#KKS-{Math.floor(1000 + Math.random() * 9000)}</span> has been placed successfully.
                </p>
                <button onClick={() => router.push('/')} className="bg-[#7355A4] text-white px-8 py-4 rounded-md font-medium hover:bg-[#5E4389] transition-colors">
                  Continue Shopping
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        {step < 4 && (
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-lg font-serif font-bold text-[#1F2937] mb-6">Order Summary</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                      {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-[#1F2937] line-clamp-2">{item.title}</p>
                      <p className="text-gray-500 mt-1">Qty: {item.quantity}</p>
                      <p className="font-semibold text-[#1F2937] mt-1">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1F2937]">৳{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {finalShipping === 0 ? (
                    <span className="font-bold text-[#8A9A86]">Free</span>
                  ) : (
                    <span className="font-medium text-[#1F2937]">৳{finalShipping.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-bold text-[#1F2937]">Total</span>
                <span className="text-2xl font-bold text-[#7355A4]">৳{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
