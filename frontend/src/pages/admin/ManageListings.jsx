import { useState, useMemo, useEffect } from "react";
import { Building, Plus, Search, Filter, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const getInitialListings = (lang) =>
  lang === "en"
    ? [
        { id: 1, title: "Sunny Hillside Villa", city: "Kathmandu", price: "Rs. 4.5 Crore", status: "live", agent: "Sarita Sharma" },
        { id: 2, title: "Cozy Downtown Loft", city: "Pokhara", price: "Rs. 2.2 Crore", status: "pending", agent: "Devin Shrestha" },
        { id: 3, title: "Lakeview Cottage", city: "Chitwan", price: "Rs. 3.1 Crore", status: "live", agent: "Anita Gurung" },
        { id: 4, title: "Modern Heights Penthouse", city: "Kathmandu", price: "Rs. 6.8 Crore", status: "archived", agent: "Ramesh Khadka" },
      ]
    : [
        { id: 1, title: "सन्नी हिलसाइड भिल्ला", city: "काठमाडौँ", price: "रु. ४.५ करोड", status: "live", agent: "सरिता शर्मा" },
        { id: 2, title: "सिटी डाउनटाउन लफ्ट", city: "पोखरा", price: "रु. २.२ करोड", status: "pending", agent: "देविन श्रेष्ठ" },
        { id: 3, title: "लेकभ्यू कटेज", city: "चितवन", price: "रु. ३.१ करोड", status: "live", agent: "अनिता गुरुङ" },
        { id: 4, title: "मोडर्न हाइट्स पेन्टहाउस", city: "काठमाडौँ", price: "रु. ६.८ करोड", status: "archived", agent: "रमेश खड्का" },
      ];

const getCities = (lang) =>
  lang === "en"
    ? ["Kathmandu", "Pokhara", "Chitwan", "Lalitpur"]
    : ["काठमाडौँ", "पोखरा", "चितवन", "ललितपुर"];

export default function ManageListings() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [listings, setListings] = useState(() => getInitialListings(lang));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCity, setNewCity] = useState(() => getCities(lang)[0]);

  useEffect(() => {
    setListings(getInitialListings(lang));
    setNewCity(getCities(lang)[0]);
    setStatusFilter("all");
  }, [lang]);

  const statusLabel = (status) => {
    if (status === "live") return t.statusLive;
    if (status === "pending") return t.statusPending;
    return t.statusArchived;
  };

  const toggleStatus = (id) => {
    setListings(
      listings.map((l) => {
        if (l.id === id) {
          const next = l.status === "live" ? "pending" : l.status === "pending" ? "archived" : "live";
          return { ...l, status: next };
        }
        return l;
      })
    );
  };

  const deleteListing = (id) => {
    setListings(listings.filter((l) => l.id !== id));
  };

  const handleAddListing = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const prefix = lang === "en" ? "Rs. " : "रु. ";
    const item = {
      id: Date.now(),
      title: newTitle,
      city: newCity,
      price: newPrice.startsWith("Rs") || newPrice.startsWith("रु") ? newPrice : `${prefix}${newPrice}`,
      status: "live",
      agent: t.youAgent,
    };
    setListings([item, ...listings]);
    setNewTitle("");
    setNewPrice("");
    setShowModal(false);
  };

  const filterOptions = useMemo(
    () => [
      { key: "all", label: t.filterAll },
      { key: "live", label: t.statusLive },
      { key: "pending", label: t.statusPending },
      { key: "archived", label: t.statusArchived },
    ],
    [t]
  );

  const filtered = listings.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-amber-500" /> {t.listingsTitle}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{t.listingsSub}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-5 h-5" /> {t.addListingBtn}
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500">{t.statusFilterLabel}</span>
          {filterOptions.map((st) => (
            <button
              key={st.key}
              onClick={() => setStatusFilter(st.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st.key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">{t.colProperty}</th>
                <th className="p-4">{t.colLocation}</th>
                <th className="p-4">{t.colPrice}</th>
                <th className="p-4">{t.colAgent}</th>
                <th className="p-4">{t.colStatus}</th>
                <th className="p-4 pr-6 text-right">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 pl-6 font-bold text-slate-900">{item.title}</td>
                  <td className="p-4">{item.city}</td>
                  <td className="p-4 font-bold text-coral">{item.price}</td>
                  <td className="p-4 text-xs font-bold text-slate-500">{item.agent}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      title={t.toggleStatusTitle}
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase transition ${
                        item.status === "live"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {statusLabel(item.status)} ↺
                    </button>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => deleteListing(item.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                      title={t.deleteListingTitle}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900">{t.addListingModalTitle}</h3>
            <form onSubmit={handleAddListing} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.titleLabel}</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={lang === "en" ? "e.g. Royal Heights Residence" : "उदा. रोयल हाइट्स रेसिडेन्स"}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.priceLabel}</label>
                <input
                  type="text"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder={lang === "en" ? "e.g. 3.5 Crore" : "उदा. ३.५ करोड"}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.cityLabel}</label>
                <select
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {getCities(lang).map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-900 font-extrabold rounded-xl text-sm hover:bg-amber-600 shadow"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
