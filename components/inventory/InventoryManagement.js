import React from "react";
import InventoryMatching from "./inventoryMatching/InventoryMatching";
import InventorySpacing from "./InventorySpacing";

const InventoryManagement = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, flexDirection: "row", marginLeft: "28px" }}>
        <InventoryMatching />
      </div>

      {/* <div style={{ flex: 1 }}>
        <InventorySpacing />
      </div> */}
    </div>
  );
};

export default InventoryManagement;
