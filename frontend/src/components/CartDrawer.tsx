import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, Zap, ArrowRight, CheckCircle2, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../services/supabase";

type CheckoutStep = "cart" | "details" | "confirmed";

const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleClose = () => { setIsOpen(false); setTimeout(() => setStep("cart"), 400); };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);

    const orderItems = items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image }));
    const generatedId = `RG-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await supabase.from("orders").insert([{
      order_id: generatedId,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      delivery_address: form.address,
      items: orderItems,
      total_amount: total,
      status: "confirmed",
    }]);

    if (error) { alert("Order failed: " + error.message); setPlacing(false); return; }

    // Send confirmation email
    try {
      await supabase.functions.invoke("send-order-email", {
        body: {
          type: "order",
          to: form.email,
          name: form.name,
          orderId: generatedId,
          items: orderItems,
          total,
          address: form.address,
        },
      });
    } catch (_) {}

    setOrderId(generatedId);
    clearCart();
    setStep("confirmed");
    setPlacing(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0D0D0D] border-l border-white/10 z-[80] flex flex-col shadow-2xl"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B000FF]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#B000FF]/20 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#B000FF]" />
                </div>
                <div>
                  <h2 className="text-white font-black text-lg">
                    {step === "cart" ? "Your Arsenal" : step === "details" ? "Delivery Intel" : "Order Confirmed"}
                  </h2>
                  {step === "cart" && <p className="text-slate-500 text-xs">{count} item{count !== 1 ? "s" : ""}</p>}
                </div>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps indicator */}
            {step !== "confirmed" && (
              <div className="flex px-6 pt-4 gap-2">
                {["cart", "details"].map((s, i) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === s || (step === "details" && i === 0) ? "bg-[#B000FF]" : "bg-white/10"}`} />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto relative z-10">
              <AnimatePresence mode="wait">

                {/* CART STEP */}
                {step === "cart" && (
                  <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="p-6 flex flex-col gap-4">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                          <ShoppingBag className="w-10 h-10 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-semibold">Your arsenal is empty</p>
                        <p className="text-slate-600 text-sm mt-1">Add some gear to get started</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                          className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 group hover:border-[#B000FF]/30 transition-all"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm line-clamp-2 mb-1">{item.name}</p>
                            {item.condition && <span className="text-[10px] text-[#B000FF] bg-[#B000FF]/10 px-2 py-0.5 rounded-full font-bold">{item.condition}</span>}
                            <p className="text-[#B000FF] font-black mt-2">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                <Minus className="w-3 h-3 text-white" />
                              </button>
                              <span className="text-white text-sm font-bold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                <Plus className="w-3 h-3 text-white" />
                              </button>
                              <button onClick={() => removeItem(item.id)} className="ml-auto w-6 h-6 rounded-md bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-all">
                                <Trash2 className="w-3 h-3 text-rose-400" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}

                {/* DETAILS STEP */}
                {step === "details" && (
                  <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="p-6">
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                      {[
                        { key: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
                        { key: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
                        { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
                      ].map(({ key, label, placeholder, type }) => (
                        <div key={key}>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">{label}</label>
                          <input
                            required
                            type={type}
                            value={(form as any)[key]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            placeholder={placeholder}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#B000FF] transition-colors placeholder-slate-600 text-sm"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Delivery Address</label>
                        <textarea
                          required
                          rows={3}
                          value={form.address}
                          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                          placeholder="Full address with pincode..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#B000FF] transition-colors placeholder-slate-600 text-sm resize-none"
                        />
                      </div>

                      {/* Order Summary */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 mt-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Summary</p>
                        {items.map(i => (
                          <div key={i.id} className="flex justify-between text-sm">
                            <span className="text-slate-400 truncate max-w-[200px]">{i.name} ×{i.quantity}</span>
                            <span className="text-white font-semibold">₹{(i.price * i.quantity).toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                        <div className="border-t border-white/10 pt-2 flex justify-between">
                          <span className="text-white font-bold">Total</span>
                          <span className="text-[#B000FF] font-black text-lg">₹{total.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* CONFIRMED STEP */}
                {step === "confirmed" && (
                  <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="p-6 flex flex-col items-center text-center py-12">
                    {/* Animated checkmark */}
                    <div className="relative mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                        className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                      </motion.div>
                      {/* Pulse rings */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                        className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                      />
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                        className="absolute inset-0 rounded-full border border-emerald-500/20"
                      />
                    </div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <h3 className="text-2xl font-black text-white mb-2">Order Confirmed!</h3>
                      <div className="inline-flex items-center gap-2 bg-[#B000FF]/10 border border-[#B000FF]/30 rounded-full px-4 py-1.5 mb-4">
                        <Package className="w-4 h-4 text-[#B000FF]" />
                        <span className="text-[#B000FF] font-black text-sm tracking-wider">{orderId}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                        Your order has been placed. A confirmation email has been sent to <span className="text-white font-semibold">{form.email}</span>.
                      </p>
                      <p className="text-slate-500 text-xs mt-3">Expected delivery: 3–7 business days across India</p>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={handleClose}
                      className="mt-8 bg-[#B000FF] hover:bg-[#9000D3] text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(176,0,255,0.4)]"
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer */}
            {step !== "confirmed" && items.length > 0 && (
              <div className="p-6 border-t border-white/10 relative z-10 bg-[#0D0D0D]">
                {step === "cart" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-semibold">Total</span>
                      <span className="text-2xl font-black text-white">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    <button
                      onClick={() => setStep("details")}
                      className="w-full bg-[#B000FF] hover:bg-[#9000D3] text-white py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(176,0,255,0.4)] hover:shadow-[0_0_30px_rgba(176,0,255,0.6)] flex items-center justify-center gap-2 active:scale-95"
                    >
                      Proceed to Checkout <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {step === "details" && (
                  <div className="space-y-3">
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={placing}
                      className="w-full bg-[#B000FF] hover:bg-[#9000D3] text-white py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(176,0,255,0.4)] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      {placing ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                      ) : (
                        <><Zap className="w-5 h-5" /> Place Order — ₹{total.toLocaleString("en-IN")}</>
                      )}
                    </button>
                    <button onClick={() => setStep("cart")} className="w-full text-slate-400 hover:text-white text-sm transition-colors py-1">
                      ← Back to cart
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
