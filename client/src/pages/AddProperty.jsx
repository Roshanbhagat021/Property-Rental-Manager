
import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AddProperty() {

  const {token}=useContext(AuthContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    propertyType: "apartment",
    amenities: [],
    imageUrls: [""],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "villa", label: "Villa" },
    { value: "condo", label: "Condo" },
    { value: "studio", label: "Studio" },
  ];

  const amenitiesList = [
    "Parking",
    "Swimming Pool",
    "Gym",
    "Security",
    "Garden",
    "Balcony",
    "Furnished",
    "Pet Friendly",
    "Elevator",
    "WiFi",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData({
      ...formData,
      imageUrls: newImageUrls,
    });
  };

  const addImageUrlField = () => {
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, ""],
    });
  };

  const removeImageUrl = (index) => {
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imageUrls: newImageUrls,
    });
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== amenity),
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity],
        };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required";
    if (!formData.bedrooms || isNaN(formData.bedrooms))
      newErrors.bedrooms = "Valid number is required";
    if (!formData.bathrooms || isNaN(formData.bathrooms))
      newErrors.bathrooms = "Valid number is required";
    if (!formData.area || isNaN(formData.area))
      newErrors.area = "Valid area is required";

    // Validate at least one image URL is provided
    const validImageUrls = formData.imageUrls.filter(
      (url) => url.trim() !== ""
    );
    if (validImageUrls.length === 0)
      newErrors.imageUrls = "At least one image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsSubmitting(true);
//       // Filter out empty URLs before submission
//       const submissionData = {
//         ...formData,
//         imageUrls: formData.imageUrls.filter((url) => url.trim() !== ""),
//       };
// console.log("form Data",formData);
//       // Simulate API call
//       setTimeout(() => {
//         console.log("Property submitted:", submissionData);
//         setIsSubmitting(false);
//         navigate("/properties"); // Redirect after successful submission
//       }, 1500);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      imageUrls: formData.imageUrls.filter((url) => url.trim() !== ""),
    };

    // const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/property/create",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Property submitted:", response.data);
      navigate("/properties");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            List Your Property
          </h1>
          <p className="text-gray-600 mt-2">
            Fill out the form to list your property for rent
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Beautiful 2BHK Apartment"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property Type*
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your property in detail..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Location Details
            </h2>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Address*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="123 Main Street, City, State, ZIP"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Monthly Rent (₹)*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="15000"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bedrooms*
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.bedrooms ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="2"
                />
                {errors.bedrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bathrooms*
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.bathrooms ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="1"
                />
                {errors.bathrooms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bathrooms}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Area (sq ft)*
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.area ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="800"
                />
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">{errors.area}</p>
                )}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Image URLs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Property Images*
            </h2>
            <div
              className={`space-y-4 ${
                errors.imageUrls ? "border-l-4 border-red-500 pl-4" : ""
              }`}
            >
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-grow">
                    <label
                      htmlFor={`imageUrl-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Image URL {index + 1}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        id={`imageUrl-${index}`}
                        value={url}
                        onChange={(e) =>
                          handleImageUrlChange(index, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeImageUrl(index)}
                          className="px-3 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrlField}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add another image URL
              </button>
              {errors.imageUrls && (
                <p className="mt-2 text-sm text-red-600">{errors.imageUrls}</p>
              )}
            </div>

            {/* Image previews */}
            {formData.imageUrls.some((url) => url.trim() !== "") && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Image Previews
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.imageUrls
                    .filter((url) => url.trim() !== "")
                    .map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Property preview ${index + 1}`}
                          className="h-32 w-full object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=Image+Not+Found";
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Listing Property...
                </>
              ) : (
                "List Property"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
