const ReviewSection = () => {
    return (
      <div className="mt-8 px-6">
        <h2 className="sm:text-2xl text-lg xs:text-xl  font-semibold mb-4">Customer Reviews</h2>
  
        {/* Review Item */}
        <div className="review bg-white p-4 rounded-lg shadow-md mb-4">
          <h4 className="font-bold max-sm:text-sm">John Smith</h4>
          <p className="text-gray-600 max-sm:text-sm mt-1">“Absolutely amazing service! My house has never been cleaner.”</p>
          <span className="text-yellow-500">★★★★★</span>
        </div>
  
        {/* Another Review */}
        <div className="review bg-white max-sm:text-sm p-4 rounded-lg shadow-md">
          <h4 className="font-bold">Sarah Johnson</h4>
          <p className="text-gray-600 max-sm:text-sm mt-1">“Professional and on time. Highly recommend!”</p>
          <span className="text-yellow-500">★★★★☆</span>
        </div>
      </div>
    );
  };
  
  export default ReviewSection;
  