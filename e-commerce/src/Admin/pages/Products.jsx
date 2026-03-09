import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    brand: "",
    countInStock: "",
    images: "",
  });
  const [editItem, setEditItem] = useState(null);

  
  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
      console.log("Products API:", res.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleAdd = async () => {
    const { name,description, category, price, brand, countInStock, images } = newProduct;
    if (!name || !description || !category || !price || !brand || !countInStock || !images) {
      alert("Please fill all fields");
      return;
    }
    try {
      const payload = {
        ...newProduct,
        images: [{url: images}]
      }
      await api.post("/admin/products",payload)
      // const res = await api.post("admin/products", newProduct);
      fetchProducts();

      setNewProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        brand: "",
        countInStock: "",
        images: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?",
      );

      if (!confirmDelete) return;

      await api.delete(`admin/products/${id}`);
      fetchProducts();

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (product) => setEditItem({
    ...product,
    images: product.images?.[0]?.url || "",
  })

  const handleUpdate = async () => {
    try {
      const payload = {
        ...editItem,
        images: [{url: editItem.images}]
      }
      await api.put(`admin/products/${editItem._id}`, payload);

      fetchProducts();

      setEditItem(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-4">
        <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
          Manage <span className="text-lime-500">Gear</span>
        </h1>
      </div>

      {/* Add Product Form */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-10 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 to-transparent" />
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
          Deploy New Asset
        </h3>

        <div className="flex flex-wrap items-end gap-4">
          {["name", "description", "category", "brand", "price", "countInStock", "images"].map(
            (field) => (
              <div key={field} className="flex-grow min-w-[150px]">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  {field}
                </label>
                <input
                  type={
                    field === "price" || field === "countInstock" ? "number" : "text"
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-700 px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all font-medium italic"
                  value={newProduct[field]}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, [field]: e.target.value })
                  }
                />
              </div>
            ),
          )}
          <button
            onClick={handleAdd}
            className="group relative px-8 py-2 bg-lime-500 text-zinc-950 font-black italic uppercase tracking-widest transform -skew-x-12 hover:bg-white transition-colors duration-300 h-[42px] flex items-center justify-center"
          >
            <span className="transform skew-x-12 flex items-center gap-2">
              <FaPlus /> Add
            </span>
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto shadow-2xl">
        <table className="w-full border-collapse text-sm text-left">
          <thead className="bg-zinc-950 border-b-2 border-zinc-800">
            <tr>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                ID
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Image
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Name
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Description
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Category
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Brand
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Price
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Stock
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {products.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="p-4 font-mono text-zinc-500 text-xs">{p._id}</td>
                <td className="p-4">
                  <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 p-1 transform -skew-x-6">
                    <img
                      src={p.images?.[0]?.url}
                      alt={p.name}
                      className="w-full h-full object-contain transform skew-x-6"
                    />
                  </div>
                </td>
                <td className="p-4 font-bold text-white">
                  {editItem?._id === p._id ? (
                    <input
                      type="text"
                      value={editItem.name}
                      onChange={(e) =>
                        setEditItem({ ...editItem, name: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-full focus:outline-none italic"
                    />
                  ) : (
                    p.name
                  )} 
                </td>

                <td className="p-4 text-zinc-400 uppercase tracking-wider text-xs font-bold">
                  {editItem?._id === p._id ? (
                    <input
                      type="text"
                      value={editItem.description}
                      onChange={(e) =>
                        setEditItem({ ...editItem, description: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-full focus:outline-none italic"
                    />
                  ) : (
                    p.description
                  )}
                </td>

                <td className="p-4 text-zinc-400 uppercase tracking-wider text-xs font-bold">
                  {editItem?._id === p._id ? (
                    <input
                      type="text"
                      value={editItem.category}
                      onChange={(e) =>
                        setEditItem({ ...editItem, category: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-full focus:outline-none italic"
                    />
                  ) : (
                    p.category
                  )}
                </td>
                <td className="p-4 text-zinc-400 uppercase tracking-wider text-xs font-bold">
                  {editItem?._id === p._id ? (
                    <input
                      type="text"
                      value={editItem.brand}
                      onChange={(e) =>
                        setEditItem({ ...editItem, brand: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-full focus:outline-none italic"
                    />
                  ) : (
                    p.brand
                  )}
                </td>
                <td className="p-4 font-black italic text-lime-500">
                  {editItem?._id === p._id ? (
                    <input
                      type="number"
                      value={editItem.price}
                      onChange={(e) =>
                        setEditItem({ ...editItem, price: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-24 focus:outline-none italic"
                    />
                  ) : (
                    `₹${Number(p.price).toLocaleString()}`
                  )}
                </td>
                <td className="p-4">
                  {editItem?._id === p._id ? (
                    <input
                      type="number"
                      value={editItem.countInStock}
                      onChange={(e) =>
                        setEditItem({ ...editItem, countInStock: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-20 focus:outline-none italic"
                    />
                  ) : (
                    <span
                      className={`px-2 py-1 text-xs font-black uppercase transform -skew-x-6 inline-block ${
                        p.countInStock > 0
                          ? "bg-zinc-800 text-white"
                          : "bg-red-900/30 text-red-500"
                      }`}
                    >
                      {p.countInStock}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right space-x-3">
                  {editItem?._id === p._id ? (
                    <button
                      onClick={handleUpdate}
                      className="inline-flex items-center justify-center bg-lime-500 text-zinc-950 p-2 transform -skew-x-12 hover:bg-white transition-colors"
                      title="Save"
                    >
                      <FaSave className="transform skew-x-12" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(p)}
                      className="inline-flex items-center justify-center bg-zinc-800 text-zinc-400 p-2 transform -skew-x-12 hover:bg-lime-500 hover:text-black transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="transform skew-x-12" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="inline-flex items-center justify-center bg-zinc-800 text-zinc-400 p-2 transform -skew-x-12 hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="transform skew-x-12" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-12 text-zinc-600 font-black italic uppercase tracking-widest text-lg"
                >
                  No Gear Available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
