export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-2">Rentify</h4>
              <p className="text-sm text-gray-300">Connecting tenants and landlords with ease.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Browse</a></li>
                <li><a href="#" className="hover:underline">Login</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Contact</h4>
              <p className="text-sm text-gray-300">Email: <a href="mailto:support@rentify.com" className="hover:underline">support@rentify.com</a></p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="#" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="#" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>
  
          <div className="mt-10 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Rentify. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  