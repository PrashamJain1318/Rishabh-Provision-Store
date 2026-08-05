import React, { useEffect, useState } from "react";
import { StoreLayout } from "../layouts/StoreLayout";
import { Button, ProductCard } from "@rishabh-store/ui";
import { GroceryHeroCanvas } from "../components/3d/GroceryHeroCanvas";
import { PageTransition } from "../components/PageTransition";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Smartphone, ArrowRight, ShieldCheck, Zap, Truck, CreditCard } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  inStock: boolean;
  image: string;
}

const mockFeaturedProducts: Product[] = [
  { id: "P1", name: "Aashirvaad Shuddh Chakki Atta (5kg)", category: "Atta & Flours", price: "₹ 245", originalPrice: "₹ 275", rating: 4.8, inStock: true, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80" },
  { id: "P2", name: "Fortune Sunlite Sunflower Oil (1L)", category: "Edible Oils", price: "₹ 135", originalPrice: "₹ 155", rating: 4.6, inStock: true, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80" },
  { id: "P3", name: "Amul Butter Pasteurized (500g)", category: "Dairy & Chilled", price: "₹ 275", originalPrice: "₹ 275", rating: 4.9, inStock: true, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80" },
  { id: "P4", name: "Tata Salt Vacuum Evaporated (1kg)", category: "Salt & Sugar", price: "₹ 28", originalPrice: "₹ 28", rating: 4.7, inStock: true, image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c088?auto=format&fit=crop&w=400&q=80" },
];

const mockCategories = [
  { id: "C1", name: "Atta & Flours", icon: "🌾", count: "126 Products" },
  { id: "C2", name: "Edible Oils & Ghee", icon: "🍾", count: "84 Products" },
  { id: "C3", name: "Dairy, Milk & Butter", icon: "🥛", count: "92 Products" },
  { id: "C4", name: "Pulses, Dals & Rice", icon: "🫘", count: "145 Products" },
  { id: "C5", name: "Snacks & Biscuits", icon: "🍪", count: "210 Products" },
  { id: "C6", name: "Personal Care & Soap", icon: "🧼", count: "118 Products" },
];

const mockFaqs = [
  { q: "What are the store opening hours?", a: "Rishabh Provision Store is open daily from 7:00 AM to 9:30 PM (Monday through Sunday)." },
  { q: "How does the Digital Khata Udhar credit work?", a: "Registered local customers can request credit limits up to ₹10,000. All billing transactions are recorded digitally, and itemized WhatsApp statements are sent automatically." },
  { q: "What is the home delivery coverage radius?", a: "We offer free home delivery on orders above ₹500 within a 5 km radius of Station Road." },
  { q: "Can I print thermal receipts for POS purchases?", a: "Yes, our Express POS billing system instantly generates 2-inch and 3-inch thermal bills with complete GST breakdown." },
];

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <StoreLayout>
      <PageTransition>
        {/* 1. HERO SECTION: 3D Three.js Scene + Minimal Luxury Copy */}
        <section className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Zap className="w-3.5 h-3.5" /> Next-Gen Retail OS
            </div>

            <h1 className="text-display-hero text-slate-900 dark:text-slate-100 font-extrabold tracking-tight leading-none">
              Rishabh Provision Store
            </h1>
            <p className="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold tracking-tight">
              Smart Grocery. Smarter Business.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Enterprise grocery management engineered with Three.js 3D retail visualization, high-speed POS billing, digital Khata ledger, and 30-min home delivery.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <a href="/pos">
                <Button size="lg" variant="primary" className="text-base px-6 shadow-soft-md hover:scale-105 transition-all">
                  Express POS Terminal <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </a>
              <a href="/dashboard">
                <Button size="lg" variant="outline" className="text-base px-6 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  Owner Dashboard ➔
                </Button>
              </a>
            </div>
          </div>

          {/* 3D Interactive Three.js Scene Canvas */}
          <div className="lg:col-span-7">
            <GroceryHeroCanvas />
          </div>
        </section>

        {/* 2. FEATURED CATEGORIES SECTION (Curved Glassmorphism Cards) */}
        <section className="my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-section-title font-bold text-slate-900 dark:text-slate-100">Featured Categories</h2>
              <p className="text-sm text-slate-500 mt-1">Explore everyday grocery staples with live inventory counts.</p>
            </div>
            <a href="/dashboard/products" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              View All Categories ➔
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -6, rotate: 1, transition: { duration: 0.2 } }}
                className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 text-center flex flex-col items-center gap-2 shadow-soft-sm hover:shadow-soft-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{cat.name}</h4>
                <span className="text-xs text-slate-400 font-mono">{cat.count}</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">Explore →</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. FEATURED PRODUCTS SECTION */}
        <section className="my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-section-title font-bold text-slate-900 dark:text-slate-100">Best Selling Products</h2>
              <p className="text-sm text-slate-500 mt-1">Fresh stock with MRP discounts and express checkout.</p>
            </div>
            <a href="/dashboard/products" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Browse Full Catalog ➔
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFeaturedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                category={prod.category}
                price={prod.price}
                originalPrice={prod.originalPrice}
                rating={prod.rating}
                inStock={prod.inStock}
                image={prod.image}
                onAddToCart={() => alert(`Added ${prod.name} to cart!`)}
              />
            ))}
          </div>
        </section>

        {/* 4. STORE FEATURES SECTION (Apple / Stripe Inspired Minimal Cards) */}
        <section className="my-16 py-12 px-8 rounded-3xl bg-slate-900 text-white shadow-soft-lg border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Rishabh Provision Store?</h2>
            <p className="text-slate-400 text-sm mt-2">Empowering local neighborhood shopping with modern 3D convenience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center gap-3">
              <Zap className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-base">Express POS Billing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Keyboard-first barcode scanning & instant thermal bill receipt printing.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-base">Batch Expiry Control</h4>
              <p className="text-xs text-slate-400 leading-relaxed">30-day perishable alerts ensuring 100% fresh stock always.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center gap-3">
              <CreditCard className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-base">Digital Khata Ledger</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Udhar credit limits with automated WhatsApp payment statements.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center gap-3">
              <Truck className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-base">30-Min Home Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Free fast delivery on all local grocery orders above ₹500.</p>
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER TESTIMONIALS SECTION */}
        <section className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-section-title font-bold text-slate-900 dark:text-slate-100">Customer Testimonials</h2>
            <p className="text-sm text-slate-500 mt-1">Trusted by over 2,500+ neighborhood households and local businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 shadow-soft-sm">
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"The digital Khata statement sent via WhatsApp makes monthly grocery bill management completely transparent and hassle-free."</p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">RK</div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">Ramesh Kumar</h5>
                  <span className="text-[10px] text-slate-400">Regular Customer</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 shadow-soft-sm">
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"Super fast cashier checkout! Their POS barcode scanner processes item billing in seconds even during evening rush hours."</p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">SP</div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">Sneh Patel</h5>
                  <span className="text-[10px] text-slate-400">Local Resident</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 shadow-soft-sm">
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"Always 100% fresh stocks with zero expired items. Order home delivery online and receive items within 30 minutes!"</p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">AM</div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">Anjali Mehta</h5>
                  <span className="text-[10px] text-slate-400">Home Baker</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BUSINESS STATISTICS SECTION */}
        <section className="my-16 p-8 rounded-3xl bg-emerald-600 text-white shadow-soft-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-extrabold font-mono">₹ 4.8L+</div>
              <p className="text-xs text-emerald-100 mt-1 uppercase tracking-wider font-semibold">Monthly Turnover</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold font-mono">2,500+</div>
              <p className="text-xs text-emerald-100 mt-1 uppercase tracking-wider font-semibold">Bills Processed</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold font-mono">1,420</div>
              <p className="text-xs text-emerald-100 mt-1 uppercase tracking-wider font-semibold">Active Khata Users</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold font-mono">99.8%</div>
              <p className="text-xs text-emerald-100 mt-1 uppercase tracking-wider font-semibold">On-Time Delivery</p>
            </div>
          </div>
        </section>

        {/* 7. DOWNLOAD APP PROMOTION BANNER (Zepto / Blinkit Inspired) */}
        <section className="my-16 glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Mobile App Experience
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Order Groceries On The Go</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Download the Rishabh Provision Store mobile application for iOS and Android. Track live delivery, manage digital Khata balances, and receive exclusive promo coupons.
            </p>
            <div className="flex gap-3 pt-2">
              <button className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-soft-sm hover:bg-slate-800 transition-all">
                <Smartphone className="w-4 h-4 text-emerald-400" /> App Store (iOS)
              </button>
              <button className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-soft-sm hover:bg-slate-800 transition-all">
                <Smartphone className="w-4 h-4 text-emerald-400" /> Google Play (Android)
              </button>
            </div>
          </div>

          <div className="w-48 h-64 bg-slate-900 text-white rounded-3xl p-4 flex flex-col items-center justify-center border-4 border-slate-800 shadow-soft-lg text-center gap-2">
            <Smartphone className="w-12 h-12 text-emerald-400 mb-2" />
            <h5 className="font-bold text-sm">Rishabh App</h5>
            <span className="text-[10px] text-slate-400">30-Min Fast Delivery</span>
            <span className="mt-2 px-3 py-1 bg-emerald-600 text-white text-[10px] rounded-full font-mono font-bold">iOS & Android</span>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="my-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-section-title font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 mt-1">Everything you need to know about shopping & store billing.</p>
          </div>

          <div className="flex flex-col gap-3">
            {mockFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-soft-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  <span className="text-emerald-600 text-lg">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </PageTransition>
    </StoreLayout>
  );
};

export default LandingPage;
