import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { translations } from "../utils/translations";
import { 
  Home, 
  ShieldCheck, 
  KeyRound, 
  Heart, 
  Calendar, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  LayoutDashboard,
  Building,
  Globe,
  BarChart3,
  Users,
  Settings,
  Sun,
  Moon
} from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path, activeStyle = "text-coral font-bold") =>
    `flex items-center gap-1.5 px-3 py-2 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
      isActive(path)
        ? activeStyle
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-3.5 bg-white/95 text-slate-800 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-colors duration-300 dark:bg-slate-900/95 dark:text-slate-100 dark:border-slate-800">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 group">
        <span className="p-2 bg-coral text-white rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-200">
          🏡
        </span>
        <span className="tracking-tight">
          {t.brand}<span className="text-coral">.</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
        <Link 
          to="/" 
          className={navLinkClass("/", "text-coral font-bold")}
        >
          <Home className="w-4 h-4" />
          {t.explore}
        </Link>

        {user && user.role === "admin" && (
          <>
            <Link to="/admin" className={navLinkClass("/admin", "bg-amber-500 text-slate-900 shadow-sm")}>
              <ShieldCheck className="w-4 h-4" />
              {t.tabOverview}
            </Link>
            <Link to="/admin/listings" className={navLinkClass("/admin/listings", "bg-amber-500 text-slate-900 shadow-sm")}>
              <Building className="w-4 h-4" />
              {t.tabListings}
            </Link>
            <Link to="/admin/users" className={navLinkClass("/admin/users", "bg-amber-500 text-slate-900 shadow-sm")}>
              <Users className="w-4 h-4" />
              {t.tabUsers}
            </Link>
            <Link to="/admin/analytics" className={navLinkClass("/admin/analytics", "bg-amber-500 text-slate-900 shadow-sm")}>
              <BarChart3 className="w-4 h-4" />
              {t.tabAnalytics}
            </Link>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <Link to="/dashboard" className={navLinkClass("/dashboard", "bg-slate-900 text-white shadow-sm")}>
              <LayoutDashboard className={`w-4 h-4 ${isActive("/dashboard") ? "text-amber-400" : ""}`} />
              {t.dashboard}
            </Link>
            <Link to="/dashboard/saved" className={navLinkClass("/dashboard/saved", "bg-slate-900 text-white shadow-sm")}>
              <Heart className={`w-4 h-4 ${isActive("/dashboard/saved") ? "text-rose-400" : "text-rose-500"}`} />
              {t.saved}
            </Link>
            <Link to="/dashboard/viewings" className={navLinkClass("/dashboard/viewings", "bg-slate-900 text-white shadow-sm")}>
              <Calendar className={`w-4 h-4 ${isActive("/dashboard/viewings") ? "text-emerald-400" : "text-emerald-500"}`} />
              {t.viewings}
            </Link>
          </>
        )}
      </div>

      {/* Right Side Buttons / User Menu */}
      <div className="hidden md:flex items-center gap-3">
        {!user ? (
          <>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-2xl p-1">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${lang === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ne")}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${lang === "ne" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  ने
                </button>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-2xl p-1">
                <button
                  onClick={() => toggleTheme('light')}
                  aria-label="Light theme"
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${theme === "light" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  aria-label="Dark theme"
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${theme === "dark" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Link
              to="/signin"
              className="text-slate-700 font-bold hover:text-coral px-4 py-2 text-sm transition"
            >
              {t.signIn}
            </Link>
            <Link
              to="/signup"
              className="bg-coral hover:bg-rose-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md shadow-coral/20 hover:shadow-coral/40 transition-all"
            >
              {t.signUp}
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-slate-800 font-bold text-sm transition-all"
            >
              <div className="w-7 h-7 bg-amber-100 text-amber-700 font-extrabold rounded-xl flex items-center justify-center text-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span>{user.name}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-sm">
                <div className="px-3 py-2.5 bg-slate-50 rounded-xl mb-1 border border-slate-100">
                  <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  <span className={`mt-1.5 inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${user.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
                    {user.role === 'admin' ? t.adminRole : t.userRole}
                  </span>
                </div>

                <div className="py-1">
                  <p className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Settings className="w-3 h-3" /> {t.settings}
                  </p>
                  <Link
                    to={user.role === "admin" ? "/admin/settings" : "/dashboard/password"}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-800 rounded-xl font-medium transition ml-2"
                  >
                    <KeyRound className="w-4 h-4 text-amber-500" />
                    {t.changePass}
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-100 mt-1 px-2 pb-1">
                  <p className="px-1 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3 h-3" /> {t.language}
                  </p>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setLang("en")}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${lang === "en" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                    >
                      {t.english}
                    </button>
                    <button
                      onClick={() => setLang("ne")}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${lang === "ne" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                    >
                      {t.nepali}
                    </button>
                  </div>
                </div>

                  <div className="pt-1 border-t border-slate-100 mt-1 px-2 pb-1">
                    <p className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sun className="w-3 h-3" /> {t.theme || 'Theme'}
                    </p>
                    <div className="flex gap-1 mt-1">
                      <button
                        onClick={() => toggleTheme('light')}
                        className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${theme === "light" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => toggleTheme('dark')}
                        className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>

                <div className="pt-1 border-t border-slate-100 mt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut();
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-coral hover:bg-rose-50 rounded-xl font-bold transition"
                  >
                    <LogOut className="w-4 h-4" />
                    {t.signOut}
                  </button>
              </div>
            </div>
          )}
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-700 rounded-xl hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-2xl md:hidden z-50">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 font-bold text-slate-800 py-1"
          >
            <Home className="w-5 h-5 text-coral" /> {t.explore}
          </Link>

          {user && user.role === "admin" && (
            <>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/admin") ? "bg-amber-500 text-slate-900" : "text-slate-800"}`}
              >
                <ShieldCheck className="w-5 h-5" /> {t.tabOverview}
              </Link>
              <Link
                to="/admin/listings"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/admin/listings") ? "bg-amber-500 text-slate-900" : "text-slate-800"}`}
              >
                <Building className="w-5 h-5" /> {t.tabListings}
              </Link>
              <Link
                to="/admin/users"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/admin/users") ? "bg-amber-500 text-slate-900" : "text-slate-800"}`}
              >
                <Users className="w-5 h-5" /> {t.tabUsers}
              </Link>
              <Link
                to="/admin/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/admin/analytics") ? "bg-amber-500 text-slate-900" : "text-slate-800"}`}
              >
                <BarChart3 className="w-5 h-5" /> {t.tabAnalytics}
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/dashboard") ? "bg-slate-900 text-white" : "text-slate-800"}`}
              >
                <LayoutDashboard className="w-5 h-5" /> {t.dashboard}
              </Link>
              <Link
                to="/dashboard/saved"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/dashboard/saved") ? "bg-slate-900 text-white" : "text-slate-800"}`}
              >
                <Heart className="w-5 h-5 text-rose-500" /> {t.saved}
              </Link>
              <Link
                to="/dashboard/viewings"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 font-bold py-2 px-3 rounded-2xl ${isActive("/dashboard/viewings") ? "bg-slate-900 text-white" : "text-slate-800"}`}
              >
                <Calendar className="w-5 h-5 text-emerald-500" /> {t.viewings}
              </Link>
            </>
          )}

          {user && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
                <Settings className="w-3 h-3" /> {t.settings}
              </p>
              <Link
                to={user.role === "admin" ? "/admin/settings" : "/dashboard/password"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 font-bold text-slate-800 py-2 px-3 ml-2"
              >
                <KeyRound className="w-5 h-5 text-amber-500" /> {t.changePass}
              </Link>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1 mt-2 flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> {t.language}
              </p>
              <div className="flex gap-2 px-3 pb-2">
                <button
                  onClick={() => setLang("en")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${lang === "en" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {t.english}
                </button>
                <button
                  onClick={() => setLang("ne")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${lang === "ne" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {t.nepali}
                </button>
              </div>

              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1 mt-2 flex items-center gap-1.5">
                <Sun className="w-3 h-3" /> Theme
              </p>
              <div className="flex gap-2 px-3 pb-2">
                <button
                  onClick={() => toggleTheme('light')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${theme === "light" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  Light
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  Dark
                </button>
              </div>
            </div>
          )}

          {!user ? (
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> {t.language}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setLang("en")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${lang === "en" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {t.english}
                </button>
                <button
                  onClick={() => setLang("ne")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${lang === "ne" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {t.nepali}
                </button>
              </div>

              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mt-3">
                <Sun className="w-3 h-3" /> Theme
              </p>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => toggleTheme('light')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${theme === "light" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  Light
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  Dark
                </button>
              </div>
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 font-bold border border-slate-200 rounded-2xl"
              >
                {t.signIn}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 font-bold bg-coral text-white rounded-2xl shadow-md"
              >
                {t.signUp}
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut();
                navigate("/");
              }}
              className="w-full py-3 font-bold bg-rose-50 text-coral rounded-2xl flex items-center justify-center gap-2 mt-2"
            >
              <LogOut className="w-5 h-5" /> {t.signOut} ({user.name})
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
