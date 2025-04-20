import { FaSpinner } from "react-icons/fa";

const Button = ({ label, type = "button", isLoading }) => {
  return (
    <button
      type={type}
      className="btn-green w-full text-center py-3 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center"
      disabled={isLoading}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-xl" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;