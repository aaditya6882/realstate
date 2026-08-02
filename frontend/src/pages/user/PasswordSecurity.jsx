import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { 
  KeyRound, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle, 
  Smartphone, 
  Laptop, 
  Globe, 
  LogOut,
  Sparkles
} from "lucide-react";

const getSessions = (lang, t) =>
  lang === "en"
    ? [
        { id: 1, device: "Chrome (Windows 11)", location: "Kathmandu, Nepal", ip: "103.1.28.99", current: true, time: t.activeNow },
        { id: 2, device: "Safari (iPhone 15 Pro)", location: "Pokhara, Nepal", ip: "110.34.12.11", current: false, time: `2 ${t.hoursAgo}` },
      ]
    : [
        { id: 1, device: "Chrome (Windows 11)", location: "काठमाडौँ, नेपाल", ip: "103.1.28.99", current: true, time: t.activeNow },
        { id: 2, device: "Safari (iPhone 15 Pro)", location: "पोखरा, नेपाल", ip: "110.34.12.11", current: false, time: `२ ${t.hoursAgo}` },
      ];

export default function PasswordSecurity() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState(() => getSessions(lang, t));

  useEffect(() => {
    setSessions(getSessions(lang, t));
  }, [lang, t]);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(newPassword);

  const strengthLabel = () => {
    if (strength === 1) return t.weak;
    if (strength === 2) return t.fair;
    if (strength === 3) return t.strong;
    if (strength === 4) return t.veryStrong;
    return "";
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!currentPassword) {
      setErrorMsg(t.errCurrentPass);
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg(t.errPassLength);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg(t.errPassMatch);
      return;
    }

    setSuccessMsg(t.passUpdatedSuccess);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const revokeSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-amber-500" /> {t.secTitle}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{t.secSub}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-bold text-amber-800">{t.secRating}</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-3 bg-amber-100/70 text-amber-700 rounded-2xl">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">{t.changePass}</h3>
            <p className="text-xs text-slate-500 font-medium">{t.changePassSub}</p>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">{t.currentPass}</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">{t.newPass}</label>
              <input
                type={showPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">{t.confirmPass}</label>
              <input
                type={showPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none transition"
              />
            </div>
          </div>

          {newPassword && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>{t.passStrength}</span>
                <span className={strength >= 3 ? "text-emerald-600" : "text-amber-600"}>
                  {strengthLabel()}
                </span>
              </div>
              <div className="flex gap-1.5 h-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 rounded-full transition-all ${
                      step <= strength
                        ? strength >= 3
                          ? "bg-emerald-500"
                          : "bg-amber-400"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition"
            >
              {t.updatePassBtn}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100/70 text-emerald-700 rounded-2xl">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">{t.twoFactorTitle}</h3>
              <p className="text-xs text-slate-500 font-medium">{t.twoFactorSub}</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
              twoFactorEnabled ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                twoFactorEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {twoFactorEnabled && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2 mt-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {t.twoFactorEnabled}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">{t.activeSessionsTitle}</h3>
              <p className="text-xs text-slate-500 font-medium">{t.activeSessionsSub}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-slate-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 text-sm">{s.device}</p>
                    {s.current && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                        {t.currentSession}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {s.location} • IP: {s.ip} ({s.time})
                  </p>
                </div>
              </div>

              {!s.current && (
                <button
                  onClick={() => revokeSession(s.id)}
                  className="text-xs font-bold text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> {t.revoke}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
