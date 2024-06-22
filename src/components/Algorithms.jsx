import React, { useState } from "react";
import "./Algorithms.css";

const MemorySlot = ({ size, allocationLeft }) => {
  return <div className="memory-slot">{allocationLeft} KB</div>;
};

const SlotsNextFit = ({ size, allocationLeft, allocatedSizes }) => {
  const totalAllocatedSize = allocatedSizes.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const remainingSpace = Math.max(size - totalAllocatedSize, 0);
  const slotStyle = {
    width: `${size}px`,
    backgroundColor: "lightblue",
    position: "relative",
  };

  return (
    <div>
      <div className="memory-slot" style={slotStyle}>
        {allocatedSizes.map((allocatedSize, index) => {
          const percentage = (allocatedSize / size) * 100;
          return (
            <div
              key={index}
              className="allocated-space"
              style={{
                position: "absolute",
                border: "2px solid black",
                height: "100px",
                width: `${percentage}%`,
                backgroundColor: "yellow",
                top: 0,
                left:
                  index === 0
                    ? 0
                    : allocatedSizes
                        .slice(0, index)
                        .reduce((acc, curr) => acc + curr, 0),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {allocatedSize >= 24 && (
                <div className="process-text">{allocatedSize} KB</div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px" }}
      >
        Remaining: {remainingSpace} KB
      </div>
    </div>
  );
};

const Algorithms = () => {
  const [memorySlotsNextFit, setMemorySlotsNextFit] = useState([
    { size: 100, allocationLeft: 100, allocatedSizes: [] },
    { size: 250, allocationLeft: 250, allocatedSizes: [] },
    { size: 120, allocationLeft: 120, allocatedSizes: [] },
    { size: 500, allocationLeft: 500, allocatedSizes: [] },
  ]);

  const [memorySlotsNextFit2, setMemorySlotsNextFit2] =
    useState(memorySlotsNextFit);

  const [memorySlotsBestFit, setMemorySlotsBestFit] =
    useState(memorySlotsNextFit);

  const [memorySlotsWorstFit, setMemorySlotsWorstFit] =
    useState(memorySlotsNextFit);

  const [nextFitIndex, setNextFitIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const ForNextBit = (inputValue) => {
    const inputNumber = parseInt(inputValue);
    if (!isNaN(inputNumber)) {
      let cnt = 0;
      const updatedSlots = memorySlotsNextFit.map((slot) => {
        if (slot.allocationLeft >= inputNumber && cnt !== 1) {
          cnt += 1;
          const allocatedSizes = [...slot.allocatedSizes, inputNumber];
          return {
            ...slot,
            allocationLeft: slot.allocationLeft - inputNumber,
            allocatedSizes,
          };
        } else {
          return slot;
        }
      });
      if (cnt === 0) {
        alert("FIRST BIT: OOPS! Not having enough memory.");
      }
      setMemorySlotsNextFit(updatedSlots);
      setInputValue("");
    }
  };

  const ForFirstBit = (inputValue) => {
    const inputNumber = parseInt(inputValue);
    if (!isNaN(inputNumber)) {
      let cnt = 0;
      let updatedSlots = [...memorySlotsNextFit2];
      let startIndex = nextFitIndex;
      for (let i = 0; i < updatedSlots.length; i++) {
        const index = (startIndex + i) % updatedSlots.length;
        const slot = updatedSlots[index];
        if (slot.allocationLeft >= inputNumber && cnt !== 1) {
          cnt += 1;
          const allocatedSizes = [...slot.allocatedSizes, inputNumber];
          updatedSlots[index] = {
            ...slot,
            allocationLeft: slot.allocationLeft - inputNumber,
            allocatedSizes,
          };
          setNextFitIndex((index + 1) % updatedSlots.length);
        }
      }
      if (cnt === 0) {
        alert("NEXT BIT: OOPS! Not enough memory available.");
      }
      setMemorySlotsNextFit2(updatedSlots);
      setInputValue("");
    }
  };

  const ForBestBit = (inputValue) => {
    const inputNumber = parseInt(inputValue);
    if (!isNaN(inputNumber)) {
      let updatedSlots = [...memorySlotsBestFit];
      let bestFitIndex = -1;
      let minSpace = Infinity;
      for (let i = 0; i < updatedSlots.length; i++) {
        const slot = updatedSlots[i];
        const spaceDiff = slot.allocationLeft - inputNumber;
        if (spaceDiff >= 0 && spaceDiff < minSpace) {
          bestFitIndex = i;
          minSpace = spaceDiff;
        }
      }
      if (bestFitIndex !== -1) {
        const allocatedSizes = [
          ...updatedSlots[bestFitIndex].allocatedSizes,
          inputNumber,
        ];
        updatedSlots[bestFitIndex] = {
          ...updatedSlots[bestFitIndex],
          allocationLeft: minSpace,
          allocatedSizes,
        };
        setMemorySlotsBestFit(updatedSlots);
      } else {
        alert("BEST BIT: OOPS! Not enough memory available.");
      }
      setInputValue("");
    }
  };

  const ForWorstBit = (inputValue) => {
    const inputNumber = parseInt(inputValue);
    if (!isNaN(inputNumber)) {
      let updatedSlots = [...memorySlotsWorstFit];
      5;
      let worstFitIndex = -1;
      let maxSpace = -Infinity;
      for (let i = 0; i < updatedSlots.length; i++) {
        const slot = updatedSlots[i];
        const spaceDiff = slot.allocationLeft - inputNumber;
        if (spaceDiff >= 0 && spaceDiff > maxSpace) {
          worstFitIndex = i;
          maxSpace = spaceDiff;
        }
      }
      if (worstFitIndex !== -1) {
        const allocatedSizes = [
          ...updatedSlots[worstFitIndex].allocatedSizes,
          inputNumber,
        ];
        updatedSlots[worstFitIndex] = {
          ...updatedSlots[worstFitIndex],
          allocationLeft: maxSpace,
          allocatedSizes,
        };
        setMemorySlotsWorstFit(updatedSlots);
      } else {
        alert("WORST BIT: OOPS! Not enough memory available.");
      }
      setInputValue("");
    } else {
      alert("Please enter a valid number.");
    }
  };

  let totalFragmentation1 = 0;
  memorySlotsNextFit.forEach((slot) => {
    if (
      slot.size != 0 &&
      slot.allocationLeft != 0 &&
      slot.size - slot.allocationLeft != 0
    ) {
      totalFragmentation1 += slot.allocationLeft;
    }
    // console.log(slot.allocationLeft);
  });

  let totalFragmentation2 = 0;
  memorySlotsNextFit2.forEach((slot) => {
    if (
      slot.size != 0 &&
      slot.allocationLeft != 0 &&
      slot.size - slot.allocationLeft != 0
    ) {
      totalFragmentation2 += slot.allocationLeft;
    }
  });

  let totalFragmentation3 = 0;
  memorySlotsBestFit.forEach((slot) => {
    if (
      slot.size != 0 &&
      slot.allocationLeft != 0 &&
      slot.size != slot.allocationLeft
    ) {
      totalFragmentation3 += slot.allocationLeft;
    }
  });

  let totalFragmentation4 = 0;
  memorySlotsWorstFit.forEach((slot) => {
    if (
      slot.size != 0 &&
      slot.allocationLeft != 0 &&
      slot.size != slot.allocationLeft
    ) {
      totalFragmentation4 += slot.allocationLeft;
    }
  });

  return (
    <div className="main2">
      <div className="Inputuser">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter your input here"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            ForNextBit(inputValue);
            ForFirstBit(inputValue);
            ForBestBit(inputValue);
            ForWorstBit(inputValue);
          }}
        >
          SUBMIT
        </button>
      </div>

      <div className="text1">First Bit</div>
      <div className="memory-container">
        {memorySlotsNextFit.map((slot, index) => (
          <SlotsNextFit
            key={index}
            size={slot.size}
            allocationLeft={slot.allocationLeft}
            allocatedSizes={slot.allocatedSizes}
          />
        ))}
      </div>

      <div className="text123">
        <p>Total Fragmentation: {totalFragmentation1}</p>
      </div>
      <div className="text1">Next Bit</div>
      <div className="memory-container">
        {memorySlotsNextFit2.map((slot, index) => (
          <SlotsNextFit
            key={index}
            size={slot.size}
            allocationLeft={slot.allocationLeft}
            allocatedSizes={slot.allocatedSizes}
          />
        ))}
      </div>
      <div className="text123">
        <p>Total Fragmentation: {totalFragmentation2}</p>
      </div>
      <div className="text1">Best Bit</div>
      <div className="memory-container">
        {memorySlotsBestFit.map((slot, index) => (
          <SlotsNextFit
            key={index}
            size={slot.size}
            allocationLeft={slot.allocationLeft}
            allocatedSizes={slot.allocatedSizes}
          />
        ))}
      </div>
      <div className="text123">
        <p>Total Fragmentation: {totalFragmentation3}</p>
      </div>
      <div className="text1">Worst Bit</div>
      <div className="memory-container">
        {memorySlotsWorstFit.map((slot, index) => (
          <SlotsNextFit
            key={index}
            size={slot.size}
            allocationLeft={slot.allocationLeft}
            allocatedSizes={slot.allocatedSizes}
          />
        ))}
      </div>
      <div className="text123">
        <p>Total Fragmentation: {totalFragmentation4}</p>
      </div>
    </div>
  );
};

export default Algorithms;
