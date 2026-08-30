"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    practice: "cpi",
    timeline: "1-3months",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate enterprise inquiry dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const faqs = [
    {
      question: "How quickly can CXcel team members onboard into an active engagement?",
      answer:
        "Depending on the practice stream, our architects and leads can be deployed within 5 to 10 business days. For specialized CPI or Commerce Cloud hypercare, emergency triage pods can initiate engagement within 48 hours.",
    },
    {
      question: "Do you support hybrid landscapes spanning on-premise ERP and SAP BTP?",
      answer:
        "Yes. The majority of our enterprise clients operate hybrid architectures. We connect legacy ECC 6.0 and S/4HANA on-premise systems via Cloud Connector to SAP Integration Suite (CPI) and multi-cloud BTP subaccounts on AWS, Azure, and GCP.",
    },
    {
      question: "Can your team provide 24/7 production monitoring and SLA-backed support?",
      answer:
        "Absolutely. Our Managed Services arm provides 24/7 follow-the-sun support for CPI message queues, Commerce Cloud storefront uptime, B2B EDI transactions, and severity-1 incident resolution.",
    },
    {
      question: "Are your developers certified in SAP Clean Core and CAP/RAP architectures?",
      answer:
        "Every engineer in our practice holds valid SAP certifications across S/4HANA, BTP, and CPI. We strictly build following the Clean Core paradigm to ensure seamless bi-annual SAP cloud upgrades without regression.",
    },
  ];

  return (
    <div className="w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24 select-none">
      {/* ── Page Header ────────────────────────────── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium backdrop-blur-sm">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span>Enterprise Practice Consultation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Connect With Our{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Practice Architects
          </span>
        </h1>
        <p className="text-xs sm:text-base text-neutral-300 leading-relaxed">
          Schedule an architecture review, discuss CPI integration pipelines, or explore dedicated
          delivery pods for your enterprise SAP Customer Experience program.
        </p>
      </div>

      {/* ── Main Two-Column Layout ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ── Left Column: Contact Details & Delivery Hubs (5 cols) ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* SLA Commitment Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/60 border border-indigo-500/30 backdrop-blur-md space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Architect Response Guarantee</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Guaranteed Response in &lt; 24 Business Hours
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every inquiry is routed directly to a Principal Architect in our Bangalore or
              Frankfurt hubs, not a generic queue.
            </p>
          </div>

          {/* Direct Communication Channels */}
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Direct Channels
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">
                    Practice Inquiries
                  </div>
                  <a
                    href="mailto:contact@cxcel.io"
                    className="text-indigo-400 hover:underline"
                  >
                    contact@cxcel.io
                  </a>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    Architecture briefs & RFP submissions
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">
                    Enterprise Hotlines
                  </div>
                  <div className="text-neutral-300">
                    +91 98450 11201 (India Hub)
                  </div>
                  <div className="text-neutral-300">
                    +49 69 1234 5678 (Europe Hub)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">
                    Support Coverage
                  </div>
                  <div className="text-neutral-300">
                    Mon – Fri: 08:00 – 20:00 IST / CET
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    24/7 Severity-1 Incident Response for Active Clients
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Hub Locations */}
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Innovation & Delivery Hubs
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">
                    Global Technology Centre (India)
                  </div>
                  <p className="text-neutral-400 mt-0.5 leading-relaxed text-[11px]">
                    Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-200">
                    Frankfurt Delivery Hub (Germany)
                  </div>
                  <p className="text-neutral-400 mt-0.5 leading-relaxed text-[11px]">
                    Mainzer Landstraße, 60329 Frankfurt am Main, Germany
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Consultation Form (7 cols) ── */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Inquiry Successfully Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your consultation
                request for <span className="text-indigo-400">{formData.company || "your organization"}</span> has
                been routed to our practice lead. We will review your scope and respond within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    practice: "cpi",
                    timeline: "1-3months",
                    message: "",
                  });
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Request an Architecture Briefing
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill out your program parameters to be matched with the relevant domain lead.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@enterprise.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Global Logistics"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Target Practice Stream
                  </label>
                  <select
                    value={formData.practice}
                    onChange={(e) =>
                      setFormData({ ...formData, practice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="cpi">SAP CPI & Integration (iFlows / B2B)</option>
                    <option value="commerce">SAP Commerce Cloud & Headless</option>
                    <option value="crm">SAP CRM & S/4HANA Service</option>
                    <option value="btp">SAP BTP & Side-by-Side Extensions</option>
                    <option value="functional">S/4HANA Functional Transformation</option>
                    <option value="marketing">SAP Marketing & Emarsys</option>
                    <option value="full">Comprehensive CX Pod (Full Team)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Target Engagement Timeline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "immediate", label: "Immediate (< 1 mo)" },
                    { id: "1-3months", label: "1 to 3 Months" },
                    { id: "exploratory", label: "Strategic / RFP" },
                  ].map((tl) => (
                    <button
                      type="button"
                      key={tl.id}
                      onClick={() =>
                        setFormData({ ...formData, timeline: tl.id })
                      }
                      className={`px-3 py-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                        formData.timeline === tl.id
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-200"
                          : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-300"
                      }`}
                    >
                      {tl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Project Scope & Technical Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline current systems (ECC / S/4HANA, Commerce, CPI), high-level requirements, and any specific deadlines..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Dispatching to Practice Architect...
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Architecture Inquiry</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-neutral-500 text-center">
                Strict enterprise NDA honored. We never share your data with third parties.
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ── FAQ Section ────────────────────────────── */}
      <div className="space-y-6 max-w-4xl mx-auto pt-8 border-t border-neutral-800">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Enterprise Engagement FAQs
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900/40 border border-neutral-800/80 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
