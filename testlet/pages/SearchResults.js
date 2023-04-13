import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from "react-firebase-hooks/firestore";
import { db,auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import Link from "next/link";

function SearchResults() {
    const router = useRouter();
    const { search } = router.query;

    const decodedSearch = decodeURIComponent(search);

    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchResults() {
            const q = query(collection(db, "sets"));
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs;
            const filteredDocs = docs.map((doc) => {
              const collectionName = doc.ref.path.split('/')[1];
              const values = Object.values(doc.data()).flatMap((value) =>
                typeof value === "object" ? Object.values(value) : value
              );
              const hasMatch = values.some((value) =>
                typeof value === "string"
                  ? value.toLowerCase().includes(decodedSearch.toLowerCase())
                  : false
              );
              return hasMatch ? { ...doc.data(), collectionName } : null;
            }).filter(Boolean);
            setResults(filteredDocs);
        }            
        fetchResults();
    }, [decodedSearch]);

    return (
        <div>
            <h1>Searching for {decodedSearch}</h1>
            <ul>
            {results.map((result) => (
                <li key={result.id}>
                <h2>{result.collectionName}</h2>
                <ul>
                    {result.UserSets.map((set) => (
                    <li key={set.id}>
                        <Link href={{ pathname: "/viewSet", query: { user: result.collectionName, set: set } }}>
                            <h2>{set}</h2>
                        </Link>
                    </li>
                    ))}
                </ul>
                </li>
            ))}
            </ul>

        </div>
    )
}

export default SearchResults;
