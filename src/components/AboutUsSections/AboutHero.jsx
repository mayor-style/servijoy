import React from "react";

const AboutHero = () => {
  return (
    <section className="w-full bg-hero bg-cover relative bg-no-repeat text-white pt-32 py-20">
        <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative mx-auto px-6 lg:px-20 flex flex-col items-center text-center">
        <h1 className="header text-gradient">
          Empowering Seamless Service Connections
        </h1>
        <p className="subheader max-w-2xl mt-4 text-gray-100">
          ServiJoy is a premium platform connecting top-rated service providers
          with individuals in need. We bridge the gap between quality and
          convenience, ensuring a hassle-free experience every time.
        </p>
        <div className="mt-6">
          <button className="btn-green">Explore Services</button>
          <button className="btn-blue ml-4">Become a Vendor</button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
