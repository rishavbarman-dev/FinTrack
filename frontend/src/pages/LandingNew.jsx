import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { motion, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

const LandingEnhanced = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef(null);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
  }, [scrollY]);

  // GSAP Animations
  useEffect(() => {
    // Counter animation for stats
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            snap: { innerText: 1 },
            onUpdate: function () {
              counter.innerText = Math.ceil(counter.innerText).toLocaleString();
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-purple-50 to-indigo-100 text-gray-900 flex flex-col">
      {/* Top nav */}
      <motion.header
        animate={{
          paddingTop: scrolled ? 12 : 16,
          paddingBottom: scrolled ? 12 : 16,
        }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-50 w-full ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-sm border-b border-gray-200"
            : "bg-white/40 backdrop-blur-md border-b border-white/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <img src={logo} alt="FinTrack logo" className="w-8 h-8" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={fadeUp} className="font-semibold">FinTrack</motion.p>
              <motion.h1 variants={fadeUp} className="text-xs text-gray-500">
                Smarter Tracking, Better Saving
              </motion.h1>
            </motion.div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <a
              href="#home"
              className="hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#security"
              className="hover:text-indigo-600 transition-colors"
            >
              Security
            </a>
          </nav>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-purple-500 px-4 sm:px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-purple-500/30 hover:from-purple-500 hover:to-indigo-600 transition-all duration-300"
            >
              Get started
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero + preview */}
      <main className="flex-1">
        {/* Hero  */}
        <section id="home" className="relative overflow-hidden">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-purple-400/30 blur-3xl"
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-indigo-400/30 blur-3xl"
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
            {/* copy */}
            <div>
              <p className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm border border-indigo-100 mb-4">
                Personal finance, made visual and effortless
              </p>
              <SplitText
                text="See every rupee,"
                className="text-3xl sm:text-4xl lg:text-5xl lg:pb-2 font-bold tracking-tight text-indigo-700"
                delay={30}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
              <SplitText
                text="plan every goal."
                className="text-3xl sm:text-4xl lg:text-5xl lg:pb-2 font-bold tracking-tight text-indigo-700"
                delay={70}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />

              <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl">
                FinTrack brings all of your incomes, expenses, and insights into
                one clean dashboard so you can spend confidently, save
                consistently, and hit your money goals faster.
              </p>

              {/* social proof */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/90 text-xs font-semibold text-white border border-white">
                    FT
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/90 text-xs font-semibold text-white border border-white">
                    ✓
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/90 text-xs font-semibold text-white border border-white">
                    ₹
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Loved by people who want calm, not chaos, with their money.
                </p>
              </div>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-indigo-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:from-purple-500 hover:to-indigo-600 transition-all duration-300"
                >
                  Start tracking for free
                </Link>
              </div>
            </div>

            {/* preview mock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl border border-white/60 bg-white/80 p-4 shadow-2xl backdrop-blur-sm overflow-hidden">
                {/* header bar */}
                <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                    Dashboard
                  </span>
                </div>

                {/* balance */}
                <div className="mb-3 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-3 text-white shadow-lg">
                  <p className="text-[9px] text-indigo-100 uppercase tracking-wide">
                    Total balance
                  </p>
                  <p className="mt-1 text-xl font-bold tracking-tight">
                    ₹82,450
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="text-emerald-200">↑</span>
                      Income: ₹1,25,000
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-rose-200">↓</span>
                      Expense: ₹42,550
                    </span>
                  </div>
                </div>

                {/* stats row */}
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-purple-100 bg-purple-50/50 p-2">
                    <p className="text-[9px] text-purple-700 font-medium">
                      Savings this month
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-purple-900">
                      ₹15,200
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-2">
                    <p className="text-[9px] text-emerald-700 font-medium">
                      Budget remaining
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-emerald-900">
                      ₹8,450
                    </p>
                  </div>
                </div>

                {/* activity */}
                <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] font-medium text-gray-700">
                      Recent activity
                    </p>
                    <span className="text-[10px] text-indigo-600 font-medium">
                      Last 30 days
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Salary credited</span>
                      <span className="font-semibold text-emerald-600">
                        + ₹25,000
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        Groceries & essentials
                      </span>
                      <span className="font-semibold text-rose-600">
                        - ₹3,450
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Investments SIP</span>
                      <span className="font-semibold text-emerald-600">
                        - ₹4,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section with GSAP Counter */}
        <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-12 lg:py-16" ref={statsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold">Trusted by thousands</h2>
              <p className="mt-3 text-indigo-100 text-sm sm:text-base">Join the growing community managing their finances smarter</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold counter" data-target="15000">0</div>
                <p className="mt-2 text-indigo-100 text-sm">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold counter" data-target="50000">0</div>
                <p className="mt-2 text-indigo-100 text-sm">Transactions Tracked</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold">₹<span className="counter" data-target="2">0</span>Cr+</div>
                <p className="mt-2 text-indigo-100 text-sm">Money Managed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold counter" data-target="98">0</div>
                <p className="mt-2 text-indigo-100 text-sm">% Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature row */}
        <section
          id="features"
          className="border-t border-white/70 bg-linear-to-br from-purple-50 to-indigo-50 backdrop-blur-sm"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
          >
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Features</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything you need to manage money</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0px 20px 40px rgba(99,102,241,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-2xl border border-purple-100 bg-white/80 px-5 py-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-4">
                  📱
                </div>
                <p className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                  Clear overview
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  One dashboard for everything
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Instantly see where your money goes, how much you&apos;re
                  saving, and what needs your attention in a single view.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0px 20px 40px rgba(99,102,241,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-2xl border border-purple-100 bg-white/80 px-5 py-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl mb-4">
                  🔔
                </div>
                <p className="text-xs font-semibold text-purple-700 tracking-wide uppercase">
                  Smart alerts
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  Gentle nudges before overspend
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Budget alerts and reminders keep you on track—without feeling
                  overwhelming or noisy.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0px 20px 40px rgba(99,102,241,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-2xl border border-emerald-100 bg-white/80 px-5 py-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl mb-4">
                  🎯
                </div>
                <p className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
                  Goal-focused
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  Build long-term money habits
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Simple flows for adding incomes, logging expenses, and reviewing insights every week.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Security / reassurance */}
        <section
          id="security"
          className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-900 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14 grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 uppercase">
                Privacy & peace of mind
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                Your financial story stays yours.
              </h2>
              <p className="mt-3 text-sm text-indigo-100/90 max-w-xl">
                FinTrack is built to feel trustworthy every time you log
                in—clean design, predictable flows, and clear controls so you
                always know what&apos;s happening with your data.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-indigo-100">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Secure, token-based authentication for every session
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  No surprise actions: everything you do is clearly visible
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  You decide when to log out and clear your data
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl border border-indigo-500/40 bg-white/5 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.75)]"
            >
              <p className="text-sm font-semibold text-indigo-200 mb-3">
                Ready when you are
              </p>
              <p className="text-sm text-indigo-100 mb-6">
                Start by logging your recent incomes and expenses. Within
                minutes, your dashboard will surface a clear picture of where
                you stand.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-md hover:bg-indigo-50 transition-colors"
                >
                  Create my FinTrack account
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-indigo-400/70 px-6 py-3 text-sm font-semibold text-indigo-100 hover:bg-indigo-800/60 transition-colors"
                >
                  Sign in instead
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-white/80 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="#" className="hover:text-indigo-600 transition-colors">Twitter</Link>
              <Link to="https://www.linkedin.com/in/rishavbarman-dev/" target="_blank" className="hover:text-indigo-600 transition-colors">LinkedIn</Link>
              <Link to="https://github.com/rishavbarman-dev" target="_blank" className="hover:text-indigo-600 transition-colors">Github</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingEnhanced;