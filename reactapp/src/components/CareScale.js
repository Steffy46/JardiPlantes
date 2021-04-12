import React from "react";

///// Pictos ensoleillement et eau /////
import Sun from "../assets/sun.svg";
import Water from "../assets/water.svg";

///// Quantité d'eau et d'ensoleillement /////
const qualityLabel = {
  1: "peu",
  2: "modérément",
  3: "beaucoup",
};

function CareScale({ scaleValue, careType }) {
  const range = [1, 2, 3];

  const scaleType =
    careType === "light" ? (
      <img src={Sun} alt="Besoins d'ensoleillement des plantes" />
    ) : (
      <img src={Water} alt="Besoins en eau des plantes" />
    );

  return (
    // Ouverture pop-up "alerte" au clic sur les pictos
    <div
      style={{ cursor: "pointer" }}
      onClick={() =>
        alert(
          `Cette plante a besoin de ${qualityLabel[scaleValue]} ${
            careType === "light" ? "de lumière" : "d'arrosage"
          }`
        )
      }
    >
      {range.map((rangeElement) =>
        scaleValue >= rangeElement ? (
          <span key={rangeElement.toString()}>{scaleType}</span>
        ) : null
      )}
    </div>
  );
}

export default CareScale;
