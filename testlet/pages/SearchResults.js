import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/clientApp";
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
      const filteredDocs = docs.filter((doc) => {
        const values = Object.values(doc.data()).flatMap((value) =>
          typeof value === "object" ? Object.values(value) : value
        );
        const hasMatch = values.some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(decodedSearch.toLowerCase())
        );
        return hasMatch;
      });
      const formattedDocs = filteredDocs.map((doc) => {
        const collectionName = doc.ref.path.split("/")[1];
        return { ...doc.data(), collectionName };
      });
      setResults(formattedDocs);
    }
    fetchResults();
  }, [decodedSearch]);

  return (
    <div>
      <h1>Searching for {decodedSearch}</h1>
      <ul>
        {results.map((result) => (
          <li key={(result,Math.random())}>
            <h5>{result.collectionName}</h5>
            <ul>
              {result.UserSets.map(
                (set) =>
                  set.toLowerCase().includes(decodedSearch.toLowerCase()) && (
                    <li key={(set.collectionName,Math.random())}>
                      <Link
                        href={{
                          pathname: "/viewSet",
                          query: { user: result.collectionName, set: set },
                        }}
                      >
                        <h5>{set}</h5>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
