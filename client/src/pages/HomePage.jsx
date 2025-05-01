import HeroSection from "../components/HeroSection";
import RecentListings from "../components/RecentListings";
import ImpactSection from "../components/ImpactSection";


export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <HeroSection />
      <RecentListings/>
      <ImpactSection />
    </div>
  );
}