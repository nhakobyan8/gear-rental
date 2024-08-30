export async function fetchProducts() {
   try {
      const response = await fetch("/api/admin/products");
      if (!response.ok) {
         throw new Error("Failed to fetch products.");
      }
      return await response.json();
   } catch (err) {
      throw new Error(err.message);
   }
}

export async function deleteProduct(productId) {
   try {
      const response = await fetch("/api/admin/products", {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ _id: productId }),
      });

      if (!response.ok) {
         throw new Error("Failed to delete product.");
      }
   } catch (err) {
      throw new Error(err.message);
   }
}

export async function saveProduct(product, method) {
   const url = "/api/admin/products";
   try {
      const response = await fetch(url, {
         method,
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(product),
      });

      if (!response.ok) {
         throw new Error("Failed to save product.");
      }
   } catch (err) {
      throw new Error(err.message);
   }
}