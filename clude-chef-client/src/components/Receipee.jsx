import React from "react";

const Recipe = ({ recipe }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "500px",
        margin: "20px auto",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "15px",
        }}
      >
        {recipe?.name}
      </h3>

      <div>
        <strong
          style={{
            fontSize: "18px",
            color: "#333",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Ingredients:
        </strong>
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <ul style={{ listStylePosition: "inside" }}>
            {recipe?.ingredients.map((list, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#fafafa",
                  display: "flex",
                  marginLeft: "20px",
                }}
              >
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "16px",
                    color: "#555",
                  }}
                >
                  <strong>{list?.name}:</strong>
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "16px",
                    color: "#555",
                    marginLeft: "10px",
                  }}
                >
                  {typeof list?.quantity === "string" ||
                  typeof list?.quantity === "number"
                    ? list?.quantity
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <strong
          style={{
            fontSize: "18px",
            color: "#333",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Procedure:
        </strong>
        <ol
          style={{
            paddingLeft: "20px",
            fontSize: "16px",
            color: "#555",
          }}
        >
          {recipe?.procedure.map((steps, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {steps}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Recipe;
