import { useState, useEffect } from "react";
import { Users, Shield, User, Search, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const getInitialUsers = (lang) =>
  lang === "en"
    ? [
        { id: 1, name: "Main Admin", email: "admin@nestly.com", role: "admin", status: "active", joined: "Jan 10, 2026" },
        { id: 2, name: "Aarav Sharma", email: "aarav@gmail.com", role: "user", status: "active", joined: "Feb 15, 2026" },
        { id: 3, name: "Devin Shrestha", email: "devin@nestly.com", role: "admin", status: "active", joined: "Mar 2, 2026" },
        { id: 4, name: "Pooja Gurung", email: "pooja@yahoo.com", role: "user", status: "suspended", joined: "Apr 24, 2026" },
      ]
    : [
        { id: 1, name: "मुख्य प्रशासक", email: "admin@nestly.com", role: "admin", status: "active", joined: "पुष २६, २०८२" },
        { id: 2, name: "आरभ शर्मा", email: "aarav@gmail.com", role: "user", status: "active", joined: "फागुन ०२, २०८२" },
        { id: 3, name: "देविन श्रेष्ठ", email: "devin@nestly.com", role: "admin", status: "active", joined: "फागुन १७, २०८२" },
        { id: 4, name: "पूजा गुरुङ", email: "pooja@yahoo.com", role: "user", status: "suspended", joined: "बैशाख १०, २०८३" },
      ];

export default function ManageUsers() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [users, setUsers] = useState(() => getInitialUsers(lang));
  const [query, setQuery] = useState("");

  useEffect(() => {
    setUsers(getInitialUsers(lang));
  }, [lang]);

  const statusLabel = (status) => (status === "active" ? t.statusActive : t.statusSuspended);

  const toggleRole = (id) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return { ...u, role: u.role === "admin" ? "user" : "admin" };
        }
        return u;
      })
    );
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return { ...u, status: u.status === "active" ? "suspended" : "active" };
        }
        return u;
      })
    );
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" /> {t.usersTitle}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{t.usersSub}</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={t.searchUsersPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">{t.colUser}</th>
                <th className="p-4">{t.colEmail}</th>
                <th className="p-4">{t.colJoined}</th>
                <th className="p-4">{t.colRole}</th>
                <th className="p-4">{t.colStatus}</th>
                <th className="p-4 pr-6 text-right">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 pl-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-900">{u.name}</span>
                  </td>
                  <td className="p-4 text-slate-500">{u.email}</td>
                  <td className="p-4 text-slate-400 text-xs font-semibold">{u.joined}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                        u.role === "admin" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                      }`}
                      title={u.role === "admin" ? t.adminRole : t.userRole}
                    >
                      {u.role === "admin" ? <Shield className="w-3 h-3 text-emerald-600" /> : <User className="w-3 h-3" />}
                      {u.role === "admin" ? t.adminRole : t.userRole}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        u.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {statusLabel(u.status)}
                    </button>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                      title={t.deleteUserTitle}
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
    </div>
  );
}
