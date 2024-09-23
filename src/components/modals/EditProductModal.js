import { useState, useEffect } from 'react';
import Modal from './Modal';

export default function EditProductModal({ isOpen, onClose, onSave, product, modalType }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    brand: '',
    features: '',
    specifications: {
      weight: '',
      dimensions: '',
      brand: '',
      model: '',
    },
    totalQuantity: '',
    availableQuantity: '',
  });

  useEffect(() => {
    if (modalType === 'edit' && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        imageUrl: product.imageUrl || '',
        category: product.category || '',
        brand: product.brand || '',
        features: (product.features || []).join(', '),
        specifications: product.specifications || {
          weight: '',
          dimensions: '',
          brand: '',
          model: '',
        },
        totalQuantity: product.totalQuantity || '',
        availableQuantity: product.availableQuantity || '',
      });
    } else {
      resetForm();
    }
  }, [product, modalType]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: '',
      brand: '',
      features: '',
      specifications: {
        weight: '',
        dimensions: '',
        brand: '',
        model: '',
      },
      totalQuantity: '',
      availableQuantity: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSpecificationsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      _id: product && product._id,
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.split(',').map((feature) => feature.trim()),
      totalQuantity: parseInt(formData.totalQuantity),
      availableQuantity: parseInt(formData.availableQuantity),
    };

    onSave(updatedProduct);
  };

return (
  <Modal width='sm:w-1/2 w-full' onClose={onClose} isOpen={isOpen}>
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-background-light relative rounded-lg overflow-y-auto max-h-screen py-3 sm:px-8 transition-all ease-out duration-300"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-text-dark text-center">
        {modalType === 'edit' ? 'Edit Product' : 'Add Product'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Price", name: "price", type: "number", step: "0.01" },
            { label: "Total Quantity", name: "totalQuantity", type: "number" },
            { label: "Available Quantity", name: "availableQuantity", type: "number" },
            { label: "Image URL", name: "imageUrl", type: "text" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Category", name: "category", type: "text" },
            { label: "Brand", name: "brand", type: "text" },
            { label: "Features (comma separated)", name: "features", type: "text" },
          ].map(({ label, name, type, step }, idx) => (
            <div key={idx} className="col-span-1">
              <label className="block text-text-muted mb-1">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded focus:border-primary transition"
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  step={step}
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded focus:border-primary transition"
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-text-dark mb-4">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { label: "Weight", name: "weight" },
              { label: "Dimensions", name: "dimensions" },
              { label: "Brand", name: "brand" },
              { label: "Model", name: "model" },
            ].map(({ label, name }, idx) => (
              <div key={idx} className="col-span-1">
                <label className="block text-text-muted mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded focus:border-primary transition"
                  value={formData.specifications[name]}
                  onChange={handleSpecificationsChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary transition"
          >
            {modalType === 'edit' ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  </Modal>
);

  
}