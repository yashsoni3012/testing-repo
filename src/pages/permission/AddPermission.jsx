import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ================================================================
   ICONS (copied from AddModule)
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
  Shield: () => (
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
   MAIN — AddPermission
================================================================ */
export default function AddPermission() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    role_id: "",
    module_id: "",
    can_read: false,
    can_create: false,
    can_update: false,
    can_delete: false,
  });

  useEffect(() => {
    fetchRoles();
    fetchModules();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/role`);
      if (res.data.success) {
        setRoles(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await axios.get(`${API_BASE}/module`);
      if (res.data.success) {
        setModules(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for toggle switches (called directly with boolean)
  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role_id || !formData.module_id) {
      setError("Please select both a role and a module.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        role_id: Number(formData.role_id),
        module_id: Number(formData.module_id),
        can_read: formData.can_read,
        can_create: formData.can_create,
        can_update: formData.can_update,
        can_delete: formData.can_delete,
      };

      const res = await axios.post(`${API_BASE}/permission`, payload);

      if (res.data.success) {
        setToast({ message: "Permission created successfully!", type: "success" });
        setTimeout(() => {
          navigate("/permission");
        }, 1500);
      } else {
        setError(res.data.message || "Failed to create permission.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create permission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FB] font-sans px-7 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/permissions")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6 w-fit"
      >
        <Icon.ArrowLeft />
        <span className="text-sm font-medium">Back to Permissions</span>
      </button>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-7xl w-full p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Icon.Shield />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight">
              Add Permission
            </h1>
            <p className="text-[12.5px] text-gray-400 font-medium mt-0.5">
              Assign module permissions to a role
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-700">
            <Icon.XCircle />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Role
            </label>
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-[14px] font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>

          {/* Module */}
          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Module
            </label>
            <select
              name="module_id"
              value={formData.module_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-[14px] font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            >
              <option value="">Select a module</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.name}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions – using ToggleSwitch components */}
          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ToggleSwitch
                checked={formData.can_read}
                onChange={(val) => handleToggle("can_read", val)}
                label="Read"
              />
              <ToggleSwitch
                checked={formData.can_create}
                onChange={(val) => handleToggle("can_create", val)}
                label="Create"
              />
              <ToggleSwitch
                checked={formData.can_update}
                onChange={(val) => handleToggle("can_update", val)}
                label="Update"
              />
              <ToggleSwitch
                checked={formData.can_delete}
                onChange={(val) => handleToggle("can_delete", val)}
                label="Delete"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">
            <button
              type="button"
              onClick={() => navigate("/permissions")}
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
                  Creating...
                </>
              ) : (
                "Create Permission"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Toast */}
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