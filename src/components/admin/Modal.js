import { useState, useEffect } from 'react';

export default function Modal({ isOpen, onClose, onSave, product, modalType }) {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [price, setPrice] = useState('');
   const [imageUrl, setImageUrl] = useState('');
   const [category, setCategory] = useState('');
   const [brand, setBrand] = useState('');
   const [features, setFeatures] = useState('');
   const [specifications, setSpecifications] = useState({
      weight: '',
      dimensions: '',
      brand: '',
      model: '',
   });

   useEffect(() => {
      if (modalType === 'edit' && product) {
         setName(product.name);
         setDescription(product.description);
         setPrice(product.price);
         setImageUrl(product.imageUrl);
         setCategory(product.category);
         setBrand(product.brand);
         setFeatures(product.features.join(', '));
         setSpecifications(product.specifications);
      } else {
         resetForm();
      }
   }, [product, modalType]);

   function resetForm() {
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setCategory('');
      setBrand('');
      setFeatures('');
      setSpecifications({
         weight: '',
         dimensions: '',
         brand: '',
         model: '',
      });
   }

   function handleSubmit(e) {
      e.preventDefault();

      const updatedProduct = {
         name,
         description,
         price: parseFloat(price),
         imageUrl,
         category,
         brand,
         features: features.split(',').map((feature) => feature.trim()),
         specifications,
      };
      onSave(updatedProduct);
   }

   function handleSpecificationsChange(e) {
      setSpecifications({
         ...specifications,
         [e.target.name]: e.target.value,
      });
   }

   return (
      <div onClick={onClose} className={`fixed cursor-pointer inset-0 bg-black z-30 bg-opacity-75 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
         <div  onClick={(e) => e.stopPropagation()}className="bg-background-light relative p-8 rounded-lg w-full max-w-2xl mx-4 md:mx-auto shadow-lg overflow-y-auto lg:max-h-full max-h-96">
            <h2 className="text-3xl font-bold mb-6 text-text-dark">
               {modalType === 'edit' ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                     <label className="block text-text-muted mb-2">Product Name</label>
                     <input
                        type="text"
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>
                  <div className="col-span-1">
                     <label className="block text-text-muted mb-2">Price</label>
                     <input
                        type="number"
                        step="0.01"
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                     />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-text-muted mb-2">Image URL</label>
                     <input
                        type="text"
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                     />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-text-muted mb-2">Description</label>
                     <textarea
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                     />
                  </div>
                  <div className="col-span-1">
                     <label className="block text-text-muted mb-2">Category</label>
                     <input
                        type="text"
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                     />
                  </div>
                  <div className="col-span-1">
                     <label className="block text-text-muted mb-2">Brand</label>
                     <input
                        type="text"
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                     />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <label className="block text-text-muted mb-2">Features (comma separated)</label>
                     <input
                        type="text"
                        className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                     />
                  </div>
               </div>

               <div className="mt-6">
                  <h3 className="text-lg font-semibold text-text-dark mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="col-span-1">
                        <label className="block text-text-muted mb-2">Weight</label>
                        <input
                           type="text"
                           className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                           name="weight"
                           value={specifications.weight}
                           onChange={handleSpecificationsChange}
                        />
                     </div>
                     <div className="col-span-1">
                        <label className="block text-text-muted mb-2">Dimensions</label>
                        <input
                           type="text"
                           className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                           name="dimensions"
                           value={specifications.dimensions}
                           onChange={handleSpecificationsChange}
                        />
                     </div>
                     <div className="col-span-1">
                        <label className="block text-text-muted mb-2">Brand</label>
                        <input
                           type="text"
                           className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                           name="brand"
                           value={specifications.brand}
                           onChange={handleSpecificationsChange}
                        />
                     </div>
                     <div className="col-span-1">
                        <label className="block text-text-muted mb-2">Model</label>
                        <input
                           type="text"
                           className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                           name="model"
                           value={specifications.model}
                           onChange={handleSpecificationsChange}
                        />
                     </div>
                  </div>
               </div>

               <div className="flex justify-end space-x-4 mt-8">
                  <button
                     type="button"
                     className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                     onClick={onClose}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary"
                  >
                     {modalType === 'edit' ? 'Save Changes' : 'Add Product'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
