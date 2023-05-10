/** @format */

import React from "react";

const Section = ({ title, items }) => {
  return (
    <div className="section">
      <h4 className="gray">{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.url}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Section;