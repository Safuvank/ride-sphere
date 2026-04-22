import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

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
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/admin/products?page=${page}`);
      setProducts(res.data.products);
      setPages(res.data.pages);
    } catch (error) {
      // console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleAdd = async () => {
    const { name, description, category, price, brand, countInStock, images } =
      newProduct;
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !brand ||
      !countInStock ||
      !images
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const payload = {
        ...newProduct,
        images: [{ url: images }],
      };
      await api.post("/admin/products", payload);
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
      // console.error("Error adding product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!confirmDelete) return;

      await api.delete(`admin/products/${id}`);
      fetchProducts();
    } catch (error) {
      // console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (product) =>
    setEditItem({
      ...product,
      images: product.images?.[0]?.url || "",
    });

  const handleUpdate = async () => {
    try {
      const payload = {
        ...editItem,
        images: [{ url: editItem.images }],
      };
      await api.put(`admin/products/${editItem._id}`, payload);

      fetchProducts();
      setEditItem(null);
    } catch (error) {
      // console.error("Error updating product:", error);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Product Management
        </h1>
        <p className="text-gray-500 mt-1">Add, edit, and manage inventory.</p>
      </div>

      {/* Add Product Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">
          Add New Product
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
          {[
            { key: "name", label: "Name", type: "text" },
            { key: "description", label: "Description", type: "text" },
            { key: "category", label: "Category", type: "text" },
            { key: "brand", label: "Brand", type: "text" },
            { key: "price", label: "Price", type: "number" },
            { key: "countInStock", label: "Stock", type: "number" },
            { key: "images", label: "Image URL", type: "text" },
          ].map((field) => (
            <div key={field.key} className="w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                value={newProduct[field.key]}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, [field.key]: e.target.value })
                }
              />
            </div>
          ))}
          <div className="w-full xl:col-span-7 flex justify-end mt-2">
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors shadow-sm"
            >
              <FaPlus size={14} /> <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 hidden lg:table-cell">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500 font-medium">
                    No products found in inventory.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    {/* Image */}
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-md p-1 flex items-center justify-center">
                        <img
                          src={p.images?.[0]?.url}
                          alt={p.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-3 text-gray-900 font-medium">
                      {editItem?._id === p._id ? (
                        <input
                          type="text"
                          value={editItem.name}
                          onChange={(e) =>
                            setEditItem({ ...editItem, name: e.target.value })
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        <div className="max-w-[150px] truncate" title={p.name}>
                          {p.name}
                        </div>
                      )}
                    </td>

                    {/* Description (Hidden on smaller screens to save space) */}
                    <td className="px-6 py-3 text-gray-500 hidden lg:table-cell">
                      {editItem?._id === p._id ? (
                        <input
                          type="text"
                          value={editItem.description}
                          onChange={(e) =>
                            setEditItem({ ...editItem, description: e.target.value })
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        <div className="max-w-[200px] truncate" title={p.description}>
                          {p.description}
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-3 text-gray-600">
                      {editItem?._id === p._id ? (
                        <input
                          type="text"
                          value={editItem.category}
                          onChange={(e) =>
                            setEditItem({ ...editItem, category: e.target.value })
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        p.category
                      )}
                    </td>

                    {/* Brand */}
                    <td className="px-6 py-3 text-gray-600">
                      {editItem?._id === p._id ? (
                        <input
                          type="text"
                          value={editItem.brand}
                          onChange={(e) =>
                            setEditItem({ ...editItem, brand: e.target.value })
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        p.brand
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-3 text-gray-900 font-semibold">
                      {editItem?._id === p._id ? (
                        <input
                          type="number"
                          value={editItem.price}
                          onChange={(e) =>
                            setEditItem({ ...editItem, price: e.target.value })
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 w-24 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        `₹${Number(p.price).toLocaleString("en-IN")}`
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-3">
                      {editItem?._id === p._id ? (
                        <input
                          type="number"
                          value={editItem.countInStock}
                          onChange={(e) =>
                            setEditItem({ ...editItem, countInStock: e.target.value })
                          }
                          className="bg-white border border-blue-500 rounded px-2 py-1 w-20 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            p.countInStock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.countInStock > 0 ? p.countInStock : "Out of Stock"}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3 text-right space-x-2">
                      {editItem?._id === p._id ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className="inline-flex items-center justify-center text-green-600 hover:text-green-700 hover:bg-green-50 p-2 rounded-lg transition-colors"
                            title="Save"
                          >
                            <FaSave size={16} />
                          </button>
                          <button
                            onClick={() => setEditItem(null)}
                            className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <FaTimes size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(p)}
                            className="inline-flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="inline-flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => setPage(x + 1)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                page === x + 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}