// import React, { useEffect, useState } from "react";
// import api from "../../api/api";


// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     price: "",
//     brand: "",
//     stock: "",
//     image: "",
//   });
//   const [editItem, setEditItem] = useState(null);

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Add product
//   const handleAdd = async () => {
//     const { name, category, price, brand, stock, image } = newProduct;
//     if (!name || !category || !price || !brand || !stock || !image) {
//       alert("Please fill all fields");
//       return;
//     }
//     try {
//       const res = await api.post("/products", newProduct);
//       setProducts([...products, res.data]);
//       setNewProduct({
//         name: "",
//         category: "",
//         price: "",
//         brand: "",
//         stock: "",
//         image: "",
//       });
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//   try {
//     // ✅ Show confirmation alert before deleting
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");

//     if (!confirmDelete) return; // user cancelled

//     await api.delete(`/products/${id}`);

//     // ✅ Update state after deletion
//     setProducts(products.filter((p) => p.id !== id));

//     // ✅ Show success message
//     alert("Product deleted successfully!");
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     alert("Failed to delete product. Please try again.");
//   }
// };

//   // Edit & Save product
//   const handleEdit = (product) => setEditItem(product);
//   const handleUpdate = async () => {
//     try {
//       await api.put(`${"/products"}/${editItem.id}`, editItem);
//       setProducts(products.map((p) => (p.id === editItem.id ? editItem : p)));
//       setEditItem(null);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-2xl mb-4 font-bold ">Add New Products</h3>
//       {/* Add Product Form */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         {["name", "category", "brand", "price", "stock", "image"].map(
//           (field) => (
//             <input
//               key={field}
//               type={field === "price" || field === "stock" ? "number" : "text"}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               className="border rounded px-3 py-2 w-40"
//               value={newProduct[field]}
//               onChange={(e) =>
//                 setNewProduct({ ...newProduct, [field]: e.target.value })
//               }
//             />
//           )
//         )}
//         <button
//           onClick={handleAdd}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Add
//         </button>
//       </div>

//       {/* Product Table */}
//       <div className="overflow-x-auto bg-white rounded shadow-md">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="border p-2 text-left">ID</th>
//               <th className="border p-2 text-left">Image</th>
//               <th className="border p-2 text-left">Name</th>
//               <th className="border p-2 text-left">Category</th>
//               <th className="border p-2 text-left">Brand</th>
//               <th className="border p-2 text-left">Price</th>
//               <th className="border p-2 text-left">Stock</th>
//               <th className="border p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} className="border-t hover:bg-gray-50">
//                 <td className="border p-2">{p.id}</td>
//                 <td className="border p-2">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="w-12 h-12 object-contain rounded"
//                   />
//                 </td>
//                 <td className="border p-2">
//                   {editItem?.id === p.id ? (
//                     <input
//                       type="text"
//                       value={editItem.name}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, name: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full"
//                     />
//                   ) : (
//                     p.name
//                   )}
//                 </td>
//                 <td className="border p-2">
//                   {editItem?.id === p.id ? (
//                     <input
//                       type="text"
//                       value={editItem.category}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, category: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full"
//                     />
//                   ) : (
//                     p.category
//                   )}
//                 </td>
//                 <td className="border p-2">
//                   {editItem?.id === p.id ? (
//                     <input
//                       type="text"
//                       value={editItem.brand}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, brand: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full"
//                     />
//                   ) : (
//                     p.brand
//                   )}
//                 </td>
//                 <td className="border p-2">
//                   {editItem?.id === p.id ? (
//                     <input
//                       type="number"
//                       value={editItem.price}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, price: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full"
//                     />
//                   ) : (
//                     `₹${p.price}`
//                   )}
//                 </td>
//                 <td className="border p-2">
//                   {editItem?.id === p.id ? (
//                     <input
//                       type="number"
//                       value={editItem.stock}
//                       onChange={(e) =>
//                         setEditItem({ ...editItem, stock: e.target.value })
//                       }
//                       className="border px-2 py-1 w-full"
//                     />
//                   ) : (
//                     p.stock
//                   )}
//                 </td>
//                 <td className="border p-2 space-x-2">
//                   {editItem?.id === p.id ? (
//                     <button
//                       onClick={handleUpdate}
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDelete(p.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && (
//               <tr>
//                 <td colSpan="8" className="text-center p-4 text-gray-500">
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";

export default function Products() {
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
      const res = await api.get("/products");
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
      const res = await api.post("/products", newProduct);
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

      await api.delete(`/products/${id}`);

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
      await api.put(`${"/products"}/${editItem.id}`, editItem);
      setProducts(products.map((p) => (p.id === editItem.id ? editItem : p)));
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
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Deploy New Asset</h3>
        
        <div className="flex flex-wrap items-end gap-4">
          {["name", "category", "brand", "price", "stock", "image"].map(
            (field) => (
              <div key={field} className="flex-grow min-w-[150px]">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                      {field}
                  </label>
                  <input
                    type={field === "price" || field === "stock" ? "number" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-700 px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all font-medium italic"
                    value={newProduct[field]}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, [field]: e.target.value })
                    }
                  />
              </div>
            )
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
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">ID</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Image</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Name</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Category</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Brand</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Price</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Stock</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="p-4 font-mono text-zinc-500 text-xs">{p.id}</td>
                <td className="p-4">
                  <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 p-1 transform -skew-x-6">
                    <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain transform skew-x-6"
                    />
                  </div>
                </td>
                <td className="p-4 font-bold text-white">
                  {editItem?.id === p.id ? (
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
                  {editItem?.id === p.id ? (
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
                  {editItem?.id === p.id ? (
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
                  {editItem?.id === p.id ? (
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
                  {editItem?.id === p.id ? (
                    <input
                      type="number"
                      value={editItem.stock}
                      onChange={(e) =>
                        setEditItem({ ...editItem, stock: e.target.value })
                      }
                      className="bg-zinc-950 border border-lime-500 text-lime-400 px-3 py-1 w-20 focus:outline-none italic"
                    />
                  ) : (
                    <span className={`px-2 py-1 text-xs font-black uppercase transform -skew-x-6 inline-block ${p.stock > 0 ? 'bg-zinc-800 text-white' : 'bg-red-900/30 text-red-500'}`}>
                        {p.stock}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right space-x-3">
                  {editItem?.id === p.id ? (
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
                    onClick={() => handleDelete(p.id)}
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
                <td colSpan="8" className="text-center p-12 text-zinc-600 font-black italic uppercase tracking-widest text-lg">
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