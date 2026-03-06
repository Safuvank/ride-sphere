// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function AdminLayout() {
//   return (
//     <div className="flex">
//       {/* Fixed Sidebar */}
//       <Sidebar />
//       {/* Main Content */}
//       <div className="ml-64 w-full min-h-screen bg-gray-100 p-5">
//         <Outlet />
//       </div>
//     </div>
//   );
// }




import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white selection:bg-lime-500 selection:text-black">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 w-full min-h-screen p-8 relative overflow-hidden">
        
        {/* Background Decor (Speed Lines & Glow) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
           <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900/80 skew-x-[-20deg]" />
           <div className="absolute top-0 right-1/3 w-2 h-full bg-zinc-900/50 skew-x-[-20deg]" />
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full" />
        </div>

        {/* Page Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
}