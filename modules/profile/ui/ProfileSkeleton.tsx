import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0 animate-pulse">
      {/* Header section */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mt-1"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <ul className="flex flex-col">
              {[1, 2].map((item) => (
                <li key={item}>
                  <div className="w-full flex items-center gap-3 px-6 py-4 border-l-4 border-transparent">
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                  </div>
                </li>
              ))}
              <li>
                <div className="w-full flex items-center gap-3 px-6 py-4 border-l-4 border-transparent border-t border-gray-100">
                  <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
            <div className="h-7 bg-gray-200 rounded w-56 mb-6 pb-4"></div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>

              <div className="pt-2 w-full md:w-fit">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
