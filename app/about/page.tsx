// AboutPage.tsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-[url('/images/about-hero.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl font-bold">Our Story</h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Crafting soulful spaces with timeless Ethiopian elegance.
          </p>
        </div>
      </section>

      {/* Brand Message */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Enku Home Art?</h2>
          <p className="text-lg text-gray-600">
            At Enku Home Art, we blend traditional Ethiopian artistry with modern design sensibilities. Our mission is to create pieces that transform homes into sanctuaries, where every detail tells a story.
          </p>
        </div>
      </section>

      {/* Image + Text Block */}
      <section className="py-16 px-6 md:px-24 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img src="/images/team.jpg" alt="Our Team" className="rounded-lg shadow-md" />
          <div>
            <h3 className="text-2xl font-semibold mb-4">Rooted in Culture</h3>
            <p className="text-gray-700 leading-relaxed">
              Inspired by Ethiopia’s rich heritage, our artisans and designers collaborate to bring timeless decor to life. We value sustainability, ethical sourcing, and empowering local craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { name: "Selam A.", feedback: "Incredible service and stunning decor pieces!" },
            { name: "Nahom B.", feedback: "The handcrafted designs add elegance to my home." },
            { name: "Hana M.", feedback: "A perfect blend of tradition and modernity." },
          ].map((t, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">“{t.feedback}”</p>
              <div className="text-right font-semibold text-green-700">– {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Map + Contact Info */}
      <section className="py-20 px-6 md:px-24 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!..."
            className="w-full h-96 rounded-xl border"
            loading="lazy"
            title="Our Location"
            allowFullScreen
          ></iframe>
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h4 className="font-bold text-xl mb-2">Visit Us</h4>
              <p>Addis Ababa, Bole – Ethiopia</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Email</h4>
              <p>contact@enkuhomeart.com</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Phone</h4>
              <p>+251 912 345 678</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className="bg-white py-20 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Have a question, feedback, or a custom design request? We’d love to hear from you.
        </p>
        <form className="max-w-3xl mx-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="p-4 border rounded w-full" />
            <input type="email" placeholder="Email Address" className="p-4 border rounded w-full" />
          </div>
          <textarea placeholder="Your Message" rows={5} className="w-full p-4 border rounded"></textarea>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
