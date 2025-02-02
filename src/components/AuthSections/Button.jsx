const Button = ({ label, onClick }) => {
    return (
      <button
        className="btn-green w-full text-center py-3 rounded-lg shadow-md hover:shadow-lg"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  