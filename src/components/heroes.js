import React, { useEffect, useState } from "react";
import Hero from './hero';
const crypto = require("crypto");


const Heroes = () => {

  const [heroes, setHeroes] = useState([]);
  const [mensajeOff, setMensajeOff] = useState("");
  const pubKey = "ed65b22de54d5a237c1e6a5eadffb7b6";
  const pivKey = "77196d67ce6f96125326fa0c8fdce6eb2efbea76";

  useEffect(() => {

    if (!navigator.onLine) {
      if (localStorage.getItem("heroes") === null) {

        setMensajeOff("No hay conexión detectada. Intentelo de nuevo.");

      } else {

        setMensajeOff("Superheroes de Marvel");
        const her1 = JSON.parse(localStorage.getItem("heroes"));
        setHeroes(her1);

      }

    } else {

      const timestamp = Date.now();
      const stringHash = timestamp.toString() + pivKey + pubKey;
      let hash = crypto.createHash("md5").update(stringHash).digest("hex");
      const URL ="https://gateway.marvel.com:443/v1/public/characters?apikey=" +pubKey +"&hash=" +hash +"&ts=" +timestamp;

      fetch(URL)
        .then((res) => res.json())
        .then((res) => {

          setHeroes(res.data.results);

          setMensajeOff("Superheroes de Marvel");

          localStorage.setItem("heroes", JSON.stringify(res.data.results));

        })
        .catch((err) => console.log(err));
    }
  }, []);

  const dataHeroes = () =>{
      return heroes.map((item, index) => {
      console.log(item);

      return (
        <div>
          <Hero hero={item} i={index} />
        </div>
      );
    })
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="titulo">{mensajeOff}</h1>
        </div>
        <div className="col-12">
          <div className="card-group">{dataHeroes()}</div>
        </div>
      </div>
    </div>
  );
};

export default Heroes;