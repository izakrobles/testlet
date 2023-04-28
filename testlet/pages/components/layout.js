import Navbar from "./Navbar";
import Footer from "./Footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});

export default function Layout({ children }) { {/* Formats every page to have navbar at top, footer at bottom, contents middle */}
  return (
    <main className={montserrat.className}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </main>
  );
}
