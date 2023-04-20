import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import dat from "@/public/loading.json";

function Loading() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      animationData: dat,
      container: container.current,
      loop: true,
      autoplay: true,
    });
  }, []);

  return (
    <div
      ref={container}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
}

export default Loading;
