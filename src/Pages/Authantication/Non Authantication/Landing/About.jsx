import React from "react";

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      
     

      {/* Why Choose Us Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-12 mt-12">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Ride into Adventure with <span className="text-red-500">RideSphere</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          We provide high-quality, stylish bicycles for every rider. Whether you're exploring city streets, conquering rugged trails, or enjoying weekend adventures, we have the perfect cycle for you.
        </p>
          <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
          <ul className="space-y-4 text-gray-600 list-disc list-inside">
            <li><strong>Premium Quality:</strong> Durable, comfortable, and high-performance bicycles.</li>
            <li><strong>Wide Range:</strong> Mountain bikes, road bikes, electric cycles, and kids’ cycles.</li>
            <li><strong>Expert Guidance:</strong> Our team helps you find the perfect ride.</li>
            <li><strong>Customer First:</strong> Fast delivery, easy returns, and friendly support.</li>
          </ul>
        </div>
        <div>
          <img 
            src="https://switchback.alpsinsight.com/wp-content/uploads/2023/02/221219-Deep-Winter-3-09401.jpg" 
            alt="Cycling adventure" 
            className="rounded-lg shadow-lg object-cover w-full h-80 md:h-full"
          />
        </div>
      </div>
    </div>
  );
}
