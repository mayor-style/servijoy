import React from "react";

const ContactUs = () => {
  return (
    <section className="w-full py-24 bg-white text-center text-black">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <h2 className="header text-gradient">Get in Touch with Us</h2>
        <p className="subheader text-gray-500 mt-4 max-w-3xl mx-auto">
          Have questions, feedback, or need support? Reach out to us and we'll be happy to assist you.
        </p>

        {/* Contact Info */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 text-center w-full md:w-1/3">
            <h4 className="font-semibold text-lg">📧 Email</h4>
            <p className="text-gray-600">support@servijoy.com</p>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 text-center w-full md:w-1/3">
            <h4 className="font-semibold text-lg">📍 Address</h4>
            <p className="text-gray-600">Ilorin, Nigeria</p>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 text-center w-full md:w-1/3">
            <h4 className="font-semibold text-lg">📞 Phone</h4>
            <p className="text-gray-600">+234 123 456 7890</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Send Us a Message</h3>
          <form className="mt-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green"
            ></textarea>
            <button type="submit" className="btn-green w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
