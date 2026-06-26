// src/pages/Industry.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://hire-me-jobs.onrender.com";

/* ================================================================
   ICONS
================================================================ */
const Icon = {
  Search: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Plus: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Edit: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  ),
  Close: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Refresh: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  CheckCircle: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  XCircle: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  IndustryIcon: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" />
      <line x1="8" y1="2" x2="8" y2="22" />
      <line x1="16" y1="2" x2="16" y2="22" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="2" y1="16" x2="22" y2="16" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

/* ================================================================
   HELPERS
================================================================ */
function formatDate(dateString) {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function getInitialColor(name) {
  const colors = [
    "from-blue-500 to-blue-700",
    "from-violet-500 to-violet-700",
    "from-emerald-500 to-emerald-700",
    "from-rose-500 to-rose-700",
    "from-amber-500 to-amber-700",
    "from-cyan-500 to-cyan-700",
    "from-pink-500 to-pink-700",
    "from-indigo-500 to-indigo-700",
  ];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  return colors[idx];
}

/* ================================================================
   TOAST
================================================================ */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-[13px] font-semibold max-w-sm
        ${
          type === "success"
            ? "bg-white border-emerald-200 text-emerald-800 shadow-emerald-100/60"
            : "bg-white border-red-200 text-red-700 shadow-red-100/60"
        }`}
    >
      <span
        className={`flex-shrink-0 ${type === "success" ? "text-emerald-500" : "text-red-500"}`}
      >
        {type === "success" ? <Icon.CheckCircle /> : <Icon.XCircle />}
      </span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
      >
        <Icon.Close />
      </button>
    </div>
  );
}

/* ================================================================
   MODAL — View
================================================================ */
function ViewModal({ industry, onClose }) {
  const isActive =
    industry.status === true ||
    industry.status === 1 ||
    industry.status === "1" ||
    industry.status === "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-[15px] font-bold text-gray-900">
            Industry Details
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <Icon.Close />
          </button>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-5 flex items-center gap-4 border-b border-gray-100">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getInitialColor(industry.name)} text-white text-xl font-bold flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            {industry.name ? industry.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <p className="text-[16px] font-bold text-gray-900">
              {industry.name || "Unnamed"}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold
              ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"}`}
              />
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div className="px-6 py-2 divide-y divide-gray-50">
          {[
            { label: "Industry ID", value: `#${industry.id}` },
            { label: "Slug", value: industry.slug || "—" },
            { label: "Sort Order", value: industry.sort_order || "—" },
            { label: "Created At", value: formatDate(industry.created_at) },
            { label: "Last Updated", value: formatDate(industry.updated_at) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3.5"
            >
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {label}
              </span>
              <span className="text-[13px] font-semibold text-gray-700">
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-[13px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MODAL — Delete
================================================================ */
function DeleteModal({ industry, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/industry/${industry.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      onDeleted("Industry deleted successfully!");
    } catch {
      setError("Failed to delete. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-[15px] font-bold text-gray-900">
            Delete Industry
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <Icon.Close />
          </button>
        </div>
        <div className="px-6 py-6 flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
            <Icon.AlertTriangle />
          </div>
          <div>
            <p className="text-[14px] font-bold text-gray-800">
              Delete &ldquo;{industry.name || "Unnamed"}&rdquo;?
            </p>
            <p className="text-[12.5px] text-gray-500 mt-1.5 leading-relaxed">
              This action is permanent and cannot be undone.
            </p>
          </div>
          {error && (
            <p className="text-[12px] font-medium text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2 w-full text-left">
              {error}
            </p>
          )}
        </div>
        <div className="flex gap-2.5 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 text-[13px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
          >
            Keep Industry
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Icon.Trash />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN — Industry
================================================================ */
export default function Industry() {
  const navigate = useNavigate();

  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  /* ── Fetch ── */
  async function fetchIndustries() {
    setLoading(true);
    setFetchError("");
    try {
      const response = await fetch(`${API_BASE_URL}/industry`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();

      let industryData = [];
      if (json.success && json.data) {
        industryData = Array.isArray(json.data) ? json.data : [json.data];
      } else if (Array.isArray(json)) {
        industryData = json;
      } else if (json.data && Array.isArray(json.data)) {
        industryData = json.data;
      }

      setIndustries(industryData);
    } catch {
      setFetchError(
        "Unable to load industries. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIndustries();
  }, []);

  /* ── Filtered list ── */
  const filtered = industries.filter((ind) => {
    const matchSearch =
      ind.name?.toLowerCase().includes(search.toLowerCase()) || false;
    const isActive =
      ind.status === true ||
      ind.status === 1 ||
      ind.status === "1" ||
      ind.status === "active";
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? isActive : !isActive);
    return matchSearch && matchStatus;
  });

  /* ── Pagination ── */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filtered.length, currentPage, totalPages]);

  function closeModal() {
    setModal(null);
  }

  function afterAction(msg) {
    closeModal();
    fetchIndustries();
    setToast({ message: msg, type: "success" });
  }

  const activeCount = industries.filter(
    (ind) =>
      ind.status === true ||
      ind.status === 1 ||
      ind.status === "1" ||
      ind.status === "active",
  ).length;
  const inactiveCount = industries.length - activeCount;

  const TH = ["#", "Industry", "Status", "Created", "Last Updated", "Actions"];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FB] font-sans">
      <main className="flex-1 px-7 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 mb-5">
          <span>Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold">Industries</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Icon.IndustryIcon />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-gray-900 leading-tight">
                Industries
              </h1>
              <p className="text-[12.5px] text-gray-400 font-medium mt-0.5">
                Manage system industries and their status
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/add-industry")}
            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            <Icon.Plus />
            Add Industry
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <p className="text-[14px] font-bold text-gray-800">
                Industry List
              </p>
              <span className="px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
                {filtered.length}
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Filter pills */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
                {["all", "active", "inactive"].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setStatusFilter(f);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-all capitalize
                      ${
                        statusFilter === f
                          ? "bg-white text-gray-800 shadow-sm"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                  >
                    {f === "all"
                      ? "All"
                      : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon.Search />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search industries..."
                  className="pl-9 pr-4 py-1.5 text-[12px] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white w-40 sm:w-52 transition-all"
                />
              </div>

              {/* Refresh */}
              <button
                onClick={fetchIndustries}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
              >
                <Icon.Refresh /> Refresh
              </button>
            </div>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-[13px] text-gray-400 font-medium">
                Loading industries…
              </p>
            </div>
          )}

          {/* ── Fetch Error ── */}
          {!loading && fetchError && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400">
                <Icon.AlertTriangle />
              </div>
              <div className="text-center">
                <p className="text-[13px] font-semibold text-gray-700">
                  {fetchError}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  Check your connection and try again.
                </p>
              </div>
              <button
                onClick={fetchIndustries}
                className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all"
              >
                <Icon.Refresh /> Try Again
              </button>
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && !fetchError && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300">
                <Icon.IndustryIcon />
              </div>
              <div className="text-center">
                <p className="text-[13px] font-semibold text-gray-600">
                  {search || statusFilter !== "all"
                    ? "No matching industries found"
                    : "No industries created yet"}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  {search || statusFilter !== "all"
                    ? "Try adjusting your search or filter."
                    : "Click 'Add Industry' to get started."}
                </p>
              </div>
              {!search && statusFilter === "all" && (
                <button
                  onClick={() => navigate("/add-industry")}
                  className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all"
                >
                  <Icon.Plus /> Add Industry
                </button>
              )}
            </div>
          )}

          {/* ── Table ── */}
          {!loading && !fetchError && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {TH.map((h) => (
                      <th
                        key={h}
                        className={`px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap
                          ${
                            h === "#"
                              ? "w-14 text-center"
                              : h === "Actions"
                                ? "text-center"
                                : "text-left"
                          }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((ind, idx) => {
                    const globalIndex = startIndex + idx;
                    const isActive =
                      ind.status === true ||
                      ind.status === 1 ||
                      ind.status === "1" ||
                      ind.status === "active";

                    return (
                      <tr
                        key={ind.id || idx}
                        className="border-b border-gray-50 last:border-0 hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="px-5 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-[12px] font-bold text-gray-500">
                            {globalIndex + 1}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {ind.icon ? (
                              <img
                                src={
                                  ind.icon.startsWith("http")
                                    ? ind.icon
                                    : `${API_BASE_URL}${ind.icon}`
                                }
                                alt={ind.name}
                                className="w-9 h-9 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  const parent = e.target.parentElement;
                                  const fallback =
                                    document.createElement("div");
                                  fallback.className = `w-9 h-9 rounded-xl bg-gradient-to-br ${getInitialColor(
                                    ind.name,
                                  )} text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm`;
                                  fallback.textContent = ind.name
                                    ? ind.name.charAt(0).toUpperCase()
                                    : "?";
                                  parent.appendChild(fallback);
                                }}
                              />
                            ) : (
                              <div
                                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getInitialColor(
                                  ind.name,
                                )} text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm`}
                              >
                                {ind.name
                                  ? ind.name.charAt(0).toUpperCase()
                                  : "?"}
                              </div>
                            )}
                            <div>
                              <p className="text-[13px] font-bold text-gray-800 leading-tight">
                                {ind.name || "Unnamed Industry"}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                ID: #{ind.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold border
                            ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                              ${isActive ? "bg-emerald-500" : "bg-red-500"}`}
                            />
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-[13px] text-gray-500 font-medium">
                            {formatDate(ind.created_at)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-[13px] text-gray-500 font-medium">
                            {formatDate(ind.updated_at)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() =>
                                setModal({ type: "view", industry: ind })
                              }
                              title="View"
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 border border-transparent hover:border-blue-200 transition-all"
                            >
                              <Icon.Eye />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/edit-industry/${ind.id}`)
                              }
                              title="Edit"
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 border border-transparent hover:border-emerald-200 transition-all"
                            >
                              <Icon.Edit />
                            </button>
                            <button
                              onClick={() =>
                                setModal({ type: "delete", industry: ind })
                              }
                              title="Delete"
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 border border-transparent hover:border-red-200 transition-all"
                            >
                              <Icon.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Table Footer with Pagination and Items Per Page */}
              <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50/70 border-t border-gray-100 flex-wrap gap-3">
                <p className="text-[12px] text-gray-400 font-medium">
                  Showing{" "}
                  <span className="text-gray-700 font-bold">
                    {filtered.length === 0 ? 0 : startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-gray-700 font-bold">
                    {Math.min(filtered.length, startIndex + itemsPerPage)}
                  </span>{" "}
                  of{" "}
                  <span className="text-gray-700 font-bold">
                    {filtered.length}
                  </span>{" "}
                  industries
                </p>

                <div className="flex items-center gap-4">
                  {/* Pagination Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <Icon.ChevronLeft />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-[12px] font-semibold transition-all
                            ${
                              currentPage === pageNum
                                ? "bg-indigo-600 text-white shadow-md"
                                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <Icon.ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Modals ── */}
      {modal?.type === "view" && (
        <ViewModal industry={modal.industry} onClose={closeModal} />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          industry={modal.industry}
          onClose={closeModal}
          onDeleted={afterAction}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
