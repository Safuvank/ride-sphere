



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

  // Fetch products from server
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
            "Received HTML from API. Backend might be down or URL is incorrect."
          );
        }

        const { data } = response;
        // console.log("API response:", data);

        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        // console.error("Error fetching products:", err);
        setError(
          err.message || "Failed to load products. Please check your connection."
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
      // console.error("Error adding to cart", error);
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
      // console.error(error);
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <input
            type="text"
            placeholder="Search for bicycles..."
            value={search}
            onChange={(e) => setSearchParams({ search: e.target.value })}
            className="w-full pl-5 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-gray-200 pb-6">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  filter === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Option */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-sm font-medium shadow-sm"
            >
              <option value="">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 border border-red-100 rounded-xl max-w-2xl mx-auto">
            <p className="text-lg text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-xl shadow-sm max-w-2xl mx-auto">
            <p className="text-xl text-gray-500 font-medium mb-2">No products found.</p>
            <button
              onClick={() => {
                setSearchParams({ search: "" });
                setFilter("All");
              }}
              className="mt-2 text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
            >
              Clear filters and search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => {
              const inCart = (cart || []).some(
                (item) => item.productId?._id === product._id
              );
              const inWishlist = (wishlist || []).some(
                (item) => item._id === product._id
              );

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col relative transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-transform hover:scale-110"
                    title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        inWishlist ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                    <Link to={`/product/${product._id}`} className="block h-full w-full">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    {/* Stock Badge Overlay */}
                    {product.countInStock === 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {product.brand}
                    </p>
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-gray-900 font-semibold text-lg leading-tight line-clamp-2 mb-3 hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-end justify-between mb-4">
                        <p className="text-xl font-bold text-gray-900">
                          ₹{formatPrice(product.price)}
                        </p>
                      </div>

                      {/* Buttons */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={inCart || product.countInStock === 0}
                        className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center ${
                          inCart
                            ? "bg-gray-100 text-gray-500 cursor-default"
                            : product.countInStock > 0
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {inCart
                          ? "Added to Cart"
                          : product.countInStock > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && products?.length > 0 && (
          <div className="w-full flex justify-center items-center gap-3 mt-16">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border ${
                currentPage === 1
                  ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg">
              Page <span className="text-blue-600">{currentPage}</span> of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border ${
                currentPage === totalPages
                  ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Next
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}