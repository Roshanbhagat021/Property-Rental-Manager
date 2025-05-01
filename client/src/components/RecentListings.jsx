import property1 from "../assets/property1.png"

export default function RecentListings() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Recently Listed Properties</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1,2,3].map(i => (
          <div key={i} className="hover:shadow-2xl transition rounded-t-xl overflow-hidden shadow-xl">
            <img src={property1} alt="Property" className="w-full h-48 object-fill" />
            <div className="p-4 rounded-b-xl ">
              <h4 className="font-semibold text-lg">2 BHK Apartment</h4>
              <p className="text-sm text-gray-600">Location: City Center</p>
              <p className="mt-2 font-bold text-indigo-600">₹12,000/month</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}