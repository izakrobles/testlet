import React, { useState } from "react";
import Link from "next/link";

function personalSets() {
  return (
    <>
      <title>Your Sets</title>
      <h1>Your Sets:</h1>
      <Link href="/viewSets">
        <div className="home">
          <h2>Set_00</h2>
        </div>
      </Link>
    </>
  );
}
export default personalSets;
