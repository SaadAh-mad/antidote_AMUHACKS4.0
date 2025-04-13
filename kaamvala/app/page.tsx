import Image from "next/image";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";
import LandingPage from "@/components/landing";

export default function App() {
  return (
    <div>
      <Nav />
      <LandingPage />
      <Footer />
    </div>
  );
}