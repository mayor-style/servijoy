import PricingBooking from "../components/SingleServiceSections/PricingBooking";
import RelatedServices from "../components/SingleServiceSections/RelatedServices";
import ReviewSection from "../components/SingleServiceSections/ReviewSection";
import ServiceDetails from "../components/SingleServiceSections/ServiceDetails";
import ServiceHero from "../components/SingleServiceSections/ServiceHero";
import VendorProfile from "../components/SingleServiceSections/VendorProfile";
import VendorCard from "../components/SingleServiceSections/VendorProfile";

const ServicePage = () => {
  return (
    <div className=" mx-auto  py-10">
        <ServiceHero />

      {/* Service Banner & Details */}
      <ServiceDetails />

      {/* Vendor Information */}
     {/*  <VendorProfile />*/}

        {/* <PricingBooking /> */}

             {/* Reviews */}
      <ReviewSection />

        <RelatedServices />
 

      {/* Booking Button */}
      <div className="flex justify-center mt-8">
        <button className="btn-green px-6 py-3 rounded-lg text-white text-lg shadow-md hover:shadow-lg">
          Book This Service
        </button>
      </div>
    </div>
  );
};

export default ServicePage;
