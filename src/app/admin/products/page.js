"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBox, FaSpinner } from "react-icons/fa";
import { deleteProduct, fetchProducts, saveProduct } from "@/lib/api";
import Image from "next/image";
import EditProductModal from "@/components/modals/EditProductModal";


export default function ManageProductsPage() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalType, setModalType] = useState('');
   const [currentProduct, setCurrentProduct] = useState(null);

   useEffect(() => {
      loadProducts();
   }, []);

   async function loadProducts() {
      try {
         setLoading(true);
         const data = await fetchProducts();
         setProducts(data);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   }

   function openModal(type, product = null) {
      setModalType(type);
      setCurrentProduct(product);
      setIsModalOpen(true);
   }

   function closeModal() {
      setIsModalOpen(false);
      setCurrentProduct(null);
   }

   async function handleDelete(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
         try {
            await deleteProduct(productId);
            setProducts(products.filter(product => product._id !== productId));
         } catch (err) {
            setError(err.message);
         }
      }
   }

   async function handleSave(product) {
      const method = modalType === 'edit' ? 'PUT' : 'POST';

      try {
         await saveProduct(product, method);
         await loadProducts();
         closeModal();
      } catch (err) {
         setError(err.message);
      }
   }

   if (loading) {
      return (
         <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-text-muted" />
         </div>
      );
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div className="p-4">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
               <FaBox className="mr-3" /> Manage Products
            </h2>
            <button
               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
               onClick={() => openModal('add')}
            >
               <FaPlus className="inline mr-2" /> Add Product
            </button>
         </div>
         <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 gap-6">
            {products.map((product) => (
               <div key={product._id} className="bg-gray-800 text-white p-4 rounded-lg flex flex-col justify-between shadow-lg">
                  <div className="relative h-60 w-full mb-4">
                     <Image
                        src={product.imageUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        priority
                     />
                  </div>
                  <h3 className="text-2xl font-bold text-nowrap mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-2 text-nowrap" >{product.category} - {product.brand}</p>
                  <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <div className="flex justify-between">
                     <button
                        className="text-blue-400 hover:text-blue-500"
                        onClick={() => openModal('edit', product)}
                     >
                        <FaEdit />
                     </button>
                     <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => handleDelete(product._id)}
                     >
                        <FaTrash />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {isModalOpen && (
            <EditProductModal
               isOpen={isModalOpen}
               onClose={closeModal}
               onSave={handleSave}
               product={currentProduct}
               modalType={modalType}
            />
         )}
      </div>
   );
}
