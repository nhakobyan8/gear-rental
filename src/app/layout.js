import { ClientSessionProvider, ReduxProvider } from "@/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";


export const metadata = {
  title: 'GearRental',
  description: 'Rent top-notch sound equipment at affordable prices.',
  openGraph: {
    title: 'GearRental',
    description: 'Rent top-notch sound equipment at affordable prices.',
    url: 'https://www.gearrental.com',
    images: [
      {
        url: 'https://www.gearrental.com/logo.png',
        width: 800,
        height: 600,
        alt: 'GearRental Logo',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
      </head>
      <body className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white antialiased">
        <div className="flex flex-col min-h-screen">
          <ClientSessionProvider>
            <ReduxProvider>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </ReduxProvider>
          </ClientSessionProvider>
        </div>
      </body>
    </html>
  );
}
