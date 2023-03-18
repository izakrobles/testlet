import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import { Roboto } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
