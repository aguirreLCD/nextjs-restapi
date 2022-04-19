/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../../styles/Home.module.css";

import React from "react";
import Link from "next/link";

export async function getServerSideProps({ query }) {
  const { name } = query;
  console.log(query);
  const response = await fetch(`https://swapi.dev/api/planets/?search=${name}`);

  const data = await response.json();
  const planet = data.results;

  console.log("planet --------", planet);

  return {
    props: {
      planet,
    },
  };
}

function getFilms() {
  console.log("function");
}

export default function Planet({ planet }) {
  console.log(planet);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{}</title>
        </Head>

        <Link href="/">swapi</Link>

        <main className={styles.main}>
          {/* <h1 className={styles.title}>{planet.name}</h1> */}
          {/* <p className={styles.card}>{JSON.stringify(planet)}</p> */}

          <div className={styles.grid}>
            <ul className={styles.card}>
              {planet.map((result) => {
                const {
                  created,
                  name,
                  climate,
                  gravity,
                  terrain,
                  population,
                  rotation_period,
                  orbital_period,
                  diameter,
                  films,
                  residents,
                } = result;

                return (
                  <>
                    <div key={created}>
                      <li>{name}</li>

                      <li>Climate: {climate}</li>
                      <li>Gravity: {gravity}</li>
                      <li>Rotation pieriod: {rotation_period}</li>
                      <li>Orbital pieriod: {orbital_period}</li>
                      <li>Diameter: {diameter}</li>
                      <li>Terrain: {terrain}</li>
                      <li>Population: {population}</li>
                      <li>Films: {films.join("\t")}</li>
                      <li>Residents: {residents.join("\t")}</li>

                      {/* <p>
                        Films:
                        {films.map((film) => {
                          <p>{JSON.stringify(film)}</p>;
                          <p>{film}</p>;
                        })}
                      </p>

                      <p>
                        Residents:
                        {residents.map((resident) => {
                          <p>{JSON.stringify(resident)}</p>;
                        })}
                      </p> */}

                      {/* <p>Films: {films.join(", ")}</p>

                      <p>Residents: {residents.join(", ")}</p> */}
                    </div>

                    <div>
                      <button onClick={getFilms}>films</button>
                    </div>
                  </>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
