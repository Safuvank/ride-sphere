import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../../../../Common/Context/ProviderComp";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const {
    state: { cart },
    dispatch,
  } = useContext(cartContext);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

   const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  // ✅ Fetch product from API
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setError("Product not found or server error.");
      });
  }, [id]);

  // ✅ Show loading or error
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  // ✅ Find this product in the cart (only after product is loaded)
  const cartItem = cart.find((c) => c.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const inCart = !!cartItem;

  // ✅ Add to Cart handler
  const handleAddToCart = () => {

    if (!user) {
    navigate("/login");
    return;
  }

    if (inCart) {
      alert("Product is already in your cart!");
    } else {
      dispatch({ type: "AddToCart", payload: { ...product, quantity: 1 } });
      alert("Added to cart successfully!");
    }
  };

  // ✅ Quantity controls (safe and stock-limited)
  const handleIncrease = (id) => {
    if (cartQuantity < product.stock) {
      dispatch({ type: "IncreaseQuantity", payload: id });
    } else {
      alert("Cannot add more than available stock!");
    }
  };

  const handleDecrease = (id) => {
    if (cartQuantity > 1) {
      dispatch({ type: "DecreaseQuantity", payload: id });
    } else {
      // Optional: remove from cart if quantity becomes 0
      dispatch({ type: "RemoveFromCart", payload: id });
    }
  };

  return (
    <div className="pt-30 px-[10%] bg-white min-h-screen">
      <div className="grid md:grid-cols-2 gap-10 items-center p-5 bg-white">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] object-cover rounded-3xl shadow-md p-5"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-lg text-gray-500 mb-1">{product.brand}</p>
          <p className="text-2xl font-semibold text-red-600 mb-3">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {/* Stock Info */}
          {product.stock > 0 ? (
            <p className="text-green-600 font-medium mb-3">
              In Stock ({product.stock})
            </p>
          ) : (
            <p className="text-red-600 font-medium mb-3">Out of Stock</p>
          )}

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mb-20">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || inCart}
              className={`px-8 py-3 rounded-[10px] cursor-pointer text-lg font-semibold transition ${
                product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : inCart
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {inCart ? "In Cart" : "Add to Cart"}
            </button>

            {/* {quantity} */}

            {inCart && (
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => handleDecrease(product.id)}
                  disabled={cartQuantity <= 0}
                >
                  -
                </button>
                <span className="px-3 font-medium">{cartQuantity}</span>

                <button
                  className="px-3 py-1 bg-gray-200 rounded-full hover:gb-gray-300"
                  onClick={() => handleIncrease(product.id)}
                  disabled={cartQuantity >= product.stock}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
