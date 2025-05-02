import { Button } from "./ui/button";
import hereImage from "../assets/forRentImg.png"
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-10 flex flex-col lg:flex-row items-center justify-center gap-10">
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-5xl font-extrabold mb-4 text-indigo-700 leading-tight">
          Find Your Next Dream Home
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Whether you're a tenant looking for a cozy space or a landowner ready to rent out — we’ve got you covered with verified listings and secure communication.
        </p>
        <div className="flex flex-col sm:flex-row gap-4  justify-center lg:justify-start">
            <Link to={"/properties"}>
          <Button className="bg-indigo-600 cursor-pointer hover:bg-indigo-700">Explore Listings</Button>
            </Link>
            <Link to={"addpropertie"}>
          <Button variant="outline" className="border-indigo-600 cursor-pointer text-indigo-600 hover:bg-indigo-50">
            List Your Property
          </Button>
            </Link>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          100% verified listings • Secure messaging • Zero commission
        </div>
      </div>
      <div className="max-w-md">
        <img
          src={hereImage}
          alt="Dream Home Illustration"
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
