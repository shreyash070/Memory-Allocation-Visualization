import React from "react";
import "./Explanation.css";

const Explanation = () => {
  return (
    <div>
      <div className="text12">Memory Allocation Algorithms</div>
      <p>
        Memory allocation algorithms are used by operating systems to allocate
        memory space efficiently.
      </p>

      <div className="text12">First Fit</div>
      <ul>
        <li>
          Iterates through the available memory blocks starting from the
          beginning.
        </li>
        <li>
          Allocates the first block that is large enough to accommodate the
          requested memory.
        </li>
        <li>Simple and fast but may lead to fragmentation.</li>
      </ul>

      <div className="text12">Next Fit</div>
      <ul>
        <li>
          Similar to first fit, but starts searching for free memory from the
          last allocation point.
        </li>
        <li>
          Reduces the overhead of searching the entire memory space but may
          still lead to fragmentation.
        </li>
      </ul>

      <div className="text12">Best Fit</div>
      <ul>
        <li>
          Searches for the smallest block of memory that is large enough to hold
          the requested memory.
        </li>
        <li>
          Minimizes wasted memory but may result in more fragmentation compared
          to first fit and next fit.
        </li>
      </ul>

      <div className="text12">Worst Fit</div>
      <ul>
        <li>
          Allocates memory in the largest available block, leaving the smallest
          remaining free space.
        </li>
        <li>
          Can lead to larger chunks of wasted memory and more fragmentation.
        </li>
      </ul>
    </div>
  );
};

export default Explanation;
