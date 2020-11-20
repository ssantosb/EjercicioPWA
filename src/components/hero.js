import React from "react";
import { CardImg } from "reactstrap";


const Hero = (props) => {
      
      let itemHero = props.hero;
      console.log(itemHero);
      let desc = "";

      if (itemHero.description !== "") {
        desc = itemHero.description;
      } 
      else {
        desc = "No se encuentra la descripción de este personaje";
      }

      return (
        <div key={props.i}>
          <div className="card" key={props.i}>

            <CardImg
              className="cosa"
              height="300"
              alt="ImagenSuperheroe"
              src={itemHero.thumbnail.path + "." + itemHero.thumbnail.extension}
            />

            <div className="card-body">
              <div className="card-title">{itemHero.name}</div>
              <div className="card-text">{desc}</div>
            </div>
          </div>
        </div>
      );

};

export default Hero;