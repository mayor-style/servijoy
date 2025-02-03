import { useState, useEffect } from "react";
import { fetchVendors } from "../mock/Api";
import BookingForm from "./BookingForm";
import sampleImg from '../assets/imgs/hero_2.webp'
import OptimizedImage from "./OptimizedImage";
import { FaSpinner } from "react-icons/fa";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors()
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full py-32 px-6">
      <h2 className="text-3xl header font-bold text-center">Available Vendors</h2>

      {/* Show spinner when loading */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <FaSpinner className="text-blue-500 text-4xl animate-spin" /></div>
        
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white p-4 rounded-lg shadow-lg">
             <OptimizedImage  
              src={sampleImg}
              alt={vendor.name}
              className="w-full h-40 object-cover rounded-md "
              rounded={'rounded-md '}
             />
              <h3 className="text-lg font-bold mt-2">{vendor.name}</h3>
              <p className="text-gray-500">{vendor.service}</p>
              <p className="text-gray-700">
                <strong>Location:</strong> {vendor.location}
              </p>
              <p className="text-yellow-500 font-bold">
                ⭐ {vendor.rating} ({vendor.reviews} reviews)
              </p>
              <p className="text-green-600 font-bold">₦{vendor.price}</p>
              <button
                className="btn-green mt-3"
                onClick={() => setSelectedVendor(vendor)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show booking form when a vendor is selected */}
      {selectedVendor && (
        <BookingForm vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
      )}
    </section>
  );
};

export default VendorList;
