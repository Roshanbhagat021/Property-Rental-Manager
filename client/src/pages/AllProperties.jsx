import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import axios from "axios";
const VITE_API_BASEURL = import.meta.env.VITE_API_BASEURL;


export default function PropertyListings() {
  const [properties,setProperties] =useState([])
  const [Errpr,setError] =useState("")
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    propertypropertyType: ""
  });
  
  useEffect(()=>{
    const fetchEventsData = async () => {
      try {
        const response = await axios.get( `${VITE_API_BASEURL}/property/allproperties`);
        console.log('response: ', response);
        setProperties(response.data);
       
      } catch (err) {
        setError('Failed to load events. Please try again later.');
      }
    };

    fetchEventsData();

  
  },[])
  const [sortOption, setSortOption] = useState("price-asc");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleRequest = (propertyId) => {
    console.log(`Request sent for property ${propertyId}`);
    alert(`Your request for this property has been submitted!`);
  };

  const filteredProperties = properties.filter(property => {
    return (
      (filters.minPrice === "" || property.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" || property.price <= Number(filters.maxPrice)) &&
      (filters.propertypropertyType === "" || property.propertyType === filters.propertypropertyType)
    );
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch(sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "area-asc":
        return a.area - b.area;
      case "area-desc":
        return b.area - a.area;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Available Properties</h1>
          <p className="text-lg text-gray-600">Find your perfect home from our curated listings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="text-sm text-gray-500">
              Showing {sortedProperties.length} of {properties.length} properties
            </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
              <input
                propertyType="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Min"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
              <input
                propertyType="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Max"
              />
            </div>
         
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property propertyType</label>
              <select
                name="propertypropertyType"
                value={filters.propertypropertyType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All propertyTypes</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div >
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="area-asc">area (Small to Large)</option>
                <option value="area-desc">area (Large to Small)</option>
                <option value="bedrooms-asc">Bedrooms (Few to Many)</option>
                <option value="bedrooms-desc">Bedrooms (Many to Few)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center">
            
          
          </div>
        </div>

        {sortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((property) => (
              <div key={property._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={property.imageUrls[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{property.title}</h2>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ${property.price}/month
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{property.address}</p>
                  
                  <div className="flex space-x-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} beds
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {property.bathrooms} baths
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {property.area} sq ft
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{property.description}</p>

                  <Button
                    onClick={() => handleRequest(property.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Request to Live Here
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No properties match your filters</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
            <Button
              onClick={() => setFilters({
                minPrice: "",
                maxPrice: "",
                bedrooms: "",
                propertypropertyType: ""
              })}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}