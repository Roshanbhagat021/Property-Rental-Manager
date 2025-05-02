import { Card, CardContent } from "./ui/card"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Rentify made it so easy to find a home near my workplace! The process was seamless and I found my perfect apartment in just 3 days.",
      author: "Aayush",
      role: "Tenant",
      rating: 5
    },
    {
      id: 2,
      quote: "I listed my flat and within days got responses from qualified tenants. The platform is simple yet incredibly effective for property owners.",
      author: "Sneha",
      role: "Landowner",
      rating: 5
    },
    {
      id: 3,
      quote: "As a first-time renter, I was nervous about the process, but Rentify guided me through everything. The verification system gave me peace of mind.",
      author: "Rahul",
      role: "Tenant",
      rating: 4
    },
    {
      id: 4,
      quote: "Managing multiple properties has never been easier. The dashboard gives me all the tools I need in one place. Excellent service!",
      author: "Priya",
      role: "Property Manager",
      rating: 5
    }
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who've found their perfect home or ideal tenants through Rentify
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-gray-700 mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-indigo-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}