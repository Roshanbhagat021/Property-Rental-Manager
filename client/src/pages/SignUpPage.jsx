import { useState } from "react";
import { Button } from "../components/ui/button";

export default function SignUpPage() {
  const [userType, setUserType] = useState("tenant");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [cibilScore, setCibilScore] = useState("");

  const occupations = [
    { value: "", label: "Select Occupation" },
    { value: "student", label: "Student" },
    { value: "employee", label: "Employee" },
    { value: "self-employed", label: "Self Employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData =
      userType === "tenant"
        ? { name, email, password, occupation, aadharNo, cibilScore }
        : { name, email, password };
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">
            {userType === "tenant" ? "Tenant" : "Landlord"} Sign Up
          </h2>
          <p className="text-gray-500 mt-2">
            Create your {userType === "tenant" ? "tenant" : "landlord"} account
          </p>
        </div>

        {/* User type toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUserType("tenant")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                userType === "tenant"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Tenant
            </button>
            <button
              type="button"
              onClick={() => setUserType("landlord")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                userType === "landlord"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Landlord
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Common fields for both */}
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Tenant-specific fields */}

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          {userType === "tenant" && (
            <>
              <div className="space-y-1">
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Occupation
                </label>
                <select
                  id="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  {occupations.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="aadharNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aadhar Number
                </label>
                <input
                  type="text"
                  id="aadharNo"
                  value={aadharNo}
                  onChange={(e) => setAadharNo(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="1234 5678 9012"
                  maxLength="12"
                  pattern="[0-9]{12}"
                />
                <p className="text-xs text-gray-500 mt-1">
                  12-digit Aadhar number without spaces
                </p>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cibilScore"
                  className="block text-sm font-medium text-gray-700"
                >
                  CIBIL Score
                </label>
                <input
                  type="number"
                  id="cibilScore"
                  value={cibilScore}
                  onChange={(e) => setCibilScore(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="300-900"
                  min="300"
                  max="900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Score between 300-900
                </p>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            {userType === "tenant"
              ? "Create Tenant Account"
              : "Create Landlord Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
