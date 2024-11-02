// src/components/Info.jsx
import { useState } from 'react';
import './InfoModule.css';

const Info = () => {
  const [selectedDiet, setSelectedDiet] = useState(null);

  const diets = {
    vegetarian: {
      title: "Vegetarian",
      description: "A diet that excludes meat, fish, and poultry but includes animal products such as eggs and dairy. It is primarily based on vegetables, fruits, legumes, nuts, seeds, and grains.",
      benefits: [
        "Lower risk of heart disease",
        "Reduced environmental impact",
        "Higher intake of fiber and antioxidants",
        "Lower risk of obesity"
      ],
      drawbacks: [
        "Potential B12 deficiency",
        "May need to supplement iron",
        "Limited protein sources",
        "Careful planning needed for balanced nutrition"
      ],
      className: 'vegetarian'
    },
    vegan: {
      title: "Vegan",
      description: "Excludes all animal products. It is based exclusively on plant foods, including fruits, vegetables, legumes, grains, nuts, and seeds.",
      benefits: [
        "Reduced carbon footprint",
        "High fiber content",
        "Lower risk of type 2 diabetes",
        "Protection against certain forms of cancer"
      ],
      drawbacks: [
        "Risk of B12, iron, and vitamin D deficiencies",
        "Limited food choices in some settings",
        "Need for careful protein combination",
        "May require multiple supplements"
      ],
      className: 'vegan'
    },
    "gluten-free": {
      title: "Gluten-Free",
      description: "Eliminates gluten, a protein found in wheat, barley, and rye. Essential for people with celiac disease or gluten sensitivity.",
      benefits: [
        "Management of celiac disease",
        "Reduced intestinal inflammation",
        "Improved digestion",
        "Increased energy"
      ],
      drawbacks: [
        "Higher food costs",
        "Limited food options when eating out",
        "Risk of fiber deficiency",
        "Some gluten-free products are highly processed"
      ],
      className: 'gluten-free'
    },
    ketogenic: {
      title: "Ketogenic",
      description: "High in fats, moderate in protein, and very low in carbohydrates. Makes the body use fat as its primary energy source instead of carbohydrates.",
      benefits: [
        "Effective weight loss",
        "Enhanced mental clarity",
        "Stable energy levels",
        "Appetite control"
      ],
      drawbacks: [
        "Initial 'keto flu' symptoms",
        "Difficult to maintain long-term",
        "Restricted food choices",
        "Risk of nutrient deficiencies"
      ],
      className: 'keto'
    },
    paleo: {
      title: "Paleo",
      description: "Based on foods similar to what our hunter-gatherer ancestors ate. Excludes processed foods, dairy, grains, and legumes.",
      benefits: [
        "Better blood sugar control",
        "Improved digestion",
        "Reduced inflammation",
        "Greater satiety"
      ],
      drawbacks: [
        "Expensive to maintain",
        "Limited whole grain benefits",
        "May lack calcium due to dairy restriction",
        "Difficult to follow in modern society"
      ],
      className: 'paleo'
    },
    pescetarian: {
      title: "Pescetarian",
      description: "Similar to vegetarian but includes fish and seafood. Excludes other meats but allows dairy products and eggs.",
      benefits: [
        "Rich in omega-3 fatty acids",
        "High-quality proteins",
        "Lower carbon footprint than meat diets",
        "Cardiovascular benefits"
      ],
      drawbacks: [
        "Potential mercury exposure from fish",
        "Can be expensive",
        "Sustainability concerns with fish sourcing",
        "May not be suitable for those with fish allergies"
      ],
      className: 'pescetarian'
    }
  };

  return (
    <div className="info-container">
      <h2 className="info-title">Dietary Information</h2>

      <div className="diet-grid">
        {Object.entries(diets).map(([key, diet]) => (
          <div 
            key={key} 
            className={`diet-card ${diet.className} ${selectedDiet === key ? 'active' : ''}`}
            onClick={() => setSelectedDiet(selectedDiet === key ? null : key)}
          >
            <h3>{diet.title}</h3>
            {selectedDiet === key && (
              <div className="diet-details">
                <p className="diet-description">{diet.description}</p>
                <div className="benefits-section">
                  <h4>Benefits:</h4>
                  <ul>
                    {diet.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="drawbacks-section">
                  <h4>Drawbacks:</h4>
                  <ul>
                    {diet.drawbacks.map((drawback, index) => (
                      <li key={index}>{drawback}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;