import Image from 'next/image';
import Head from 'next/head';

export default function About() {
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
      <div className="bg-background-light min-h-screen text-text py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h1 className="text-5xl font-extrabold text-center text-white">About GearRental</h1>
          <p className="text-center text-lg text-text-muted mt-4 max-w-2xl mx-auto">
            GearRental is your go-to destination for sound equipment rental. Our mission is to provide high-quality gear with excellent customer service.
          </p>
          <div className="mt-16">
            <Image
              src="/images/about-us.webp"
              alt="Our team"
              width={1200}
              height={500}
              layout="responsive"
              priority={true}
              quality={80}
              className="w-full max-h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-12 grid grid-cols-1 text-center md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              <p className="text-lg text-text-muted">
                We strive to empower creators and professionals by offering top-notch sound equipment at competitive prices. Our commitment is to ensure that every project, big or small, has access to the tools necessary for success.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Why Choose Us</h2>
              <ul className="list-disc list-inside text-lg text-text-muted space-y-2">
                <li>Wide range of high-quality equipment</li>
                <li>Affordable rental prices</li>
                <li>Exceptional customer support</li>
                <li>Fast and reliable service</li>
                <li>Flexible rental terms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
