import React, { useContext } from "react";
import "./sidebar.css";
import { DataContext } from "../../Context/DataProvider";

function Sidebar() {
  const { settag, settagvalue } = useContext(DataContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    settag((preState) => ({
      ...preState,
      [name]: value,
    }));
    settagvalue(true);
  };
  return (
    <div>
      <div className="box">
        <select name="tag" id="tag" onChange={handleChange}>
          <option value="none" selected disabled hidden>
            Apply Tags{" "}
          </option>{" "}
          <option value="IT"> IT </option>{" "}
          <option value="FINANCE"> FINANCE </option>{" "}
          <option value="HR"> HR </option>{" "}
        </select>{" "}
      </div>
    </div>
  );
}

export default Sidebar;
