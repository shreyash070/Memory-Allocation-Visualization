import React from "react";
import "./Memory.css";
const Memoryslot = ({ size, allocationLeft }) => {
  const slotStyle = {
    width: `${size}px`,
    backgroundColor: "lightblue",
  };

  return (
    <div className="memory-slot" style={slotStyle}>
      {allocationLeft} KB
    </div>
  );
};

const Memory = () => {
  const defaultMemorySlots = [
    { size: 100, allocationLeft: 100 },
    { size: 250, allocationLeft: 250 },
    { size: 120, allocationLeft: 120 },
    { size: 500, allocationLeft: 500 },
  ];

  return (
    <div className="memory-container1">
      {defaultMemorySlots.map((slot, index) => (
        <Memoryslot
          key={index}
          size={slot.size}
          allocationLeft={slot.allocationLeft}
        />
      ))}
    </div>
  );
};

export default Memory;
