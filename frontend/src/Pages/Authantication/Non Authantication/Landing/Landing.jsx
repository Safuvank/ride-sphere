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
    <div className="w-full bg-white font-sans">
      {/* ===== HERO SLIDER ===== */}
      <div className="h-[80vh] md:h-[90vh] relative group pt-16">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="h-full [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                {/* Clean Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                    {slide.text}
                  </p>
                  <Link
                    to="/products"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-lg"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== INTRO & FEATURES ===== */}
      <div className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ride into Adventure with RideSphere
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We provide high-quality, stylish bicycles for every rider. Whether
            you're exploring city streets, conquering rugged trails, or enjoying
            weekend adventures, we have the perfect cycle for you.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Premium Quality */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <FaGem className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Durable, comfortable, and high-performance bicycles built to last.
              </p>
            </div>

            {/* Wide Range */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <FaBicycle className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wide Range
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mountain bikes, road bikes, electric cycles, and kids’ cycles.
              </p>
            </div>

            {/* Expert Guidance */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <FaUserTie className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Expert Guidance
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our knowledgeable team helps you find your perfect ride.
              </p>
            </div>

            {/* Customer First */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <FaHeadset className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Customer First
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fast delivery, easy returns, and friendly support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Categories
            </h2>
            <p className="text-gray-600">Find the perfect bike for your lifestyle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                to="/products"
                key={cat.id}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                {/* Clean Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
                  <h3 className="text-2xl font-semibold text-white">
                    {cat.name}
                  </h3>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}