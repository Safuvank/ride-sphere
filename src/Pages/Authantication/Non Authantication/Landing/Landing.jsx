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
    <div className="pt-15 relative w-full">
      {/* ===== HERO SLIDER ===== */}
      <div className="h-[100vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6">{slide.text}</p>
                  <Link
                    to="/products"
                    className="bg-white text-black hover:bg-black-text-whit px-6 py-3 rounded text-lg font-semibold transition"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="space-y-10 py-12 px-6 md:px-20 bg-[#feffff]">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Ride into Adventure with{" "}
            <span className="text-red-500">RideSphere</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            We provide high-quality, stylish bicycles for every rider. Whether
            you're exploring city streets, conquering rugged trails, or enjoying
            weekend adventures, we have the perfect cycle for you.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Why Choose Us?
          </h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Premium Quality */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
              <FaGem className="text-gray-600 w-16 h-16 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Durable, comfortable, and high-performance bicycles.
              </p>
            </div>

            {/* Wide Range */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
              <FaBicycle className="text-gray-600 w-16 h-16 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Wide Range</h3>
              <p className="text-gray-600 text-sm">
                Mountain bikes, road bikes, electric cycles, and kids’ cycles.
              </p>
            </div>

            {/* Expert Guidance */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
              <FaUserTie className="text-gray-600 w-16 h-16 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600 text-sm">
                Our team helps you find the perfect ride.
              </p>
            </div>

            {/* Customer First */}
            <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
              <FaHeadset className="text-gray-600 w-16 h-16 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Customer First
              </h3>
              <p className="text-gray-600 text-sm">
                Fast delivery, easy returns, and friendly support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-85 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Link
                    to="/products"
                    className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
                  >
                    {cat.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
