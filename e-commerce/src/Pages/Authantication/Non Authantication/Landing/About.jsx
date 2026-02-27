// import React from "react";

// export default function AboutPage() {
//   return (
//     <div className="pt-20 min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      
     

//       {/* Why Choose Us Section */}
//       <div className="grid md:grid-cols-2 gap-12 mb-12 mt-12">
//         <div className="space-y-6">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//           Ride into Adventure with <span className="text-red-500">RideSphere</span>
//         </h1>
//         <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
//           We provide high-quality, stylish bicycles for every rider. Whether you're exploring city streets, conquering rugged trails, or enjoying weekend adventures, we have the perfect cycle for you.
//         </p>
//           <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
//           <ul className="space-y-4 text-gray-600 list-disc list-inside">
//             <li><strong>Premium Quality:</strong> Durable, comfortable, and high-performance bicycles.</li>
//             <li><strong>Wide Range:</strong> Mountain bikes, road bikes, electric cycles, and kids’ cycles.</li>
//             <li><strong>Expert Guidance:</strong> Our team helps you find the perfect ride.</li>
//             <li><strong>Customer First:</strong> Fast delivery, easy returns, and friendly support.</li>
//           </ul>
//         </div>
//         <div>
//           <img 
//             src="https://switchback.alpsinsight.com/wp-content/uploads/2023/02/221219-Deep-Winter-3-09401.jpg" 
//             alt="Cycling adventure" 
//             className="rounded-lg shadow-lg object-cover w-full h-80 md:h-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }






import React from "react";
import { FaCheck } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-950 relative overflow-hidden text-white px-6 md:px-20">
      
      {/* Background Decor Speed Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-0 left-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
         <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-12">
        
        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-12">
          
          {/* Text Content */}
          <div className="space-y-12">
            
            {/* Header Section */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                Ride into Adventure with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                    RideSphere
                </span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed border-l-4 border-lime-500 pl-6">
                We provide high-quality, stylish bicycles for every rider. Whether you're exploring city streets, conquering rugged trails, or enjoying weekend adventures, we have the perfect cycle for you.
              </p>
            </div>

            {/* Why Choose Us Section */}
            <div>
              <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
                <div className="h-6 w-2 bg-lime-500 skew-x-[-20deg]" />
                <h2 className="text-3xl font-black italic uppercase tracking-widest text-white">
                    Why Choose Us?
                </h2>
              </div>
              
              <ul className="space-y-6">
                {[
                  { title: "Premium Quality", desc: "Durable, comfortable, and high-performance bicycles." },
                  { title: "Wide Range", desc: "Mountain bikes, road bikes, electric cycles, and kids’ cycles." },
                  { title: "Expert Guidance", desc: "Our team helps you find the perfect ride." },
                  { title: "Customer First", desc: "Fast delivery, easy returns, and friendly support." },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-5 group">
                    {/* Skewed Checkmark Box */}
                    <div className="mt-1 w-8 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center transform -skew-x-12 group-hover:border-lime-500 group-hover:bg-lime-500 transition-all duration-300 flex-shrink-0">
                        <FaCheck className="text-zinc-500 group-hover:text-zinc-950 transform skew-x-12 w-3 h-3" />
                    </div>
                    <div>
                        <strong className="block text-white font-black italic uppercase tracking-wide text-lg group-hover:text-lime-500 transition-colors mb-1">
                            {item.title}
                        </strong>
                        <span className="text-zinc-400 font-medium text-sm leading-relaxed block max-w-sm">
                            {item.desc}
                        </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full group mt-10 md:mt-0">
            {/* Accent Background Frame (Red) */}
            <div className="absolute inset-0 bg-red-600 transform skew-x-[-6deg] translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-0" />
            
            {/* Main Image Container */}
            <div className="relative z-10 bg-zinc-950 p-2 transform skew-x-[-6deg] overflow-hidden border-2 border-zinc-800 group-hover:border-lime-500 transition-colors duration-500 h-[400px] md:h-[600px] shadow-2xl">
                {/* Image Wrapper (Counter-skewed to keep image straight) */}
                <div className="w-full h-full transform skew-x-[6deg] scale-110 overflow-hidden">
                    <img 
                        src="https://switchback.alpsinsight.com/wp-content/uploads/2023/02/221219-Deep-Winter-3-09401.jpg" 
                        alt="Cycling adventure" 
                        className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700 hover:scale-[1.03]"
                    />
                </div>
            </div>
            
            {/* Decorative Corner Tag */}
            <div className="absolute top-6 right-[-20px] z-20 bg-lime-500 text-zinc-950 px-6 py-2 transform -skew-x-12 shadow-lg opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 pointer-events-none">
                <span className="block transform skew-x-12 font-black italic uppercase text-xs tracking-widest">
                    Ride Beyond Limits
                </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}