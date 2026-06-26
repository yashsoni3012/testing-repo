// src/pages/EditIndustry.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "https://hire-me-jobs.onrender.com";

/* ================================================================
   ICONS
================================================================ */
const Icon = {
  ArrowLeft: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
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
      width="20"
      height="20"
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
};

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
   TOGGLE SWITCH
================================================================ */
function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className="text-[13px] font-medium text-gray-600">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-12 h-7 rounded-full transition-colors duration-200 ease-in-out
            ${checked ? "bg-indigo-600" : "bg-gray-300"}`}
        />
        <div
          className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out
            ${checked ? "transform translate-x-5" : ""}`}
        />
      </div>
    </label>
  );
}

/* ================================================================
   HELPER - Create Slug
================================================================ */
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ================================================================
   MAIN — EditIndustry
================================================================ */
export default function EditIndustry() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/industry/${id}`);

        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          // If not JSON, it's probably HTML (404 page)
          throw new Error(
            `Industry with ID "${id}" not found. The API endpoint may not exist or the ID is invalid.`,
          );
        }

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`Industry with ID "${id}" not found.`);
          }
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        const industryData = data.data || data;

        if (!industryData || !industryData.id) {
          throw new Error(`Industry with ID "${id}" not found.`);
        }

        setName(industryData.name || "");
        const isActive =
          industryData.status === true ||
          industryData.status === 1 ||
          industryData.status === "1" ||
          industryData.status === "active";
        setStatus(isActive);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchIndustry();
    } else {
      setError("No industry ID provided");
      setFetchLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Industry name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        slug: createSlug(name.trim()),
        status: status,
        is_status: status,
        sort_order: 1,
        is_trending: false,
        updated_by: 1,
      };

      console.log("Updating industry with payload:", payload);

      const res = await fetch(`${API_BASE_URL}/industry/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // If the API returns HTML, it might mean the endpoint doesn't support PUT
        // Try PATCH as fallback
        console.log("PUT returned HTML, trying PATCH...");

        const patchRes = await fetch(`${API_BASE_URL}/industry/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            status: status,
          }),
        });

        if (!patchRes.ok) {
          throw new Error(
            `Update failed with status: ${patchRes.status}. The API may not support updating industries.`,
          );
        }

        setToast({
          message: "Industry updated successfully!",
          type: "success",
        });
        setTimeout(() => navigate("/industry"), 1500);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update industry.");
      }

      setToast({ message: "Industry updated successfully!", type: "success" });
      setTimeout(() => navigate("/industry"), 1500);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F4F6FB] px-7 py-6 items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 text-sm font-medium">
          Loading industry…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FB] font-sans px-7 py-6">
      <button
        onClick={() => navigate("/industry")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6 w-fit"
      >
        <Icon.ArrowLeft />
        <span className="text-sm font-medium">Back to Industries</span>
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-7xl w-full p-6 md:p-8">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Icon.IndustryIcon />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight">
              Edit Industry
            </h1>
            <p className="text-[12.5px] text-gray-400 font-medium mt-0.5">
              Update industry details
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">ID: #{id}</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-700">
            <Icon.XCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Industry Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Information Technology, Finance, Healthcare"
              className="w-full px-4 py-2.5 text-[14px] font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            />
            {name && (
              <p className="mt-1 text-[11px] text-gray-400">
                Slug:{" "}
                <span className="font-mono text-indigo-600">
                  {createSlug(name)}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Status
            </label>
            <ToggleSwitch
              checked={status}
              onChange={setStatus}
              label={status ? "Active" : "Inactive"}
            />
          </div>

          <div className="flex gap-4 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/industry")}
              className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Industry"
              )}
            </button>
          </div>
        </form>
      </div>

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
