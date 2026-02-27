import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { FaGem, FaBicycle, FaUserTie, FaHeadset } from "react-icons/fa";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image:
        "https://www.shutterstock.com/image-photo/closeup-extreme-mountain-biking-cyclist-600nw-2401841757.jpg",
      title: "Adventure Awaits on Two Wheels",
      text: "Discover premium bicycles built for performance and style.",
    },
    {
      id: 2,
      image:
        "https://www.shutterstock.com/image-photo/man-racing-cyclist-motion-on-600nw-1855937053.jpg",
      title: "Ride Beyond Limits",
      text: "Experience freedom and power with our latest collection.",
    },
    {
      id: 3,
      image:
        "https://wmzkol.pl/wp-content/themes/wmzkol/assets/img/hero-bg.jpg",
      title: "Where Comfort Meets Speed",
      text: "Your perfect companion for every terrain and journey.",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Road Bikes",
      image:
        "https://www.strictlybicycles.com/cdn/shop/files/1680__resize__f316995e65a5f21029794241035a8150.jpg?v=1699670211&width=800",
    },
    {
      id: 2,
      name: "MTB Cycles",
      image:
        "https://www.cairngormmountain.co.uk/wp-content/uploads/2025/06/AJT08749-scaled.jpg",
    },
    {
      id: 3,
      name: "Hybrid Cycles",
      image:
        "https://c02.purpledshub.com/uploads/sites/39/2023/12/Specialized-Sirrus-X-3.0-13.jpg?w=1029&webp=1",
    },
    {
      id: 4,
      name: "Kids Cycles",
      image:
        "https://rforrabbit.com/cdn/shop/files/VroomBicycle_LakeBlue_16__7_1800x1800.jpg?v=1718191274",
    },
    {
      id: 5,
      name: "Electric Cycles",
      image:
        "https://cdn.bikedekho.com/processedimages/lectro-electric/y3/source/y3683d3f1edd66d.jpg",
    },
    {
      id: 6,
      name: "Girls Cycles",
      image:
        "https://bicyclekart.com/cdn/shop/files/81vDLrNluEL._SX679__1_670x.jpg?v=1733371907",
    },
  ];

  return (
    <div className="pt-15 relative w-full bg-zinc-950 text-white selection:bg-lime-500 selection:text-black">
      {/* ===== HERO SLIDER ===== */}
      <div className="h-[100vh] relative group">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="h-full [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet-active]:bg-lime-500 [&_.swiper-button-next]:text-lime-500 [&_.swiper-button-prev]:text-lime-500"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                {/* Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/40 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover filter brightness-90"
                />
                
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
                  {/* Sporty Italic Heading */}
                  <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 drop-shadow-xl transform -skew-x-6">
                    <span className="text-white drop-shadow-md">{slide.title}</span>
                  </h1>
                  
                  <p className="text-lg md:text-2xl mb-8 font-medium text-zinc-200 max-w-2xl tracking-wide">
                    {slide.text}
                  </p>
                  
                  {/* Skewed Button */}
                  <Link
                    to="/products"
                    className="group relative px-8 py-3 bg-lime-500 text-zinc-950 hover:bg-white hover:text-black transition-all duration-300 transform -skew-x-12"
                  >
                    <span className="block transform skew-x-12 text-lg font-black uppercase tracking-widest">
                      Shop Now
                    </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== INTRO & FEATURES ===== */}
      <div className="space-y-16 py-20 px-6 md:px-20 bg-zinc-950 border-t border-zinc-800">
        
        {/* Background Decorative Line */}
        <div className="hidden md:block absolute left-0 top-[110vh] w-2 h-32 bg-lime-500" />

        {/* Heading */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tight">
            Ride into Adventure with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 inline-block transform -skew-x-6">
              RideSphere
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            We provide high-quality, stylish bicycles for every rider. Whether
            you're exploring city streets, conquering rugged trails, or enjoying
            weekend adventures, we have the perfect cycle for you.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-12">
             <div className="w-12 h-1 bg-lime-500 transform -skew-x-12"></div>
             <h2 className="text-3xl font-black italic uppercase text-white tracking-widest">
                Why Choose Us?
             </h2>
             <div className="w-12 h-1 bg-lime-500 transform -skew-x-12"></div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Premium Quality */}
            <div className="group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-lime-500 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-lime-500 transition-colors">
                    <FaGem className="text-zinc-500 group-hover:text-lime-500 w-10 h-10 transition-colors" />
                </div>
                <h3 className="text-xl font-bold italic uppercase text-white mb-2 group-hover:text-lime-500 transition-colors">
                  Premium Quality
                </h3>
                <p className="text-zinc-400 text-sm font-medium">
                  Durable, comfortable, and high-performance bicycles.
                </p>
              </div>
            </div>

            {/* Wide Range */}
            <div className="group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-lime-500 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-lime-500 transition-colors">
                    <FaBicycle className="text-zinc-500 group-hover:text-lime-500 w-10 h-10 transition-colors" />
                </div>
                <h3 className="text-xl font-bold italic uppercase text-white mb-2 group-hover:text-lime-500 transition-colors">
                   Wide Range
                </h3>
                <p className="text-zinc-400 text-sm font-medium">
                  Mountain bikes, road bikes, electric cycles, and kids’ cycles.
                </p>
              </div>
            </div>

            {/* Expert Guidance */}
            <div className="group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-lime-500 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-lime-500 transition-colors">
                    <FaUserTie className="text-zinc-500 group-hover:text-lime-500 w-10 h-10 transition-colors" />
                </div>
                <h3 className="text-xl font-bold italic uppercase text-white mb-2 group-hover:text-lime-500 transition-colors">
                  Expert Guidance
                </h3>
                <p className="text-zinc-400 text-sm font-medium">
                  Our team helps you find the perfect ride.
                </p>
              </div>
            </div>

            {/* Customer First */}
            <div className="group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-lime-500 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-zinc-800 group-hover:border-r-lime-500 transition-all"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-lime-500 transition-colors">
                    <FaHeadset className="text-zinc-500 group-hover:text-lime-500 w-10 h-10 transition-colors" />
                </div>
                <h3 className="text-xl font-bold italic uppercase text-white mb-2 group-hover:text-lime-500 transition-colors">
                  Customer First
                </h3>
                <p className="text-zinc-400 text-sm font-medium">
                  Fast delivery, easy returns, and friendly support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="py-20 bg-zinc-900 relative">
        {/* Slanted Separator */}
        <div className="absolute top-0 left-0 w-full h-10 bg-zinc-950 transform origin-top-right -skew-y-1"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-center mb-16 text-white tracking-tight">
            Featured <span className="text-lime-500">Categories</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative group overflow-hidden border-2 border-zinc-800 hover:border-lime-500 transition-colors duration-300 bg-zinc-800"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                
                {/* Image with Scale Effect */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">
                  <Link
                    to="/products"
                    className="bg-red-600 text-white px-8 py-3 font-bold italic uppercase tracking-wider transform -skew-x-12 hover:bg-white hover:text-black transition-colors shadow-lg shadow-red-600/20"
                  >
                    <span className="block transform skew-x-12">{cat.name}</span>
                  </Link>
                </div>

                {/* Always Visible Label (Optional Sporty Touch) */}
                <div className="absolute bottom-0 left-0 bg-zinc-950 px-6 py-2 transform -skew-x-12 -translate-x-4 group-hover:translate-y-full transition-transform duration-300 z-20 border-r-2 border-lime-500">
                    <span className="block transform skew-x-12 text-white font-bold italic uppercase text-sm">
                        {cat.name}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
