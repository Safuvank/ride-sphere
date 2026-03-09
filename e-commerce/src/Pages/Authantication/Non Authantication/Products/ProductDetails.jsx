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
      <div className="min-h-screen flex justify-center items-center bg-zinc-950 text-red-500 font-black italic uppercase text-xl tracking-widest">
        <div className="border-2 border-red-600 p-8 transform -skew-x-12">
          <span className="transform skew-x-12 block">{error}</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
      </div>
    );
  }

  // Find this product in the cart (only after product is loaded)
  // const cartItem = cart.find((item) => item._id === product._id);
  //   const cartItem = cart.find(
  //   (item) => item.productId === product._id
  // );
  const cartItem = cart.find((item) => item.productId?._id === product._id);

  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const inCart = !!cartItem;

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      dispatch({ type: "SetCart", payload: res.data.products });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // // ✅ Quantity controls (safe and stock-limited)
  // const handleIncrease = (id) => {
  //   if (cartQuantity < product.countInStock) {
  //     dispatch({ type: "IncreaseQuantity", payload: product._id });
  //   } else {
  //     alert("Cannot add more than available stock!");
  //   }
  // };

  const handleIncrease = async () => {
    try {
      const newQuantity = cartQuantity + 1;

      const res = await api.put("/cart", {
        productId: product._id,
        quantity: newQuantity,
      });

      dispatch({ type: "SetCart", payload: res.data.products });
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDecrease = () => {
  //   if (cartQuantity > 1) {
  //     dispatch({ type: "DecreaseQuantity", payload: product._id });
  //   } else {
  //     // Optional: remove from cart if quantity becomes 0
  //     dispatch({ type: "RemoveFromCart", payload: product._id });
  //   }
  // };

  const handleDecrease = async () => {
    try {
      const newQuantity = cartQuantity - 1;

      if (newQuantity <= 0) {
        const res = await api.delete("/cart", {
          data: { productId: product._id },
        });

        dispatch({ type: "SetCart", payload: res.data.products });
      } else {
        const res = await api.put("/cart", {
          productId: product._id,
          quantity: newQuantity,
        });

        dispatch({ type: "SetCart", payload: res.data.products });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-32 pb-20 px-[5%] bg-zinc-950 min-h-screen text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-lime-500/5 blur-[100px] rounded-full" />
        <div className="absolute top-0 left-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start relative z-10 max-w-7xl mx-auto">
        {/* Product Image Section */}
        <div className="w-full relative group">
          {/* Skewed Frame */}
          <div className="absolute inset-0 bg-zinc-900 border-2 border-zinc-800 transform -skew-x-6 translate-x-4 translate-y-4 z-0 group-hover:border-lime-500/50 transition-colors duration-500" />

          <div className="relative z-10 bg-white border border-zinc-800 p-8 transform -skew-x-6 overflow-hidden">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-lime-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-lime-500" />

            {/* Image - Counter-skewed to appear normal inside skewed frame */}
            <div className="transform skew-x-6">
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full max-h-[500px] object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Stock Badge Overlay */}
            {product.countInStock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                <span className="bg-red-600 text-white font-black italic uppercase text-2xl px-8 py-3 transform skew-x-6 border-2 border-white">
                  Sold Out
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col h-full pt-4">
          {/* Breadcrumb-ish Brand */}
          <div className="flex items-center gap-2 text-lime-500 font-bold uppercase tracking-widest text-sm mb-4">
            <span>Gear</span>
            <ChevronRight size={14} />
            <span>{product.brand}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-tighter mb-4 leading-none">
            {product.name}
          </h1>

          {/* Price & Stock Row */}
          <div className="flex items-center gap-6 mb-8 border-b border-zinc-800 pb-6">
            <p className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {product.countInStock > 0 ? (
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-1 transform -skew-x-12">
                <Check
                  size={16}
                  className="text-lime-500 transform skew-x-12"
                />
                <span className="text-lime-500 font-bold uppercase text-xs tracking-wider transform skew-x-12">
                  In Stock ({product.countInStock})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-zinc-900 border border-red-900 px-4 py-1 transform -skew-x-12">
                <X size={16} className="text-red-600 transform skew-x-12" />
                <span className="text-red-600 font-bold uppercase text-xs tracking-wider transform skew-x-12">
                  Unavailable
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-zinc-500 font-bold uppercase text-xs tracking-widest mb-3">
              Specs & Details
            </h3>
            <p className="text-zinc-300 leading-relaxed font-medium text-lg border-l-4 border-lime-500 pl-6">
              {product.description}
            </p>
          </div>

          {/* Actions Area */}
          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-6">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0 || inCart}
                className={`group relative px-10 py-4 transform -skew-x-12 transition-all duration-300 ${
                  product.countInStock === 0
                    ? "bg-zinc-800 border border-zinc-700 cursor-not-allowed opacity-50"
                    : inCart
                    ? "bg-zinc-900 border-2 border-lime-500 cursor-default"
                    : "bg-lime-500 hover:bg-white hover:shadow-[0_0_20px_rgba(132,204,22,0.5)]"
                }`}
              >
                <div className="flex items-center justify-center gap-3 transform skew-x-12">
                  {inCart ? (
                    <>
                      <span className="font-black italic uppercase tracking-widest text-lime-500">
                        In Cart
                      </span>
                      <Check className="text-lime-500" />
                    </>
                  ) : (
                    <>
                      <span
                        className={`font-black italic uppercase tracking-widest ${
                          product.countInStock === 0
                            ? "text-zinc-500"
                            : "text-zinc-950"
                        }`}
                      >
                        {product.countInStock === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </span>
                      {product.countInStock > 0 && (
                        <ShoppingCart className="text-zinc-950 w-5 h-5" />
                      )}
                    </>
                  )}
                </div>
              </button>

              {/* Quantity Controls */}
              {inCart && (
                <div className="flex items-center bg-zinc-900 border border-zinc-700 p-1 transform -skew-x-12">
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-red-600 text-white transition-colors disabled:opacity-30 disabled:hover:bg-zinc-800"
                    onClick={() => handleDecrease(product._id)}
                    disabled={cartQuantity <= 0}
                  >
                    <Minus size={16} className="transform skew-x-12" />
                  </button>

                  <span className="w-12 text-center font-black italic text-xl transform skew-x-12 text-white">
                    {cartQuantity}
                  </span>

                  <button
                    className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-lime-500 hover:text-black text-white transition-colors disabled:opacity-30 disabled:hover:bg-zinc-800"
                    onClick={() => handleIncrease(product._id)}
                    disabled={cartQuantity >= product.countInStock}
                  >
                    <Plus size={16} className="transform skew-x-12" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
