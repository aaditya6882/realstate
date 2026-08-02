import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { 
  Building2, 
  Home, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Heart,
  Star,
  CheckCircle2
} from "lucide-react";

export default function Landing() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const featuredProperties = [
    { 
      id: 1, 
      title: lang === "en" ? "Sunny Hillside Villa" : "सन्नी हिलसाइड भिल्ला", 
      price: lang === "en" ? "Rs. 4.5 Crore" : "रु. ४.५ करोड", 
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", 
      city: lang === "en" ? "Kathmandu" : "काठमाडौँ",
      beds: 4,
      baths: 3,
      tag: t.tagFeatured
    },
    { 
      id: 2, 
      title: lang === "en" ? "Cozy Downtown Loft" : "सिटी डाउनटाउन लफ्ट", 
      price: lang === "en" ? "Rs. 2.2 Crore" : "रु. २.२ करोड", 
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", 
      city: lang === "en" ? "Pokhara" : "पोखरा",
      beds: 2,
      baths: 2,
      tag: t.tagHotDeal
    },
    { 
      id: 3, 
      title: lang === "en" ? "Lakeview Cottage" : "लेकभ्यू कटेज", 
      price: lang === "en" ? "Rs. 3.1 Crore" : "रु. ३.१ करोड", 
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", 
      city: lang === "en" ? "Chitwan" : "चितवन",
      beds: 3,
      baths: 2,
      tag: t.tagVerified
    },
  ];

  const stats = [
    { icon: Home, label: t.statProperties, value: lang === "en" ? "2,400+" : "२,४००+" },
    { icon: Users, label: t.statHomeowners, value: lang === "en" ? "1,850+" : "१,८५०+" },
    { icon: MapPin, label: t.statCities, value: lang === "en" ? "35+" : "३५+" },
    { icon: ShieldCheck, label: t.statAgents, value: "100%" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: t.feat1Title,
      desc: t.feat1Desc
    },
    {
      icon: ShieldCheck,
      title: t.feat2Title,
      desc: t.feat2Desc
    },
    {
      icon: TrendingUp,
      title: t.feat3Title,
      desc: t.feat3Desc
    }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50/60 via-white to-amber-50/30 min-h-screen text-slate-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300/50 px-4 py-1.5 rounded-full text-amber-800 text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>{t.heroBadge}</span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
          >
            {t.heroTitle1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-amber-500">
              {t.heroTitleHighlight}
            </span>{" "}
            🏠
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-medium"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-coral hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-coral/30 hover:shadow-coral/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              {t.getStarted}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur border-2 border-mint text-emerald-700 hover:bg-mint hover:text-white px-8 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all duration-200"
            >
              {t.signInAccount}
            </Link>
          </motion.div>
        </div>

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
              <MapPin className="w-5 h-5 text-coral" />
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">{t.location}</p>
                <p className="text-sm font-bold text-slate-700">{t.locationValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
              <Home className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">{t.propertyType}</p>
                <p className="text-sm font-bold text-slate-700">{t.propertyTypeValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
              <Building2 className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">{t.budgetRange}</p>
                <p className="text-sm font-bold text-slate-700">{t.budgetRangeValue}</p>
              </div>
            </div>
            <button className="w-full h-full min-h-[52px] bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md transition">
              <Search className="w-5 h-5" />
              {t.searchHomes}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 justify-center"
            >
              <div className="p-3 bg-amber-100/60 rounded-2xl text-amber-700">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">{stat.value}</h3>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <span className="text-coral font-bold text-sm tracking-wider uppercase">{t.handpickedSelection}</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{t.featuredListings}</h2>
          </div>
          <Link to="/signin" className="mt-4 sm:mt-0 text-coral font-bold flex items-center gap-1 hover:gap-2 transition-all">
            {t.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProperties.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img 
                  src={p.img} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {p.tag}
                </span>
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full text-slate-600 hover:text-coral shadow transition">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-slate-800 text-xs font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-coral" />
                  {p.city}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-coral transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-medium">
                  <span>{p.beds} {t.bedrooms}</span> • <span>{p.baths} {t.bathrooms}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Price</p>
                    <p className="text-coral font-extrabold text-xl">{p.price}</p>
                  </div>
                  <Link
                    to="/signin"
                    className="bg-amber-100/70 hover:bg-coral hover:text-white text-slate-800 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  >
                    {t.details}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-amber-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">{t.whyLoveUs}</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-12">{t.nestlyDifference}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 text-left hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 mb-6">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 text-white rounded-3xl p-10 sm:p-16 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-slate-300 font-medium text-base mb-6">
              {t.ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.freeRegistration}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.instantAlerts}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.secureSystem}</span>
            </div>
          </div>

          <div className="relative z-10">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-coral hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-coral/40 transition-all"
            >
              {t.createAccount}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
