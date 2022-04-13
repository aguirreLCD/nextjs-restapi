/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";

const defaultEndpoint = "https://swapi.dev/api/planets/";

export async function getServerSideProps() {
  const response = await fetch(defaultEndpoint);

  const planets = await response.json();

  // const planets.next = JSON.stringify(planets);
  console.log("planets --------", planets);
  // console.log("planets next --------", planets.next);
  // console.log("info --------", info);

  return {
    props: {
      planets,
    },
  };
}

export default function Home({ planets }) {
  const { results: defaultResults = [] } = planets;

  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...planets,
    current: defaultEndpoint,
  });

  const { current } = page;

  // console.log("planets.next", planets.next);
  // console.log("current 40", current);
  // console.log("page 41", page);

  useEffect(() => {
    // console.log("current 44", current);
    // console.log("45 ", defaultEndpoint);

    if (current === defaultEndpoint) return;

    async function request() {
      // console.log("current 50", current);

      const res = await fetch(current);
      const nextPlanets = await res.json();
      // console.log("54", nextPlanets);

      updatePage({
        current,
        ...nextPlanets,
      });

      if (!nextPlanets?.previous) {
        updateResults(nextPlanets.results);
        return;
      }

      updateResults((previous) => {
        return [...previous, ...nextPlanets.results];
      });
    }
    request();
  }, [current]);

  // console.log(planets.planets);

  function handleLoadMore() {
    // console.log(current);

    updatePage((previous) => {
      return {
        ...previous,
        current: page?.next,
      };
    });
  }

  // console.log("88", current);

  return (
    <div className={styles.container}>
      <Head>
        <title>SWAPI</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SWAPI</h1>

        <p className={styles.description}>
          The Star Wars API <code className={styles.code}>swapi.dev</code>
        </p>

        <ul className={styles.grid}>
          {results.map((result) => {
            const { created, name } = result;

            return (
              <li key={created} className={styles.card}>
                <a href="https://nextjs.org/docs">
                  <img
                    className={styles.image}
                    src={
                      "https://images.pexels.com/photos/6320601/pexels-photo-6320601.jpeg"
                    }
                    alt={`${name}`}
                  ></img>
                  <h2>{name}</h2>
                </a>
              </li>
            );
          })}
        </ul>

        <p>
          <button onClick={handleLoadMore}>Load More</button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </a>
      </footer>
    </div>
  );
}
