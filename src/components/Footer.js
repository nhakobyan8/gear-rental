import Link from 'next/link';
import { FaTwitter, FaFacebookF, FaEnvelope, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-background-light text-text py-8 shadow-inner">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <p>&copy; {new Date().getFullYear()} GearRental. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          {[
            { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter' },
            { href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook' },
            { href: 'mailto:support@gearrental.com', icon: <FaEnvelope />, label: 'Email' },
            { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
            { href: 'https://linkedin.com', icon: <FaLinkedinIn />, label: 'LinkedIn' },
          ].map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className="hover:text-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${social.label} page`}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
