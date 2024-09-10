"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Checkout() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status !== "loading") return;
  }, [status]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number is invalid";
    }
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const totalDays = useMemo(() => {
    return formData.startDate && formData.endDate ? Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) : 0;
  }, [formData.startDate, formData.endDate]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.totalPrice * totalDays), 0);
  }, [cartItems, totalDays]);

  const handleCheckout = useCallback(() => {
    if (validateForm()) {
      const userId = session?.user?.id
      const orderData = {
        userId,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        products: cartItems.map(item => ({
          product: item,
          quantity: item.quantity,
        })),
        totalAmount,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };
      Cookies.set('orderData', JSON.stringify(orderData));
      Cookies.set('hasCheckedOut', 'true');
      toast.success("Proceeding to payment.", {
        position: "top-center",
        theme: "dark"
      });
      router.push('/payment');
    }
  }, [formData, cartItems, totalAmount, validateForm, session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-text-muted" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <Link href={`/products/${item._id}`} key={item._id} className="flex justify-between items-center p-4 bg-background-light rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-primary">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold">${item.totalPrice}</p>
                </Link>
              ))}
            </ul>
            <div className="mt-4 text-white">
              <label className="block mb-2">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full cursor-pointer p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              <label className="block mt-4 mb-2">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={formData.startDate}
                className="w-full cursor-pointer p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <form className="flex flex-col justify-between">
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-background-light focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 items-center flex justify-between">
          <div>
            <p className="text-lg font-bold">Total Days: {totalDays}</p>
            <p className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
          <button type="button" onClick={handleCheckout} className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
