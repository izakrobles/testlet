import React from "react";
import Link from "next/link";
function Navbar() {
  return (
    <nav className="nav">
      <h1>
        <Link href="/">Testlet</Link>
      </h1>
      <home>
        <Link href="/">Home</Link>
      </home>
      <>
        <search action="/send-data-here" method="post">
          <label for="setName">Search</label>
          <input type="text" id="setName" name="setName" />
          <button type="submit">Submit</button>
        </search>
      </>
      <ul>
        <li>
          <a>
            <Link href="/personalSets">My Sets</Link>
          </a>
        </li>
        <li>
          <a>
            <Link href="/account">Account</Link>
          </a>
        </li>
        <li>
          <a>
            <Link href="/about">About</Link>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
