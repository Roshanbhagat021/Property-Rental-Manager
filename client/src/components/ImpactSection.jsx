export default function ImpactSection() {
    return (
      <section className="py-12 bg-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">10k+</h4>
              <p>Tenants Served</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">1k+</h4>
              <p>Properties Listed</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-indigo-600">1.5k+</h4>
              <p>Happy Landowners</p>
            </div>
          </div>
        </div>
      </section>
    );
  }