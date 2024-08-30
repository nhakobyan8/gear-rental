import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
   return (
      <div
         className={`fixed cursor-pointer bg-black bg-opacity-55 inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
         onClick={onClose}
      >
         <div
            className="bg-background-light p-8 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
         >
            <button
               className="absolute top-0 p-2 right-0 text-white text-2xl font-bold"
               onClick={onClose}
            >
               ×
            </button>
            {children}
         </div>
      </div>
   );
}
