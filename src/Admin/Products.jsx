import React, { useEffect, useState } from "react";
import axios from "axios";


export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    brand: "",
    stock: "",
    image: "",
  });
  const [editItem, setEditItem] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const handleAdd = async () => {
    const { name, category, price, brand, stock, image } = newProduct;
    if (!name || !category || !price || !brand || !stock || !image) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/products", newProduct);
      setProducts([...products, res.data]);
      setNewProduct({
        name: "",
        category: "",
        price: "",
        brand: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
  try {
    // ✅ Show confirmation alert before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return; // user cancelled

    await axios.delete(`http://localhost:5000/products/${id}`);

    // ✅ Update state after deletion
    setProducts(products.filter((p) => p.id !== id));

    // ✅ Show success message
    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product. Please try again.");
  }
};

  // Edit & Save product
  const handleEdit = (product) => setEditItem(product);
  const handleUpdate = async () => {
    try {
      await axios.put(`${"http://localhost:5000/products"}/${editItem.id}`, editItem);
      setProducts(products.map((p) => (p.id === editItem.id ? editItem : p)));
      setEditItem(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h3 className="text-2xl mb-4 font-bold ">Add New Products</h3>
      {/* Add Product Form */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["name", "category", "brand", "price", "stock", "image"].map(
          (field) => (
            <input
              key={field}
              type={field === "price" || field === "stock" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border rounded px-3 py-2 w-40"
              value={newProduct[field]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [field]: e.target.value })
              }
            />
          )
        )}
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Brand</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                </td>
                <td className="border p-2">
                  {editItem?.id === p.id ? (
                    <input
                      type="text"
                      value={editItem.name}
                      onChange={(e) =>
                        setEditItem({ ...editItem, name: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td className="border p-2">
                  {editItem?.id === p.id ? (
                    <input
                      type="text"
                      value={editItem.category}
                      onChange={(e) =>
                        setEditItem({ ...editItem, category: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.category
                  )}
                </td>
                <td className="border p-2">
                  {editItem?.id === p.id ? (
                    <input
                      type="text"
                      value={editItem.brand}
                      onChange={(e) =>
                        setEditItem({ ...editItem, brand: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.brand
                  )}
                </td>
                <td className="border p-2">
                  {editItem?.id === p.id ? (
                    <input
                      type="number"
                      value={editItem.price}
                      onChange={(e) =>
                        setEditItem({ ...editItem, price: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    `₹${p.price}`
                  )}
                </td>
                <td className="border p-2">
                  {editItem?.id === p.id ? (
                    <input
                      type="number"
                      value={editItem.stock}
                      onChange={(e) =>
                        setEditItem({ ...editItem, stock: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.stock
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editItem?.id === p.id ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
