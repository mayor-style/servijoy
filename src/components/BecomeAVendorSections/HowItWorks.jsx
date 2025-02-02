const HowItWorks = () => {
    const steps = [
      { step: "1", title: "Sign Up & Verify", desc: "Create an account & complete KYC for trust" },
      { step: "2", title: "List Your Services", desc: "Set your pricing & availability" },
      { step: "3", title: "Get Booked & Deliver", desc: "Accept client requests & complete jobs" },
      { step: "4", title: "Get Paid Securely", desc: "Payment is sent directly to you!" },
    ];
  
    return (
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="header text-center">How It Works for Vendors</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {steps.map((item, i) => (
            <div key={i} className="text-center">
              <span className="text-4xl font-bold text-green">{item.step}</span>
              <h3 className="font-bold text-lg mt-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default HowItWorks