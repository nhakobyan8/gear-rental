import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function ThankYouPage() {

  return (
    <div className="container mx-auto p-8 text-center">
      <div className="flex flex-col items-center justify-center h-96">
        <FaCheckCircle className="text-green-500 text-7xl mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-text-dark">Thank You!</h1>
        <p className="text-xl mb-8 text-text-muted">
          Your order has been placed successfully. You will receive an email confirmation shortly.
        </p>
        <Link href="/" passHref>
          <div className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Return to Home
          </div>
        </Link>
      </div>
    </div>
  );
}
