import React from 'react';

export default function Modal({ isOpen, onClose, children, width = 'max-w-md', height = 'max-h-full' }) {
   return (
      <div
         className={`fixed cursor-pointer bg-black bg-opacity-55 inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
         onClick={onClose}
      >
         <div
            className={`relative bg-background-light p-8 rounded-lg shadow-lg w-full ${width} ${height} transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
            onClick={(e) => e.stopPropagation()}
         >
            <button
               className="absolute top-2 right-2 text-white text-2xl font-bold"
               onClick={onClose}
               aria-label="Close modal"
            >
               ×
            </button>
            {children}
         </div>
      </div>
   );
}
