import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import dat from "@/public/go.json"; // Data shorthand used by lottie

function Going() {
  const container = useRef(null);

  useEffect(() => { // Loads our not logged in error animation in a loop
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

  return ( // Container for animation
    <div
      ref={container}
      style={{
        height: "80%",
        width: "100%",
        alignContent: "center",
      }}
    ></div>
  );
}

export default Going;
