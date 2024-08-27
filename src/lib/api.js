export async function fetchOrderHistory() {
   try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
         throw new Error("Failed to fetch order history.");
      }
      return await response.json();
   } catch (error) {
      throw new Error(error.message || "Error fetching order history.");
   }
}

export async function changePassword(data) {
   try {
      const response = await fetch("/api/change-password", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });
      if (!response.ok) {
         throw new Error("Failed to change password.");
      }
      return await response.json();
   } catch (error) {
      throw new Error(error.message || "Error changing password.");
   }
}

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

export async function sendConfirmationCode(formData) {
   const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email: formData.email,
         username: formData.username,
         password: formData.password,
      }),
   });

   const data = await res.json();
   if (!res.ok) {
      throw new Error(data.message || "Failed to send confirmation code.");
   }
   return data;
}

export async function confirmCodeAndCreateAccount(formData) {
   const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email: formData.email,
         username: formData.username,
         password: formData.password,
         confirmationCode: formData.confirmationCode,
      }),
   });

   const data = await res.json();
   if (!res.ok) {
      throw new Error(data.message || "Invalid confirmation code.");
   }
   return data;
}

export async function handleLogin(formData) {
   const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
   });

   if (res?.error) {
      throw new Error(res.error);
   }
   return res;
} 