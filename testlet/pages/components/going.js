import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import dat from "@/public/go.json";

function Going() {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      animationData: dat,
      container: container.current,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div
      ref={container}
      style={{
        height: "80%",
        width: "100%",
        alignContent: 'center',
      }}
    ></div>
  );
}

export default Going;
