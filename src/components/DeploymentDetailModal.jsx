// import React from "react";

// function DeploymentDetailModal({ isOpen, onClose, deployment }) {
//   if (!isOpen || !deployment) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.25)'}}>
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl relative overflow-y-auto max-h-[90vh]">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold mb-4 text-blue-700">Deployment Details</h2>
//         <div className="mb-2"><b>Solution Name:</b> {deployment.solution_display_name}</div>
//         <div className="mb-2"><b>Internal Name:</b> {deployment.solution_internal_name}</div>
//         <div className="mb-2"><b>Publisher:</b> {deployment.solution_publisher}</div>
//         <div className="mb-2"><b>Version:</b> {deployment.version_number}</div>
//         <div className="mb-2"><b>Source Environment:</b> {deployment.source_environment}</div>
//         <div className="mb-2"><b>Target Environment:</b> {deployment.target_environment}</div>
//         <div className="mb-2"><b>Solution Type:</b> {deployment.solution_type}</div>
//         <div className="mb-2"><b>Components Included:</b> {(deployment.components_included || []).join(", ")}</div>
//         <div className="mb-2"><b>Connection References:</b> {(deployment.connection_references || []).join(", ")}</div>
//         <div className="mb-2"><b>Environment Variables:</b> {(deployment.environment_variables || []).join(", ")}</div>
//         <div className="mb-2"><b>Developer Notes:</b> {deployment.developer_notes}</div>
//         <div className="mb-2"><b>Deployment Instructions:</b> {deployment.deployment_instructions}</div>
//         <div className="mb-2"><b>Description:</b> {deployment.description}</div>
//         <div className="mb-2"><b>Status:</b> {deployment.status}</div>
//       </div>
//     </div>
//   );
// }

// export default DeploymentDetailModal;


// ----------------------------------------------------------------------------------------------------

import React from "react";
import { useNavigate } from "react-router-dom";

function DeploymentDetailModal({ isOpen, onClose, deployment }) {
  if (!isOpen || !deployment) return null;

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      'success': 'bg-white text-green-700 border-green-400',
      'failed': 'bg-white text-red-700 border-red-400',
      'pending': 'bg-white text-yellow-700 border-yellow-400',
      'running': 'bg-white text-blue-700 border-blue-400',
      'cancelled': 'bg-white text-gray-700 border-gray-400'
    };
    return colors[status?.toLowerCase()] || 'bg-white text-gray-700 border-gray-400';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl mx-auto max-h-full flex flex-col">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full flex flex-col max-h-[92vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Deployment Details</h2>
                <div className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase truncate max-w-full">
                  {deployment.solution_display_name}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Status Badge */}
            <div className="px-6 pt-2 pb-1 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-lg border text-xs font-semibold flex items-center gap-2 ${getStatusColor(deployment.status)}`}> 
                <span className="w-2 h-2 rounded-full inline-block" style={{background: deployment.status === 'success' ? '#10b981' : deployment.status === 'failed' ? '#ef4444' : deployment.status === 'running' ? '#3b82f6' : '#f59e0b'}} />
                {deployment.status?.toUpperCase() || 'UNKNOWN'}
              </span>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-7 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Solution Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Solution Display Name
                    </label>
                    <div className="p-3 bg-white rounded-lg border border-gray-200 font-semibold text-base text-gray-900 min-h-[20px] break-words">
                      {deployment.solution_display_name || 'N/A'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Internal Name
                    </label>
                    <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-mono break-all">
                      {deployment.solution_internal_name || 'N/A'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Version
                      </label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 text-sm font-mono font-semibold">
                        {deployment.version_number || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Solution Type
                      </label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200 text-sm font-semibold text-gray-900">
                        {deployment.solution_type || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Publisher
                    </label>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-900 truncate">{deployment.solution_publisher || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Environment & Components */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Environment Transfer
                    </label>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg border border-gray-200 gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-xs text-gray-700">Source:</span>
                          <span className="ml-2 text-xs font-mono text-gray-600">{deployment.source_environment || 'N/A'}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mx-auto sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="font-semibold text-xs text-gray-700">Target:</span>
                        <span className="ml-2 text-xs font-mono text-gray-600">{deployment.target_environment || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Components ({(deployment.components_included || []).length})
                    </label>
                    <div className="max-h-32 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1 overflow-y-auto">
                      {(deployment.components_included || []).length > 0 ? (
                        (deployment.components_included || []).slice(0, 8).map((component, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-gray-100 text-xs">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                            <span className="font-medium text-gray-900 break-words leading-relaxed">{component}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic py-2 px-1">No components included</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                {deployment.connection_references?.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Connection References ({deployment.connection_references.length})
                    </label>
                    <div className="max-h-20 p-2 bg-white rounded-lg border border-gray-200 overflow-y-auto">
                      {(deployment.connection_references || []).slice(0, 6).map((ref, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100 mb-1 text-xs">
                          <span className="text-gray-900 truncate font-mono">{ref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {deployment.environment_variables?.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Environment Variables ({deployment.environment_variables.length})
                    </label>
                    <div className="max-h-20 p-2 bg-white rounded-lg border border-gray-200 overflow-y-auto">
                      {(deployment.environment_variables || []).slice(0, 6).map((varItem, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100 mb-1 text-xs">
                          <span className="text-gray-900 truncate font-mono">{varItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Text Fields */}
              <div className="mt-6 grid grid-cols-1 gap-4">
                {deployment.developer_notes && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Developer Notes
                    </label>
                    <div className="p-3 bg-white rounded-lg border border-gray-200 max-h-20 overflow-y-auto">
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-xs">{deployment.developer_notes}</p>
                    </div>
                  </div>
                )}
                {deployment.deployment_instructions && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Deployment Instructions
                    </label>
                    <div className="p-3 bg-white rounded-lg border border-gray-200 max-h-20 overflow-y-auto">
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-xs">{deployment.deployment_instructions}</p>
                    </div>
                  </div>
                )}
                {deployment.description && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Description
                    </label>
                    <div className="p-3 bg-white rounded-lg border border-gray-200 max-h-16 overflow-y-auto">
                      <p className="text-gray-900 leading-relaxed text-xs">{deployment.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeploymentDetailModal;

