import React, { useState } from "react";

function AddDeploymentModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    solution_display_name: "",
    solution_internal_name: "",
    solution_publisher: "",
    version_number: "",
    source_environment: "",
    target_environment: "",
    solution_type: "",
    components_included: [],
    connection_references: "",
    environment_variables: "",
    developer_notes: "",
    deployment_instructions: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleComponentChange = (e) => {
    const value = e.target.value;
    setForm((prev) => {
      if (e.target.checked) {
        return { ...prev, components_included: [...prev.components_included, value] };
      } else {
        return { ...prev, components_included: prev.components_included.filter((c) => c !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      connection_references: form.connection_references
        ? form.connection_references.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      environment_variables: form.environment_variables
        ? form.environment_variables.split(",").map((s) => s.trim()).filter(Boolean)
        : []
    };
    onSubmit(payload);
  };

  if (!isOpen) return null;

  // Options for dropdowns and checkboxes
  const envOptions = ["Dev", "UAT", "Prod", "Sandbox", "Other"];
  const solutionTypeOptions = ["managed", "unmanaged"];
  const componentOptions = [
    "Canvas App",
    "Cloud Flows",
    "Tables",
    "Connection References",
    "Environment Variables",
    "Model-Driven App",
    "Custom Connectors",
    "Security Roles"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.25)'}}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2 text-blue-700">New Deployment Request</h2>
        <p className="mb-6 text-gray-500">Submit a new Power Platform solution deployment</p>
        {/* Solution Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Solution Display Name *</label>
            <input
              type="text"
              name="solution_display_name"
              value={form.solution_display_name}
              onChange={handleChange}
              required
              placeholder="e.g. Expense Tracker"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Internal Name</label>
            <input
              type="text"
              name="solution_internal_name"
              value={form.solution_internal_name}
              onChange={handleChange}
              placeholder="e.g. new_ExpenseTracker"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Solution Publisher *</label>
            <input
              type="text"
              name="solution_publisher"
              value={form.solution_publisher}
              onChange={handleChange}
              required
              placeholder="e.g. new_"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Version Number</label>
            <input
              type="text"
              name="version_number"
              value={form.version_number}
              onChange={handleChange}
              placeholder="e.g. 1.0.0.5"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        {/* Environment & Type */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Source Environment *</label>
            <select
              name="source_environment"
              value={form.source_environment}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              {envOptions.map((env) => (
                <option key={env} value={env}>{env}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Target Environment *</label>
            <select
              name="target_environment"
              value={form.target_environment}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              {envOptions.map((env) => (
                <option key={env} value={env}>{env}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Solution Type *</label>
            <select
              name="solution_type"
              value={form.solution_type}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              {solutionTypeOptions.map((type) => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Components Included */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Components Included</label>
          <div className="grid grid-cols-2 gap-2">
            {componentOptions.map((comp) => (
              <label key={comp} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={comp}
                  checked={form.components_included.includes(comp)}
                  onChange={handleComponentChange}
                  className="accent-blue-600"
                />
                <span>{comp}</span>
              </label>
            ))}
          </div>
        </div>
        {/* References & Variables */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Connection References</label>
          <input
            type="text"
            name="connection_references"
            value={form.connection_references}
            onChange={handleChange}
            placeholder="Comma separated"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Environment Variables</label>
          <input
            type="text"
            name="environment_variables"
            value={form.environment_variables}
            onChange={handleChange}
            placeholder="Comma separated"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Notes & Instructions */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Developer Notes</label>
          <textarea
            name="developer_notes"
            value={form.developer_notes}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Deployment Instructions</label>
          <textarea
            name="deployment_instructions"
            value={form.deployment_instructions}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all duration-200"
        >
          Submit Deployment
        </button>
      </form>
    </div>
  );
}

export default AddDeploymentModal;
