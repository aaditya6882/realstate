import { Link } from "react-router-dom";
import { Building, Users, Clock, DollarSign, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

export default function AdminOverview() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const stats = [
    { label: t.adminTotalListings, value: lang === "en" ? "128" : "१२८", color: "text-coral", icon: Building, bg: "bg-rose-50" },
    { label: t.adminActiveUsers, value: lang === "en" ? "342" : "३४२", color: "text-emerald-600", icon: Users, bg: "bg-emerald-50" },
    { label: t.adminPendingApprovals, value: lang === "en" ? "7" : "७", color: "text-amber-600", icon: Clock, bg: "bg-amber-50" },
    { label: t.adminMonthlyRevenue, value: lang === "en" ? "Rs. 18.2 Lakhs" : "रु. १८.२ लाख", color: "text-slate-900", icon: DollarSign, bg: "bg-slate-100" },
  ];

  const recentLogs = lang === "en"
    ? [
        { id: 1, action: "New property submitted", details: "Mountain View Villa (Agent: Sarita Sharma)", time: "10 minutes ago", status: t.statusPending },
        { id: 2, action: "User role changed", details: "devin@nestly.com promoted to admin", time: "1 hour ago", status: t.statusSuccess },
        { id: 3, action: "Property approved", details: "Lakeview Cottage published publicly", time: "3 hours ago", status: t.statusSuccess },
      ]
    : [
        { id: 1, action: "नयाँ सम्पत्ति पेश गरियो", details: "माउन्टेन भ्यू भिल्ला (एजेन्ट: सरिता शर्मा)", time: "१० मिनेट अघि", status: t.statusPending },
        { id: 2, action: "प्रयोगकर्ता भूमिका परिवर्तन", details: "devin@nestly.com लाई एडमिन बनाइयो", time: "१ घण्टा अघि", status: t.statusSuccess },
        { id: 3, action: "सम्पत्ति स्वीकृत भयो", details: "लेकभ्यू कटेज सार्वजनिक प्रकाशित गरियो", time: "३ घण्टा अघि", status: t.statusSuccess },
      ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{s.label}</p>
                <h3 className={`text-2xl font-black ${s.color} mt-1`}>{s.value}</h3>
              </div>
              <div className={`p-4 ${s.bg} rounded-2xl`}>
                <Icon className={`w-6 h-6 ${s.color}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="font-extrabold text-lg text-slate-900">{t.adminRecentActivity}</h2>
            <Link to="/admin/listings" className="text-xs font-bold text-coral hover:underline flex items-center gap-1">
              {t.viewAllListings} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{log.action}</p>
                  <p className="text-xs text-slate-500">{log.details}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                    log.status === t.statusPending ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {log.status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h2 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">{t.adminQuickActions}</h2>

          <div className="space-y-3">
            <Link
              to="/admin/listings"
              className="w-full flex items-center justify-between p-4 bg-amber-50/70 hover:bg-amber-100/80 rounded-2xl border border-amber-200/60 transition text-amber-900 font-bold text-sm"
            >
              <span>{t.adminActionListings}</span>
              <ArrowUpRight className="w-4 h-4 text-amber-700" />
            </Link>

            <Link
              to="/admin/users"
              className="w-full flex items-center justify-between p-4 bg-blue-50/70 hover:bg-blue-100/80 rounded-2xl border border-blue-200/60 transition text-blue-900 font-bold text-sm"
            >
              <span>{t.adminActionUsers}</span>
              <ArrowUpRight className="w-4 h-4 text-blue-700" />
            </Link>

            <Link
              to="/admin/analytics"
              className="w-full flex items-center justify-between p-4 bg-emerald-50/70 hover:bg-emerald-100/80 rounded-2xl border border-emerald-200/60 transition text-emerald-900 font-bold text-sm"
            >
              <span>{t.adminActionAnalytics}</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-700" />
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.adminServerStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
