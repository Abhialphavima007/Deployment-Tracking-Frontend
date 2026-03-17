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
      'success': 'bg-green-100 text-green-800 border-green-200',
      'failed': 'bg-red-100 text-red-800 border-red-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'running': 'bg-blue-100 text-blue-800 border-blue-200',
      'cancelled': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <>
      {/* Backdrop - Full coverage */}
      <div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container - Responsive */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto max-h-full flex flex-col">
          
          {/* Modal Content - Fixed height management */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden">
            
            {/* Header - Fixed height */}
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                    Deployment Details
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-600 font-medium tracking-wide uppercase truncate max-w-full">
                    {deployment.solution_display_name}
                  </p>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200 group -m-2"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Status Badge */}
              <div className={`mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-2xl font-semibold text-sm border-2 shadow-md max-w-full overflow-hidden`}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse" 
                     style={{ 
                       background: deployment.status === 'success' ? '#10b981' : 
                                  deployment.status === 'failed' ? '#ef4444' :
                                  deployment.status === 'running' ? '#3b82f6' : '#f59e0b'
                     }} 
                />
                <span className={`truncate ${getStatusColor(deployment.status)}`}>
                  {deployment.status?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 pb-8 pt-6 -m-0.5">
              
              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Solution Info */}
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Solution Display Name
                    </label>
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500 font-semibold text-lg sm:text-xl text-gray-900 min-h-[20px] break-words">
                      {deployment.solution_display_name || 'N/A'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Internal Name
                    </label>
                    <p className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono break-all">
                      {deployment.solution_internal_name || 'N/A'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Version
                      </label>
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border text-sm font-mono font-semibold">
                        {deployment.version_number || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Solution Type
                      </label>
                      <div className="p-3 sm:p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-sm font-semibold text-indigo-900">
                        {deployment.solution_type || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Publisher
                    </label>
                    <div className="flex items-center gap-3 p-4 sm:p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border-2 border-emerald-200">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 truncate">{deployment.solution_publisher || 'N/A'}</p>
                        <p className="text-xs text-gray-600">Publisher</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environment & Components */}
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Environment Transfer
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-l-4 border-green-400 gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900">Source</p>
                          <p className="text-xs text-gray-600 bg-green-100 px-3 py-1.5 rounded-full inline-block font-mono truncate mt-1">
                            {deployment.source_environment || 'N/A'}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mx-auto sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-l-4 border-blue-400">
                        <p className="font-semibold text-sm text-gray-900 mb-1.5">Target</p>
                        <p className="text-xs text-gray-600 bg-blue-100 px-3 py-1.5 rounded-full inline-block font-semibold font-mono truncate">
                          {deployment.target_environment || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Components ({(deployment.components_included || []).length})
                    </label>
                    <div className="max-h-40 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 overflow-y-auto">
                      {(deployment.components_included || []).length > 0 ? (
                        (deployment.components_included || []).slice(0, 8).map((component, index) => (
                          <div key={index} className="flex items-start gap-3 p-2.5 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                            <span className="font-medium text-gray-900 break-words leading-relaxed">{component}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic py-3 px-2">No components included</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details - Collapsible sections */}
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {deployment.connection_references?.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Connection References ({deployment.connection_references.length})
                      </label>
                      <div className="max-h-28 p-4 bg-orange-50 rounded-xl border border-orange-200 overflow-y-auto">
                        {(deployment.connection_references || []).slice(0, 6).map((ref, index) => (
                          <div key={index} className="flex items-center gap-3 p-2.5 bg-white/50 rounded-lg border border-orange-100 mb-2 last:mb-0 text-sm last:pb-0">
                            <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-gray-900 truncate font-mono">{ref}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {deployment.environment_variables?.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Environment Variables ({deployment.environment_variables.length})
                      </label>
                      <div className="max-h-28 p-4 bg-purple-50 rounded-xl border border-purple-200 overflow-y-auto">
                        {(deployment.environment_variables || []).slice(0, 6).map((varItem, index) => (
                          <div key={index} className="flex items-center gap-3 p-2.5 bg-white/50 rounded-lg border border-purple-100 mb-2 last:mb-0 text-sm">
                            <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <span className="text-gray-900 truncate font-mono">{varItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Fields */}
                <div className="space-y-5">
                  {deployment.developer_notes && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Developer Notes
                      </label>
                      <div className="p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 prose prose-sm max-w-none max-h-32 overflow-y-auto">
                        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{deployment.developer_notes}</p>
                      </div>
                    </div>
                  )}
                  
                  {deployment.deployment_instructions && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Deployment Instructions
                      </label>
                      <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border-l-4 border-emerald-400 max-h-32 overflow-y-auto">
                        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{deployment.deployment_instructions}</p>
                      </div>
                    </div>
                  )}

                  {deployment.description && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Description
                      </label>
                      <div className="p-5 sm:p-6 bg-indigo-50/50 rounded-2xl border border-indigo-200 max-h-28 overflow-y-auto">
                        <p className="text-gray-900 leading-relaxed">{deployment.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="px-6 sm:px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={onClose}
                className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
              >
                Close
              </button>
              {/* <button
                onClick={() => navigate(`/client/${deployment.client_id}/deployments/${deployment._id}/edit`)}
                className="px-5 sm:px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                Edit Deployment
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeploymentDetailModal;

