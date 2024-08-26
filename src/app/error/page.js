import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
   return (
      <div className="flex items-center justify-center min-h-screen bg-background-dark text-text-default">
         <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-primary-dark rounded-full">
               <svg
                  className="w-10 h-10 text-primary-light"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
               </svg>
            </div>
            <h1 className="mt-4 text-6xl font-extrabold text-primary-light">
               Oops!
            </h1>
            <p className="mt-2 text-2xl font-semibold text-text-muted">
               Something went wrong.
            </p>
            <p className="mt-2 text-lg text-text-dark">
               Please try again later or contact support.
            </p>
            <Link href="/">
               <button
                  className="mt-8 px-6 py-3 text-lg font-medium text-gray-400 bg-primary-dark hover:bg-primary-default transition-colors duration-300 ease-in-out rounded-lg shadow-lg"
               >
                  Go Back
               </button>
            </Link>
         </div>
      </div>
   );
};

export default ErrorPage;
