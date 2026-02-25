import React from "react";

const PageReload = ({ message = "Reloading page data..." }) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default PageReload;
