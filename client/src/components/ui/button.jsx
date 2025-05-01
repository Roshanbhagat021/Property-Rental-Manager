export function Button({ children, className = "", variant = "default", ...props }) {
    const baseStyles = "inline-block px-4 py-2 rounded-lg font-semibold transition";
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    };
    const variantStyles = variants[variant] || variants.default;
    return (
      <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
        {children}
      </button>
    );
  }