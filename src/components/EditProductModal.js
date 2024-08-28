import { useState, useEffect } from 'react';

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
    };

    onSave(updatedProduct);
  };

  return (
    <div onClick={onClose} className={`fixed cursor-pointer inset-0 bg-black z-30 bg-opacity-75 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div onClick={(e) => e.stopPropagation()} className="bg-background-light relative p-8 rounded-lg w-full max-w-2xl mx-4 md:mx-auto shadow-lg overflow-y-auto lg:max-h-full max-h-96">
        <h2 className="text-3xl font-bold mb-6 text-text-dark">
          {modalType === 'edit' ? 'Edit Product' : 'Add Product'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-text-muted mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-text-muted mb-2">Price</label>
              <input
                type="number"
                name="price"
                step="0.01"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-text-muted mb-2">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-text-muted mb-2">Description</label>
              <textarea
                name="description"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-text-muted mb-2">Category</label>
              <input
                type="text"
                name="category"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-text-muted mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-text-muted mb-2">Features (comma separated)</label>
              <input
                type="text"
                name="features"
                className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                value={formData.features}
                onChange={handleInputChange}
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
                  name="weight"
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                  value={formData.specifications.weight}
                  onChange={handleSpecificationsChange}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-text-muted mb-2">Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                  value={formData.specifications.dimensions}
                  onChange={handleSpecificationsChange}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-text-muted mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                  value={formData.specifications.brand}
                  onChange={handleSpecificationsChange}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-text-muted mb-2">Model</label>
                <input
                  type="text"
                  name="model"
                  className="w-full p-3 bg-background-dark text-white border border-gray-600 rounded"
                  value={formData.specifications.model}
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
