import { Link } from "react-router-dom";
import { Heart, Calendar, FileText, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

export default function UserOverview() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const savedItems = lang === "en"
    ? [
        { id: 1, title: "Sunny Hillside Villa", price: "Rs. 4.5 Crore", location: "Kathmandu, Hattiban", status: "Active Listing" },
        { id: 2, title: "Lakeview Cottage", price: "Rs. 3.1 Crore", location: "Chitwan, Sauraha", status: "In Process" },
      ]
    : [
        { id: 1, title: "सन्नी हिलसाइड भिल्ला", price: "रु. ४.५ करोड", location: "काठमाडौँ, हात्तीवन", status: "सक्रिय सूची" },
        { id: 2, title: "लेकभ्यू कटेज", price: "रु. ३.१ करोड", location: "चितवन, सौराहा", status: "प्रक्रियामा" },
      ];

  const upcomingTours = lang === "en"
    ? [
        { id: 1, property: "Sunny Hillside Villa", date: "Aug 20, 2026", time: "10:30 AM", agent: "Sarita Sharma" },
        { id: 2, property: "Modern Heights Penthouse", date: "Aug 24, 2026", time: "2:00 PM", agent: "Devin Shrestha" },
      ]
    : [
        { id: 1, property: "सन्नी हिलसाइड भिल्ला", date: "साउन २०, २०८३", time: "बिहान १०:३० बजे", agent: "सरिता शर्मा" },
        { id: 2, property: "मोडर्न हाइट्स पेन्टहाउस", date: "साउन २४, २०८३", time: "दिउँसो ०२:०० बजे", agent: "देविन श्रेष्ठ" },
      ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{t.saved}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{savedItems.length}</h3>
            <p className="text-xs text-rose-500 font-bold mt-1">❤️ {t.wishlistSaved}</p>
          </div>
          <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl">
            <Heart className="w-7 h-7" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{t.viewings}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{upcomingTours.length}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-1">🗓️ {t.scheduledTours}</p>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Calendar className="w-7 h-7" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{t.activeOffers}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{lang === "en" ? "1" : "१"}</h3>
            <p className="text-xs text-amber-600 font-bold mt-1">📄 {t.offerPending}</p>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <FileText className="w-7 h-7" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" /> {t.myWishlist}
            </h2>
            <Link to="/dashboard/saved" className="text-xs font-bold text-coral hover:underline flex items-center gap-1">
              {t.viewAll} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-200 transition"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-coral text-sm">{item.price}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" /> {t.scheduledTours}
            </h2>
            <Link to="/dashboard/viewings" className="text-xs font-bold text-coral hover:underline flex items-center gap-1">
              {t.manage} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingTours.map((tour) => (
              <div
                key={tour.id}
                className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{tour.property}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{t.tourAgent}: {tour.agent}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {tour.date}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {tour.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
