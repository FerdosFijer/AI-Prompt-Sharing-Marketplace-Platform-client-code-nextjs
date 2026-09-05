"use client";

import React from "react";
import { Card, Button, Input, Chip } from "@heroui/react";
import { Check, ShieldCheck, CreditCard, Sparkles } from "@gravity-ui/icons";

export default function PricingPage() {
  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Proceeding to payment...");
  };

  const handleSimulatePayment = () => {
    console.log("Simulating $5 test checkout...");
  };

  const benefits = [
    "Unlock all locked Private/Premium prompts",
    "Unlimited copy-to-clipboard actions",
    "Engage with rating and feedback reviews",
    "Priority access to future AI engine configurations",
    "One-time payment, lifetime ownership",
  ];

  return (
    <div className="min-h-screen bg-[#060813] text-white flex flex-col items-center justify-center p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0e1428] border border-[#1e293b] text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
          <Sparkles width={24} height={24} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Upgrade Your Account
        </h1>
        <p className="text-slate-400 text-sm">
          Unlock premium prompt engineering templates and advanced assets
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Left Column: Plan Details */}
        <Card className="bg-[#0b1021]/80 border border-[#1e293b] rounded-2xl p-4 backdrop-blur-md">
          <Card.Content className="gap-6 justify-between flex flex-col h-full p-2">
            <div>
              <Chip
                size="sm"
                variant="flat"
                className="bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 uppercase text-[10px] font-bold tracking-wider mb-4 px-2"
              >
                Lifetime Plan
              </Chip>

              <h2 className="text-2xl font-bold mb-4 text-white">
                Aiverse Pro Access
              </h2>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold text-white tracking-tight">
                  $5.00
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  / one-time
                </span>
              </div>

              {/* Benefits List */}
              <ul className="space-y-3.5">
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                      <Check width={12} height={12} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Notice */}
            <div className="pt-4 border-t border-[#1e293b]/60 flex items-center gap-2 text-xs text-slate-500 mt-auto">
              <ShieldCheck width={16} height={16} className="text-slate-400 flex-shrink-0" />
              <span>Payments secured and encrypted via Stripe Gateway.</span>
            </div>
          </Card.Content>
        </Card>

        {/* Right Column: Checkout Form */}
        <Card className="bg-[#0b1021]/80 border border-[#1e293b] rounded-2xl p-4 backdrop-blur-md">
          <Card.Content className="gap-6 justify-between flex flex-col h-full p-2">

            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button type="submit" role="link">
                  Checkout
                </button>
              </section>
            </form>
            
            <form onSubmit={handlePayment} className="flex flex-col gap-5">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <CreditCard width={18} height={18} className="text-slate-300" />
                <span>Card Information</span>
              </div>

              {/* Card Number Input */}
              <div className="relative flex items-center w-full">
                <Input
                  type="text"
                  placeholder="Card number"
                  variant="bordered"
                  className="bg-[#070a14] border-[#1e293b] text-white text-sm placeholder:text-slate-600 focus:border-purple-500 h-12 w-full rounded-xl pr-20"
                />
                <Button
                  size="sm"
                  className="absolute right-2 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs font-semibold h-7 px-2.5 min-w-0"
                >
                  Autofill
                </Button>
              </div>

              {/* Pay Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-purple-900/30 text-sm"
              >
                Pay One-time $5.00
              </Button>
            </form>

            {/* Testing Assist Container */}
            <div className="border border-dashed border-purple-900/60 rounded-xl p-4 bg-[#0d1226]/50 text-center mt-auto">
              <div className="text-[11px] font-bold tracking-wider text-purple-400 uppercase mb-2">
                Stripe Testing Assist
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                No credit card configured? Or running locally without keys? Use
                our Sandbox simulation to instantly test upgraded views and
                dashboards.
              </p>
              <Button
                onClick={handleSimulatePayment}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs h-10 rounded-xl transition-colors"
              >
                Simulate $5 Test Checkout
              </Button>
            </div>
          </Card.Content>
        </Card>

      </div>
    </div>
  );
}