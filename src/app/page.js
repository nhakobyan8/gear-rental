import { memo } from 'react';
import Link from 'next/link';
import FeaturedProducts from '@/components/FeaturedProducts';

const features = [
  {
    title: 'High-Quality Equipment',
    description: 'We offer only the best sound equipment from top brands to ensure your projects sound amazing.',
  },
  {
    title: 'Affordable Prices',
    description: 'Our rental prices are competitive, making high-quality gear accessible to everyone.',
  },
  {
    title: 'Excellent Support',
    description: 'Our support team is here to help you with any questions or issues you might have.',
  },
];


const testimonials = [
  {
    testimonial: '"GearRental provided us with the best equipment for our recording session. Highly recommended!"',
    name: '- Alex',
  },
  {
    testimonial: '"The support team was very helpful and the equipment was top-notch. Will rent again."',
    name: '- Kane',
  },
  {
    testimonial: '"Excellent service and great prices. GearRental made our project a success."',
    name: '- Taylor',
  },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-background-light via-background to-background-light">
      <div
        className="min-h-[600px] w-full flex flex-col items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: `url("/images/home.webp")` }}
      >
        <div className="flex flex-col bg-black bg-opacity-60 w-full min-h-[600px] items-center justify-center px-4 md:px-10 py-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in-up">
            Welcome to GearRental
          </h1>
          <p className="mt-4 text-center text-lg md:text-2xl text-gray-300 drop-shadow-md animate-fade-in-up max-w-2xl">
            Rent top-notch sound equipment at affordable prices.
          </p>
          <div className="mt-8 w-full md:w-auto">
            <Link
              className="inline-block text-lg md:text-xl px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              href="/products"
              aria-label="Explore our products"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>


      <div className="px-3">
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text">Why Choose GearRental?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-text-muted">
            {features.map((item, index) => (
              <div
                key={index}
                className="space-y-4 border border-slate-400/20 text-center md:text-left bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <FeaturedProducts />

        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-text-muted">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="space-y-4 border border-slate-400/20 bg-background-light p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <p>{testimonial.testimonial}</p>
                <p className="text-lg font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text">Stay Updated</h2>
          <p className="text-lg text-text-muted mt-4">Subscribe to our newsletter to get the latest news and special offers.</p>
          <form className="mt-8 flex flex-col md:flex-row items-center w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:flex-grow px-4 py-2 rounded-md bg-background text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Enter your email"
              required
            />
            <button
              type="submit"
              className="mt-4 md:mt-0 md:ml-4 px-6 py-3 w-full md:w-auto bg-primary text-white rounded-md hover:bg-primary-dark transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default memo(Home);
