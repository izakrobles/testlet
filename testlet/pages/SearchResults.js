import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "./components/loading";
import { Card, Container } from "react-bootstrap";

function SearchResults() {
  const router = useRouter();
  const { search } = router.query;

  let decodedSearch = decodeURIComponent(search);

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
    fetchResults();
  }, [decodedSearch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="my-5">
      <h1>
        {results.length > 0
          ? `Search Results: ${decodedSearch}`
          : "No Results Found"}
      </h1>
      <p>&nbsp;</p>
      <hr></hr>
      <ul>
        {results.map((result) => (
          <li key={(result, Math.random())}>
            <h5>{result.collectionName}</h5>
            <ul>
              {result.UserSets.map(
                (set) =>
                  set.toLowerCase().includes(decodedSearch.toLowerCase()) && (
                    <li key={(set.collectionName, Math.random())}>
                      <Card bg="primary" style={{ width: "50rem" }}>
                        <Link
                          href={{
                            pathname: "/viewSet",
                            query: { user: result.collectionName, set: set },
                          }}
                        >
                          <Card.Body>{set}</Card.Body>
                        </Link>
                      </Card>
                      <p>&nbsp;</p>
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default SearchResults;
