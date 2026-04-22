import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { AuthContext } from "../../AuthContext";
import api from "../../../../api/api";
import {
  ShoppingCart,
  Check,
  X,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

export default function ProductDetails() {
  const {
    state: { cart },
    dispatch,
  } = useContext(cartContext);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setError("Product not found or server error.");
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-red-50 text-red-600 border border-red-200 px-8 py-6 rounded-xl shadow-sm text-center max-w-md">
          <p className="font-medium text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Find this product in the cart (only after product is loaded)
  // const cartItem = cart.find((item) => item.productId?._id === product._id);
  const cartItem = cart?.find((item) => item.productId?._id === product._id);

  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const inCart = !!cartItem;

  
  
  const handleAddToCart = async () => {
  if (!user) {
    console.log("User not logged in");
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
    // console.error("Error:", error);
  }
};

  const handleIncrease = async () => {
    try {
      const newQuantity = cartQuantity + 1;

      const res = await api.put("/cart", {
        productId: product._id,
        quantity: newQuantity,
      });

      dispatch({ type: "SetCart", payload: res.data });
    } catch (error) {
      // console.error(error);
    }
  };

  const handleDecrease = async () => {
    try {
      const newQuantity = cartQuantity - 1;

      if (newQuantity <= 0) {
        const res = await api.delete("/cart", {
          data: { productId: product._id },
        });

        dispatch({ type: "SetCart", payload: res.data });
      } else {
        const res = await api.put("/cart", {
          productId: product._id,
          quantity: newQuantity,
        });

        dispatch({ type: "SetCart", payload: res.data });
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Product Image Section */}
          <div className="w-full relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 flex items-center justify-center min-h-[400px]">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />

            {/* Stock Badge Overlay */}
            {product.countInStock === 0 && (
              <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-semibold px-4 py-1.5 rounded-md shadow-sm">
                Out of Stock
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col h-full pt-2 md:pt-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4">
              <span className="cursor-pointer hover:text-gray-900 transition-colors">
                Products
              </span>
              <ChevronRight size={16} />
              <span className="text-blue-600">{product.brand}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price & Stock Row */}
            <div className="flex flex-wrap items-center gap-6 mb-8 border-b border-gray-200 pb-6">
              <p className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              {product.countInStock > 0 ? (
                <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-100">
                  <Check size={16} />
                  <span>In Stock ({product.countInStock})</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-100">
                  <X size={16} />
                  <span>Unavailable</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Actions Area */}
            <div className="mt-auto">
              {!inCart ? (
                /* Add to Cart Button */
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-lg transition-all duration-200 ${
                    product.countInStock === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow"
                  }`}
                >
                  <ShoppingCart size={20} />
                  {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              ) : (
                /* Quantity Controls (When in Cart) */
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                    <button
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                      onClick={handleDecrease}
                      disabled={cartQuantity <= 0}
                    >
                      <Minus size={18} />
                    </button>

                    <span className="w-12 text-center font-semibold text-gray-900 text-lg">
                      {cartQuantity}
                    </span>

                    <button
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                      onClick={handleIncrease}
                      disabled={cartQuantity >= product.countInStock}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-green-600 font-medium px-4 py-2.5 bg-green-50 rounded-xl border border-green-100">
                    <Check size={20} />
                    Item in Cart
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}