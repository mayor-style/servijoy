const InputField = ({ type, placeholder, icon, value, onChange }) => {
    return (
      <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-4">
        <span className="text-gray-500">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none ml-2"
        />
      </div>
    );
  };
  
  export default InputField;
  