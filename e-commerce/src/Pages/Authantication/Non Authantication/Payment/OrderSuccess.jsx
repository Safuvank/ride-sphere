
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// export default function OrderSuccess() {

//   const location = useLocation();
//   if(!location.state?.success){
//     return <Navigate to="/" />
//   }
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
//         <h2 className="text-3xl font-bold text-green-600 mb-4">
//          Order Placed Successfully!
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Thank you for shopping with us. Your order will be delivered soon.
//         </p>
//         <Link
//           to="/orderhistory"
//           className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
//         >
//           View your Orders
//         </Link>
//       </div>
//     </div>
//   );
// }






import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { FaCheckCircle, FaFlagCheckered } from "react-icons/fa";

export default function OrderSuccess() {
  const location = useLocation();

  // Keep existing logic to prevent direct access
  if (!location.state?.success) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 relative overflow-hidden px-4">
      
      {/* Background Decor Speed Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lime-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Success Card */}
      <div className="relative z-10 bg-zinc-900 border-2 border-zinc-800 p-10 max-w-lg w-full text-center transform -skew-x-6 shadow-2xl shadow-lime-500/10 hover:border-lime-500/50 transition-colors duration-500">
        
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-green-600" />

        {/* Un-skew content container to keep text readable */}
        <div className="transform skew-x-6">
          
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-zinc-950 border-2 border-lime-500 rounded-full flex items-center justify-center text-lime-500 shadow-[0_0_30px_rgba(132,204,22,0.3)]">
              <FaCheckCircle size={40} />
            </div>
          </div>

          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
            Order <span className="text-lime-500">Successful!</span>
          </h2>
          
          <p className="text-zinc-400 mb-8 font-medium uppercase tracking-wide text-sm border-t border-zinc-800 pt-6">
            Thank you for gearing up with us. Your ride will be delivered soon.
          </p>

          <Link
            to="/orderhistory"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white font-black italic uppercase tracking-widest text-sm transform -skew-x-12 hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            <span className="transform skew-x-12 flex items-center gap-2">
              View Your Orders <FaFlagCheckered />
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
}