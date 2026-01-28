import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { Heart } from "lucide-react";
import { AuthContext } from "../../AuthContext";

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");

  const {
    state: { cart, wishlist },
    dispatch,
  } = useContext(cartContext);

  const {user} = useContext(AuthContext)
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

  // ✅ Fetch products from JSON server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Format price (INR)
  const formatPrice = (price) => price.toLocaleString("en-IN");

  // ✅ Add to Cart handler
  const handleAddToCart = (product) => {

    if (!user) {
    navigate("/login");
    return;
  }

    const inCart = cart.some((item) => item.id === product.id);
    if (inCart) {
      alert("Product already in cart!");
      return;
    }
    if (product.stock > 0) {
      dispatch({ type: "AddToCart", payload: product });
      alert("Added to cart!");
    } else {
      alert("This product is out of stock!");
    }
  };

  const search = searchParams.get("search") || "";

  // ✅ Add / Remove from Wishlist handler
  const handleAddToWishlist = (product) => {

 if (!user) {
    navigate("/login");
    return;
  }

    const inWishlist = wishlist.some((item) => item.id === product.id);

    if (inWishlist) {
      dispatch({ type: "RemoveFromWishlist", payload: product.id });
      alert("Removed from wishlist!");
    } else {
      dispatch({ type: "AddToWishlist", payload: product });
      alert("Added to wishlist!");
    }
  };

  // Filtered Products
  let filteredProducts = products.filter(
    (product) =>
      (filter === "All" || product.category === filter) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOption === "price-low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-az") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOption === "name-za") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  // pagination

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    <div className="pt-20 min-h-screen bg-[#feffff] py-12 px-[7%]">
      {/* Search Bar */}
      <div className="flex justify-center mb-10 mt-5">
        <input
          type="text"
          placeholder="Search your favourite..."
          value={search}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          className="w-full md:w-1/2 px-5 py-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`cursor-pointer px-5 py-2 rounded-[10px] font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-red-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-red-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
        {/* {sort Option} */}

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-3 rounded-[10px] border-gray-50 bg-gray-800 text-white cursor-pointer"
        >
          <option value="">Sort By</option>
          <option value="price-low-high">Price: Low → High</option>
          <option value="price-high-low">Price: High → Low</option>
          <option value="name-az">Name: A–Z</option>
          <option value="name-za">Name: Z–A</option>
        </select>
      </div>

      {/* Products Section */}
      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading products...</p>
      ) : currentProducts.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No products match your search or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            const inWishlist = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 p-4 flex flex-col relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className={`absolute top-4 right-4 p-2 rounded-full border transition ${
                    inWishlist
                      ? "bg-red-500 text-white border-red-500"
                      : "hover:bg-gray-100 border-gray-300"
                  }`}
                  title={
                    inWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  <Heart
                    className={`w-6 h-6 ${
                      inWishlist ? "fill-current text-white" : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-contain rounded-xl mb-4"
                  />
                </Link>

                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <p className="text-lg font-bold text-red-500 mb-3">
                  ₹{formatPrice(product.price)}
                </p>

                {product.stock > 0 ? (
                  <p className="text-green-600 font-medium mb-3">
                    in Stock ({product.stock})
                  </p>
                ) : (
                  <p className="text-red-600 font-medium mb-3">Out of Stock</p>
                )}

                {/* Buttons */}
                <div className="mt-auto flex justify-between">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={inCart || product.stock === 0}
                    className={`px-4 py-2 rounded-[10px] transition cursor-pointer ${
                      inCart
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : product.stock > 0
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {inCart
                      ? "Added to Cart"
                      : product.stock > 0
                      ? "Add To Cart"
                      : "Out of Stock"}
                  </button>

                  <button className={product.stock > 0 ? "block" : "hidden"}>
                    <Link
                      to={`/product/${product.id}`}
                      className="border border-red-500 text-red-500 px-4 py-2 rounded-[10px] hover:bg-red-500 hover:text-white transition"
                    >
                      Buy Now
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* // pagination controls */}
      <div className="w-full flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-[10px] ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-[10px] ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
