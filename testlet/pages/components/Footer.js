import React from "react";

function Footer(props) {
  return (
    <div>
      <footer className="foot bg-primary text-light text-center py-3">    {/* Using external style sheet formatting */}
        <p className="mb-0">&copy; 2023 Testlet. All rights reserved.</p> {/* &copy gives copywrite */}
      </footer>
    </div>
  );
}

export default Footer;
