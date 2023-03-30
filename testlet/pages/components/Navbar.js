import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "../../firebase/clientApp"


function Navbar() {
  const local = auth.currentUser;
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
        <form className="search" action="/send-data-here" method="post">
          <label htmlFor="setName">Search</label>
          <input className="box" type="text" id="setName" name="setName" />
          <Link className="search-icon" href="">
            <Image className="submit" src="/search.png" width={30} height={30}></Image>
          </Link>
        </form>
        
      </>
      <ul>
        <li>
          <>
            <Link href="/personalSets">{local != null && "Your Sets"}</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/createSet">Create Set</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/account">{local != null && local.displayName}</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/about">About</Link>
          </>
        </li>
        <li>
          <>
            <Link href="/LoginPages/loginOptions">{local == null && "Login"}</Link>
          </>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
