import React, { useState } from "react";
import { collection } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from "react-firebase-hooks/firestore";
import { db,auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";

function SearchResults() {
    const router = useRouter();
    const { search } = router.query;
  
    const decodedSet = decodeURIComponent(search);

    return (
        <h1>Searching for {decodedSet}</h1>       
    )
}

export default SearchResults;