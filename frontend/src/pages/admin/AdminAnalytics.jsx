import { BarChart3, TrendingUp, DollarSign, Eye, Building2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

export default function AdminAnalytics() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const monthlyData = lang === "en"
    ? [
        { month: "Baisakh", revenue: "Rs. 12.4 Lakhs", views: "14,200", sales: "8" },
        { month: "Jestha", revenue: "Rs. 14.8 Lakhs", views: "16,800", sales: "11" },
        { month: "Asar", revenue: "Rs. 15.2 Lakhs", views: "19,400", sales: "12" },
        { month: "Shrawan", revenue: "Rs. 17.5 Lakhs", views: "22,100", sales: "15" },
        { month: "Bhadra", revenue: "Rs. 18.2 Lakhs", views: "25,600", sales: "18" },
      ]
    : [
        { month: "बैशाख", revenue: "रु. १२.४ लाख", views: "१४,२००", sales: "८" },
        { month: "जेठ", revenue: "रु. १४.८ लाख", views: "१६,८००", sales: "११" },
        { month: "असार", revenue: "रु. १५.२ लाख", views: "१९,४००", sales: "१२" },
        { month: "साउन", revenue: "रु. १७.५ लाख", views: "२२,१००", sales: "१५" },
        { month: "भदौ", revenue: "रु. १८.२ लाख", views: "२५,६००", sales: "१८" },
      ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" /> {t.analyticsTitle}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{t.analyticsSub}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-extrabold uppercase text-slate-400">{t.totalCommissions}</span>
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{t.totalCommissionValue}</h3>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {t.growthFromLastMonth}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-extrabold uppercase text-slate-400">{t.totalViews}</span>
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{t.totalViewsValue}</h3>
          <p className="text-xs text-blue-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {t.customerGrowth}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-extrabold uppercase text-slate-400">{t.closedSales}</span>
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{t.closedSalesValue}</h3>
          <p className="text-xs text-amber-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {t.highSuccessRate}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 pb-3 border-b border-slate-100">{t.monthlyGrowth}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase font-extrabold border-b border-slate-100">
                <th className="p-3">{t.colMonth}</th>
                <th className="p-3">{t.colRevenue}</th>
                <th className="p-3">{t.colPageViews}</th>
                <th className="p-3">{t.colDeals}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
              {monthlyData.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{row.month} {t.yearSuffix}</td>
                  <td className="p-3 text-emerald-600 font-black">{row.revenue}</td>
                  <td className="p-3">{row.views}</td>
                  <td className="p-3 font-bold text-slate-900">{row.sales} {t.dealsSuffix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
