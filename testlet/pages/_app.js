import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
