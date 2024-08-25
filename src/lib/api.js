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
