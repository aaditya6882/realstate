import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, XCircle, User } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const getInitialViewings = (lang, t) =>
  lang === "en"
    ? [
        { id: 1, property: "Sunny Hillside Villa", location: "Kathmandu, Hattiban", date: "Aug 20, 2026", time: "10:30 AM", agent: "Sarita Sharma", status: "confirmed" },
        { id: 2, property: "Modern Heights Penthouse", location: "Pokhara, Lakeside", date: "Aug 24, 2026", time: "2:00 PM", agent: "Devin Shrestha", status: "pending" },
        { id: 3, property: "Green Valley Residence", location: "Lalitpur, Jhamsikhel", date: "Aug 10, 2026", time: "11:00 AM", agent: "Anita Gurung", status: "completed" },
      ]
    : [
        { id: 1, property: "सन्नी हिलसाइड भिल्ला", location: "काठमाडौँ, हात्तीवन", date: "साउन २०, २०८३", time: "बिहान १०:३० बजे", agent: "सरिता शर्मा", status: "confirmed" },
        { id: 2, property: "मोडर्न हाइट्स पेन्टहाउस", location: "पोखरा, लेकसाइड", date: "साउन २४, २०८३", time: "दिउँसो ०२:०० बजे", agent: "देविन श्रेष्ठ", status: "pending" },
        { id: 3, property: "ग्रीन भ्याली रेसिडेन्स", location: "ललितपुर, झम्सीखेल", date: "साउन १०, २०८३", time: "बिहान ११:०० बजे", agent: "अनिता गुरुङ", status: "completed" },
      ];

export default function BookedViewings() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [viewings, setViewings] = useState(() => getInitialViewings(lang, t));

  useEffect(() => {
    setViewings(getInitialViewings(lang, t));
  }, [lang, t]);

  const statusLabel = (status) => {
    if (status === "confirmed") return t.confirmed;
    if (status === "pending") return t.statusPending;
    return t.completed;
  };

  const cancelViewing = (id) => {
    setViewings(viewings.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" /> {t.bookedTours}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{t.bookedSub}</p>
        </div>
      </div>

      <div className="space-y-4">
        {viewings.map((v) => (
          <div
            key={v.id}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-200 transition"
          >
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    v.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-800"
                      : v.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {statusLabel(v.status)}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">{v.property}</h3>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-coral" /> {v.location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400">{t.tourDate}</p>
                  <p className="text-sm font-bold text-slate-800">{v.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400">{t.tourTime}</p>
                  <p className="text-sm font-bold text-slate-800">{v.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400">{t.tourAgent}</p>
                  <p className="text-sm font-bold text-slate-800">{v.agent}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-0">
              {v.status !== "completed" && (
                <button
                  onClick={() => cancelViewing(v.id)}
                  className="px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" /> {t.cancelTour}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
