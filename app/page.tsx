'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState,useEffect} from 'react';
import Navbar from './components/Navbar';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000); // Hide message after 3s
    }
  };
  const images = [
    '/images/enku_placeholder.png',
    '/images/prodact_placeholder.jpg',
    '/images/prodact_placeholder2.jpg',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 4000); // Change image every 4 seconds

  return () => clearInterval(interval);
}, []);
  const products = [
    {
      id: 1,
      name: 'Wall Art',
      
      image: '/images/prodact_placeholder.jpg',
      description: 'Beautifully crafted basket made by local artisans.',
    },
    {
      id: 2,
      name: 'sphone coffee maker',
   
      image: '/images/prodact_placeholder3.webp',
      description: 'Freshly roasted coffee from Ethiopian highlands.',
    },
    {
      id: 3,
      name: 'Nion light',
    
      image: '/images/prodact_placeholder2.jpg',
      description: 'Comfortable, handmade sandals for everyday wear.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}

      <section className="container mx-auto px-4 py-8 mt-16">
  <div className="relative overflow-hidden rounded-3xl shadow-lg bg-white">
    <div className="flex flex-col md:flex-row h-[400px] md:h-[500px] lg:h-[600px]">

      {/* Left Side - Welcome Message */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center text-center md:text-left z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Welcome to <span className="text-[#FFA500]">Enku Gebeya</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-md">
          Discover a new era of marketplace excellence. Enku Gebeya is your trusted platform for quality and convenience.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button className="bg-[#FFA500] text-white px-6 py-3 rounded-full shadow hover:bg-orange-500 transition duration-300">
            Product
          </button>
          <button className="bg-gray-100 text-[#FFA500] px-6 py-3 rounded-full border border-[#FFA500] hover:bg-orange-50 transition duration-300">
            About
          </button>
        </div>
      </div>

      {/* Animated Divider */}
      <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-4 z-20">
        <div className="h-full w-full animate-pulse bg-gradient-to-b from-orange-400 via-orange-500 to-yellow-400 rounded-full shadow-lg blur-sm"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full animate-bounce opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-[#FFA500] to-white rounded-full blur-md"></div>
        </div>
      </div>

      {/* Right Side - Image Slider with Glowing Effect */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">
        {/* Glowing Background */}
        <div className="absolute inset-0 rounded-r-3xl z-0 pointer-events-none">
          <div className="w-full h-full rounded-r-3xl bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500 blur-2xl opacity-30 animate-pulse"></div>
        </div>

        {/* Actual Image Slider */}
        <div className="relative w-full h-full overflow-hidden rounded-r-3xl z-10">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center rounded-r-3xl"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>



{/* Glowing Horizontal SVG Divider */}
<div className="hidden md:block w-full overflow-hidden relative -mt-2">
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="w-full h-12 text-orange-400 rotate-180"
    style={{
      filter: 'drop-shadow(0 0 6px #FFA500) drop-shadow(0 0 10px #FFA500)',
    }}
  >
    <path
      d="M0,50 C30,0 70,100 100,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
</div>


{/* Product Showcase */}
<section className="py-20 bg-gray-50 relative z-10">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
      Featured Products
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition duration-300"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <Link
                href={`/products/${product.id}`}
                className="bg-[#FFA500] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <Link
        href="/products"
        className="text-[#FFA500] text-lg font-semibold hover:underline transition"
      >
        See All Products
      </Link>
    </div>
  </div>
</section>


{/* Glowing Horizontal SVG Divider */}
<div className="hidden md:block w-full overflow-hidden relative -mt-2">
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="w-full h-12 text-orange-400 rotate-180"
    style={{
      filter: 'drop-shadow(0 0 6px #FFA500) drop-shadow(0 0 10px #FFA500)',
    }}
  >
    <path
      d="M0,50 C30,0 70,100 100,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
</div>
{/* Testimonial Section */}
<section className="py-16 bg-gradient-to-b from-gray-100 to-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
      What Our Customers Are Saying
    </h2>

    <div className="flex flex-wrap justify-center gap-10">
      {/* Testimonial 1 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs transform hover:scale-105 transition duration-300">
        <div className="relative mb-4">
          <Image
            src="/images/enku_placeholder.png"
            alt="Customer 1"
            width={100}
            height={100}
            className="rounded-full border-4 border-orange-400 mx-auto"
          />
        </div>
        <p className="text-lg text-gray-600 mb-4">
          "Enku Gebeya has changed the way I shop online. Their products are of
          incredible quality, and their service is outstanding!"
        </p>
        <p className="text-xl font-semibold text-gray-800">Jane Doe</p>
        <p className="text-gray-500">Frequent Shopper</p>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs transform hover:scale-105 transition duration-300">
        <div className="relative mb-4">
          <Image
             src="/images/enku_placeholder.png"
            alt="Customer 2"
            width={100}
            height={100}
            className="rounded-full border-4 border-orange-400 mx-auto"
          />
        </div>
        <p className="text-lg text-gray-600 mb-4">
          "The quality and craftsmanship of the items on Enku Gebeya are second
          to none. Highly recommend for anyone looking for authentic products."
        </p>
        <p className="text-xl font-semibold text-gray-800">John Smith</p>
        <p className="text-gray-500">Small Business Owner</p>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs transform hover:scale-105 transition duration-300">
        <div className="relative mb-4">
          <Image
            src="/images/enku_placeholder.png"
            alt="Customer 3"
            width={100}
            height={100}
            className="rounded-full border-4 border-orange-400 mx-auto"
          />
        </div>
        <p className="text-lg text-gray-600 mb-4">
          "Fast, efficient, and reliable. I will definitely be a repeat customer.
          Enku Gebeya offers an unparalleled shopping experience."
        </p>
        <p className="text-xl font-semibold text-gray-800">Sara Lee</p>
        <p className="text-gray-500">Lifestyle Blogger</p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="mt-12">
      <Link
        href="/shop"
        className="bg-[#FFA500] text-white px-8 py-3 rounded-full shadow-xl hover:bg-orange-600 transition duration-300"
      >
        Contact Us Now
      </Link>
    </div>
  </div>
</section>


{/* Glowing Horizontal SVG Divider */}
<div className="hidden md:block w-full overflow-hidden relative -mt-2">
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="w-full h-12 text-orange-400 rotate-180"
    style={{
      filter: 'drop-shadow(0 0 6px #FFA500) drop-shadow(0 0 10px #FFA500)',
    }}
  >
    <path
      d="M0,50 C30,0 70,100 100,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
</div>

<section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-16">
          Connect With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {/* TikTok */}
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white rounded-2xl shadow-xl px-6 py-8 transition transform hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-gray-900"
          >
            <h3 className="text-2xl font-semibold mb-2">TikTok</h3>
            <p className="text-gray-300 text-sm">Watch our latest videos and trends.</p>
          </a>

          {/* Telegram */}
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-500 text-white rounded-2xl shadow-xl px-6 py-8 transition transform hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-blue-700"
          >
            <h3 className="text-2xl font-semibold mb-2">Telegram</h3>
            <p className="text-gray-100 text-sm">Join our channel for updates & support.</p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-2xl shadow-xl px-6 py-8 transition transform hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-pink-400"
          >
            <h3 className="text-2xl font-semibold mb-2">Instagram</h3>
            <p className="text-white text-sm">Follow us for the latest visuals and stories.</p>
          </a>
        </div>
      </div>
    </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Enku Gebeya. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/about" className="text-gray-400 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}