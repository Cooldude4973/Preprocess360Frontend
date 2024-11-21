import React, { useState , useEffect  } from "react";

const AnalyzeHeadersGrid = () => {
  const [headers, setHeaders] = useState([]);

  const analyzeFile = async () => {
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze file");
      }

      const headersData = await response.json();
      setHeaders(headersData);
    } catch (error) {
      console.error("Error analyzing file:", error);
    }
    
  };

  useEffect(() => {
    analyzeFile();
  }, []);

  return (
    <div className="p-4">
      {/* <button
        onClick={analyzeFile}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4 items-center"
      >
        Analyze
      </button> */}
      <div className="grid grid-cols-4 gap-4">
        {headers.map((header, index) => (
          <label key={index} className="flex items-center space-x-2 ml-2 mr-2">
            <input type="checkbox" value={header} name="options"  id="headerCheckBox"/>
            <span>{header}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AnalyzeHeadersGrid;
