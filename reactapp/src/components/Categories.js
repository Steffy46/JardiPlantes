import React from "react";

///// Styles /////
import "../styles/Categories.css";

function Categories({ setActiveCategory, categories, activeCategory }) {
  return (
    // Affichage des catégories des plantes -> Menu déroulant
    <div className="jp-categories">
      <select
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
        className="jp-categories-select"
      >
        <option value="">Catégories des plantes</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Réinitialisation des catégories = Tout afficher */}
      <button onClick={() => setActiveCategory("")}>Réinitialiser</button>
    </div>
  );
}

export default Categories;