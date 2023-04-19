import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

function Navbar() {
  const [userState] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    window.location.href = `/SearchResults?search=${searchTerm}`;
  };

  const handleSetSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("search-button").click();
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <nav className="nav">
      <Link href="/">
        <Image alt="logo" className="logo" src="/testlet.png" width={60} height={60} />
      </Link>
      <Link href="/">
        <div className="home">
          <h3>Home</h3>
        </div>
      </Link>
      <h3>Search</h3>
      <div className="search">
        <input
          type="text"
          className="box"
          value={searchTerm}
          onChange={handleSetSearch}
          onKeyDown={handleKeyPress}
        ></input>
        <button
          id="search-button"
          className="search-icon"
          onClick={handleSearch}
        >
          <Image alt="submit" className="submit" src="/search.png" width={35} height={35} />
        </button>
      </div>
      <ul>
        <li>
          <h3>
            <Link href="/personalSets">{userState && "Your Sets"}</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/createSet">{userState && "Create Set"}</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/account">{userState?.displayName}</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/about">About</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="login">{!userState && "Login"}</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/" onClick={handleLogout}>{userState && "Logout"}</Link>
          </h3>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
