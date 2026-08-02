import { useState, useEffect } from "react";
import { Heart, MapPin, Trash2, ExternalLink, Filter } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const getInitialSaved = (lang) =>
  lang === "en"
    ? [
        { id: 1, title: "Sunny Hillside Villa", price: "Rs. 4.5 Crore", city: "Kathmandu", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", beds: 4, baths: 3, savedOn: "Aug 15, 2026" },
        { id: 2, title: "Lakeview Cottage", price: "Rs. 3.1 Crore", city: "Chitwan", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", beds: 3, baths: 2, savedOn: "Aug 12, 2026" },
        { id: 3, title: "Cozy Downtown Loft", price: "Rs. 2.2 Crore", city: "Pokhara", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", beds: 2, baths: 2, savedOn: "Aug 5, 2026" },
      ]
    : [
        { id: 1, title: "सन्नी हिलसाइड भिल्ला", price: "रु. ४.५ करोड", city: "काठमाडौँ", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", beds: 4, baths: 3, savedOn: "साउन १५, २०८३" },
        { id: 2, title: "लेकभ्यू कटेज", price: "रु. ३.१ करोड", city: "चितवन", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", beds: 3, baths: 2, savedOn: "साउन १२, २०८३" },
        { id: 3, title: "सिटी डाउनटाउन लफ्ट", price: "रु. २.२ करोड", city: "पोखरा", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", beds: 2, baths: 2, savedOn: "साउन ०५, २०८३" },
      ];

const getCities = (lang) =>
  lang === "en"
    ? ["All", "Kathmandu", "Pokhara", "Chitwan"]
    : ["सबै", "काठमाडौँ", "पोखरा", "चितवन"];

export default function SavedProperties() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [items, setItems] = useState(() => getInitialSaved(lang));
  const [filterCity, setFilterCity] = useState(() => getCities(lang)[0]);

  useEffect(() => {
    setItems(getInitialSaved(lang));
    setFilterCity(getCities(lang)[0]);
  }, [lang]);

  const allLabel = getCities(lang)[0];

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filtered = filterCity === allLabel ? items : items.filter(i => i.city === filterCity);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> {t.myWishlist}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{t.savedCountSub}</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          <span className="text-xs font-bold text-slate-500">{t.cityFilter}</span>
          {getCities(lang).map((city) => (
            <button
              key={city}
              onClick={() => setFilterCity(city)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filterCity === city ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {city === allLabel ? t.filterAll : city}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-slate-100">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">{t.noPropertiesFound}</h3>
          <p className="text-slate-400 text-sm mt-1">{t.noPropertiesFoundSub}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-rose-50 p-2 rounded-full text-rose-500 shadow transition"
                    title={t.removeFromList}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-coral" /> {item.city}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-3">{t.savedOn}: {item.savedOn}</p>
                  <p className="text-coral font-black text-xl mb-4">{item.price}</p>
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-3">
                    <span>{item.beds} {t.bedrooms}</span> • <span>{item.baths} {t.bathrooms}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex gap-2">
                <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition">
                  {t.contactAgent} <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
