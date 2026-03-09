import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../../api/api";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { Heart } from "lucide-react";
import { AuthContext } from "../../AuthContext";

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const {
    state: { cart, wishlist },
    dispatch,
  } = useContext(cartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    "All",
    "Road Bikes",
    "Hybrid Cycles",
    "MTB Cycles",
    "Kids Cycles",
    "Electric Cycles",
    "Girls Cycles",
  ];

  // Fetch prodcuts from server

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/products", {
          params: {
            search,
            category: filter,
            sort: sortOption,
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        // Safety check for HTML response (Vite fallback)
        const contentType = response.headers["content-type"];
        if (contentType && contentType.includes("text/html")) {
          throw new Error(
            "Received HTML from API. Backend might be down or URL is incorrect.",
          );
        }

        const { data } = response;
        console.log("API response:", data);

        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err.message ||
            "Failed to load products. Please check your connection.",
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, filter, sortOption, currentPage, itemsPerPage]);

  // Format price (INR)
  const formatPrice = (price) => price.toLocaleString("en-IN");

  // Add to Cart handler
  // const handleAddToCart = async (product) => {
  //   if (!user) {
  //     navigate("/login");
  //     return;
  //   }

  //   try{
  //     const res = await api.post("/cart", {
  //       productId : product._id,
  //       quantity: 1
  //     });

  //     dispatch({type: "SetCart", payload: res.data})
  //   }catch(error){
  //     console.error("Error adding to cart", error)
  //   }
  // };

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      dispatch({ type: "SetCart", payload: res.data });
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const handleAddToWishlist = async (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.post("/wishlist", {
        productId: product._id,
      });

      dispatch({
        type: "SetWishlist",
        payload: res.data.products.map((item) => item.product),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search, sortOption]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Speed Lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
      </div>

      <div className="relative z-10">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative group transform -skew-x-12">
            <input
              type="text"
              placeholder="SEARCH GEAR..."
              value={search}
              onChange={(e) => setSearchParams({ search: e.target.value })}
              className="w-full pl-8 pr-12 py-4 bg-zinc-900 border-2 border-zinc-800 text-white placeholder-zinc-500 shadow-lg focus:outline-none focus:border-lime-500 focus:shadow-lime-500/20 transition-all duration-300 font-bold italic uppercase tracking-wider transform skew-x-12"
            />
            <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none transform skew-x-12">
              <svg
                className="w-6 h-6 text-zinc-500 group-focus-within:text-lime-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 max-w-7xl mx-auto border-b border-zinc-800 pb-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm font-black italic uppercase tracking-widest transform -skew-x-12 transition-all duration-300 border-2 ${
                  filter === cat
                    ? "bg-lime-500 text-zinc-950 border-lime-500 shadow-lg shadow-lime-500/20 scale-105"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-lime-500 hover:text-white"
                }`}
              >
                <span className="block transform skew-x-12">{cat}</span>
              </button>
            ))}
          </div>

          {/* Sort Option */}
          <div className="relative group">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-zinc-900 border-2 border-zinc-800 text-white py-3 px-6 pr-12 focus:outline-none focus:border-lime-500 cursor-pointer text-sm font-bold italic uppercase tracking-wider hover:bg-zinc-800 transition-colors transform -skew-x-12"
            >
              <option value="">Sort By</option>
              <option value="price-low-high">Price: Low → High</option>
              <option value="price-high-low">Price: High → Low</option>
              <option value="name-az">Name: A–Z</option>
              <option value="name-za">Name: Z–A</option>
            </select>
            {/* Custom Chevron Icon for Select */}
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500 group-hover:text-lime-500 transition-colors">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-900/10 border border-red-900/30 max-w-2xl mx-auto transform -skew-x-12">
            <div className="transform skew-x-12">
              <p className="text-xl text-red-500 font-black italic uppercase mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 skew-x-[-6deg] max-w-2xl mx-auto">
            <div className="skew-x-[6deg]">
              <p className="text-2xl text-zinc-500 font-black italic uppercase">
                No gear found.
              </p>
              <button
                onClick={() => {
                  setSearchParams({ search: "" });
                  setFilter("All");
                }}
                className="mt-6 text-lime-500 font-bold uppercase tracking-widest hover:text-white hover:underline transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {products?.map((product) => {
              const inCart = (cart || []).some(
                (item) => item.productId?._id === product._id,
              );
              // const inWishlist = (wishlist || []).some(
              //   (item) => item.productId?._id === product._id,
              // );

              const inWishlist = (wishlist || []).some(
                (item) => item._id === product._id,
              );

              return (
                <div
                  key={product._id}
                  className="group bg-zinc-900 border border-zinc-800 p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:border-lime-500/50 hover:shadow-2xl hover:shadow-lime-500/10"
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-800 group-hover:bg-lime-500 transition-colors duration-300 clip-path-corner"></div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className={`absolute top-4 right-4 z-20 p-2 transform transition-all duration-300 ${
                      inWishlist
                        ? "text-red-500 scale-110"
                        : "text-zinc-600 hover:text-red-500"
                    }`}
                    title={
                      inWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                    }
                  >
                    <Heart
                      className={`w-6 h-6 ${inWishlist ? "fill-current" : ""}`}
                    />
                  </button>

                  {/* Product Image Area */}
                  <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-white border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                    <Link
                      to={`/product/${product._id}`}
                      className="block h-full w-full"
                    >
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                      />
                    </Link>
                    {/* Stock Badge Overlay */}
                    {product.countInStock === 0 && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-xs font-black italic uppercase px-4 py-2 transform -skew-x-12 tracking-widest border border-red-400">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-grow">
                    <p className="text-xs font-bold text-lime-500 uppercase tracking-widest mb-2">
                      {product.brand}
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className="group-hover:text-lime-400 transition-colors"
                    >
                      <h3 className="text-white font-black italic text-lg uppercase leading-tight line-clamp-2 mb-4 tracking-tight">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-auto pt-4 border-t border-zinc-800">
                      <div className="flex items-center justify-between mb-5">
                        <p className="text-2xl font-black italic text-white">
                          ₹{formatPrice(product.price)}
                        </p>
                        {product.countInStock > 0 && (
                          <span className="text-[10px] font-black uppercase text-zinc-950 bg-lime-500 px-2 py-1 transform -skew-x-12">
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Buttons Grid */}
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={inCart || product.countInStock === 0}
                          className={`px-4 py-3 font-black italic uppercase tracking-wider text-sm transition-all duration-300 transform -skew-x-12 flex items-center justify-center ${
                            inCart
                              ? "bg-zinc-800 text-green-500 border border-green-500/50 cursor-default"
                              : product.countInStock > 0
                              ? "bg-white text-zinc-950 hover:bg-lime-500 hover:text-black hover:scale-[1.02]"
                              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                          }`}
                        >
                          <span className="transform skew-x-12">
                            {inCart
                              ? "In Cart"
                              : product.countInStock > 0
                              ? "Add to Cart"
                              : "No Stock"}
                          </span>
                        </button>

                        <div
                          className={`transform -skew-x-12 ${
                            product.countInStock > 0 ? "block" : "hidden"
                          }`}
                        >
                          <Link
                            to={`/product/${product._id}`}
                            className="flex items-center justify-center h-full aspect-square bg-zinc-800 border border-zinc-700 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                            title="Buy Now"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 transform skew-x-12"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="w-full flex justify-center items-center gap-4 mt-20">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-8 py-3 font-black italic uppercase tracking-widest text-sm transform -skew-x-12 transition-all duration-300 border-2 ${
              currentPage === 1
                ? "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-zinc-900 border-zinc-700 text-white hover:border-lime-500 hover:text-lime-500"
            }`}
          >
            <span className="flex items-center transform skew-x-12">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Prev
            </span>
          </button>

          <span className="text-white font-black italic text-lg bg-zinc-900 px-6 py-3 border-2 border-zinc-800 transform -skew-x-12">
            <span className="transform skew-x-12">
              <span className="text-lime-500">{currentPage}</span>{" "}
              <span className="text-zinc-600 mx-1">/</span> {totalPages}
            </span>
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-8 py-3 font-black italic uppercase tracking-widest text-sm transform -skew-x-12 transition-all duration-300 border-2 ${
              currentPage === totalPages
                ? "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-zinc-900 border-zinc-700 text-white hover:border-lime-500 hover:text-lime-500"
            }`}
          >
            <span className="flex items-center transform skew-x-12">
              Next
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
