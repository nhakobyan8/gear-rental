import Head from 'next/head';

export default function About() {
  const testimonials = [
    {
      testimonial: '"GearRental provided us with the best equipment for our recording session. Highly recommended!"',
      name: '- Alex',
    },
    {
      testimonial: '"The support team was very helpful and the equipment was top-notch. Will rent again."',
      name: '- Jamie',
    },
    {
      testimonial: '"Excellent service and great prices. GearRental made our project a success."',
      name: '- Taylor',
    },
  ];
  return (
    <>
      <Head>
        <title>About GearRental</title>
        <meta name="description" content="Learn more about GearRental, your go-to destination for sound equipment rental. Our mission is to provide high-quality gear with excellent customer service." />
        <meta name="keywords" content="GearRental, sound equipment, rental, customer service" />
        <meta property="og:title" content="About GearRental" />
        <meta property="og:description" content="Learn more about GearRental, your go-to destination for sound equipment rental. Our mission is to provide high-quality gear with excellent customer service." />
        <meta property="og:image" content="/images/about-us.webp" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="bg-background-light flex flex-col justify-center items-center min-h-screen text-text py-16">
        <div className="container mx-auto px-3 md:px-12 lg:px-24">
          <h1 className="text-5xl font-extrabold text-center text-white">About GearRental</h1>
          <p className="text-center text-lg text-text-muted mt-4 max-w-2xl mx-auto">
            GearRental is your go-to destination for sound equipment rental. Our mission is to provide high-quality gear with excellent customer service.
          </p>
          <div style={{ backgroundImage: `url("/images/about-us.webp")` }} className="mt-12 rounded-xl bg-center md:h-[600px] bg-cover flex justify-center items-center text-center">
            <div className="flex justify-between rounded-xl items-center bg-black h-full bg-opacity-60 border border-slate-400/20 w-full flex-wrap">
              <div className="space-y-6 flex p-14 flex-col w-full md:w-1/2 justify-center items-center">
                <h2 className="text-3xl font-bold text-white">Why Choose Us</h2>
                <ul className="list-disc list-inside text-lg text-text-muted space-y-2">
                  <li>Wide range of high-quality equipment</li>
                  <li>Affordable rental prices</li>
                  <li>Exceptional customer support</li>
                  <li>Fast and reliable service</li>
                  <li>Flexible rental terms</li>
                </ul>
              </div>
              <div className="space-y-6 flex flex-col p-10 md:w-1/2 w-full justify-center items-center">
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                <p className="text-lg text-text-muted">
                  We strive to empower creators and professionals by offering top-notch sound equipment at competitive prices. Our commitment is to ensure that every project, big or small, has access to the tools necessary for success.
                </p>
              </div>

            </div>
          </div>

          <section className="mt-20">
            <h2 className="text-3xl text-center md:text-4xl font-bold text-text">What Our Clients Say</h2>
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
          <section className="mt-20">
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
    </>
  );
}
