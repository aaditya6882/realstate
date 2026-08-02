import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { UserPlus, User, Mail, Lock } from "lucide-react";

export default function SignUp() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md space-y-5 transition-colors duration-300 dark:bg-slate-900 dark:border-slate-800"
      >
        <div className="text-center">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-1 dark:text-slate-100">{t.joinNestly}</h2>
          <p className="text-sm text-slate-500 font-medium dark:text-slate-400">{t.createFreeAccount}</p>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2 dark:text-slate-300">{t.fullName}</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2 dark:text-slate-300">{t.emailAddress}</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2 dark:text-slate-300">{t.password}</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-base shadow-md shadow-emerald-500/20 transition"
        >
          {t.signUp}
        </button>

        <p className="text-center text-xs text-slate-500 font-medium dark:text-slate-400">
          {t.alreadyAccount}{" "}
          <Link to="/signin" className="text-coral font-bold hover:underline">
            {t.signIn}
          </Link>
        </p>
      </form>
    </div>
  );
}
