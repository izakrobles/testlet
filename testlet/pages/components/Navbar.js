import React from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="nav">
      <Link href="/">
      <Image className="logo" src="/testlet.png" width={55} height={55} ></Image>       
      </Link>
      <Link href="/">
        <div className="home">
          <>Home</>
        </div>
      </Link>
      <>
        <search className="search" action="/send-data-here" method="post">
          <label htmlFor="setName">Search</label>
          <input type="text" id="setName" name="setName" />
          <button type="submit">Submit</button>
        </search>
      </>
      <ul>
        <li>
          <>
            <Link href="/personalSets">My Sets</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/createSet">Create Set</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/account">Account</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/about">About</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/LoginPages/login">Login</Link>
          </>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
