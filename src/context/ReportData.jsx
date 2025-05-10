import React, { useState } from "react";
import { ReportContext } from "./ReportContext";

const ReportData = ({ children }) => {
  const [graphBar, setGraphBar] = useState();
  function changeGraph(image) {
    setGraphBar(image);
  }
  return (
    <ReportContext.Provider value={{ graphBar, changeGraph }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportData;
