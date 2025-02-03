import { useState } from "react";

const BookingForm = ({ vendor, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60">
      <div className="bg-white p-6 rounded-lg w-96">
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Booking Confirmed! ✅</h2>
            <p className="text-gray-600 mt-2">Your appointment with {vendor.name} is set.</p>
            <button className="btn-blue mt-4" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <div onClick={()=>onClose()} className="absolute right-0 cursor-pointer top-0 font-black -mt-8 -mr-3">
              ✖️
            </div>
            <h2 className="text-xl font-bold">Book {vendor.name}</h2>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            <input
              type="text"
              name="location"
              placeholder="Service Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />

            {/* Submit Button */}
            <button type="submit" className="btn-green w-full" disabled={loading}>
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
