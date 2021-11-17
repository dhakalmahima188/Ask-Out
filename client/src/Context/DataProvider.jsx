import React, { createContext, useState, useEffect } from "react";
import httpClient from "../Utils/httpClient";
export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [dataid, setdataid] = useState("");
  const [tag, settag] = useState("");
  const [tagvalue, settagvalue] = useState(false);
  useEffect(() => {
    httpClient
      .POST("employee/name", { username: localStorage.getItem("username") }, {})
      .then((response) => {
        setdataid(response.data.workspace_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [username] = useState(localStorage.getItem("username"));
  return (
    <DataContext.Provider
      value={{ username, dataid, tag, settag, tagvalue, settagvalue }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
