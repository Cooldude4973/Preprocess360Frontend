import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import DropdownMenu from './DropdownMenu';
import AnalyzeHeadersGrid from './AnalyzeHeaders';
import ImputeComponent from './ImputeComponent';
import { Database, Table, ChartBar, Trash, Moon, Sun } from 'lucide-react';

// Node Components
const NodeWrapper = ({ children, label }) => (
  <div className="flex flex-col items-center">
    {children}
    <span className="text-xs font-medium mt-2">{label}</span>
  </div>
);

const DataNode = ({ data }) => (
  <NodeWrapper label={data.label}>
    <div
      className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex items-center justify-center border-2 border-zinc-300"
      style={{
        background: 'radial-gradient(circle farthest-side, #FEDEB6 50%, #FEC27B)',
      }}
    >
      <Handle type="target" position="left" style={{ background: '#555' }} />
      <Database className="w-5 h-5" />
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  </NodeWrapper>
);

const PreprocessNode = ({ data }) => (
  <NodeWrapper label={data.label}>
    <div
      className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex items-center justify-center border-2 border-zinc-300"
      style={{
        background: 'radial-gradient(circle farthest-side, #FEDEB6 50%, #FEC27B)',
      }}
    >
      <Handle type="target" position="left" style={{ background: '#555' }} />
      <Table className="w-5 h-5" />
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  </NodeWrapper>
);

const VisualizationNode = ({ data }) => (
  <NodeWrapper label={data.label}>
    <div
      className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex items-center justify-center border-2 border-zinc-300"
      style={{
        background: 'radial-gradient(circle farthest-side, #FEDEB6 50%, #FEC27B)',
      }}
    >
      <Handle type="target" position="left" style={{ background: '#555' }} />
      <ChartBar className="w-5 h-5" />
      <Handle type="source" position="right" style={{ background: '#555' }} />
    </div>
  </NodeWrapper>
);

const nodeTypes = {
  data: DataNode,
  preprocess: PreprocessNode,
  visualize: VisualizationNode,
};

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: 'data-1',
      type: 'data',
      data: { label: 'Data Node' },
      position: { x: 100, y: 100 },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [visualizationDropdownVisible, setVisualizationDropdownVisible] = useState(false);
  const [dataDropdownVisible, setDataDropdownVisible] = useState(false);  // New state for "Add Data" dropdown
  const [darkMode, setDarkMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Tracks dialog visibility
  const [dialogContent, setDialogContent] = useState('');  // Stores dialog content
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // const uploadFile = async () => {
  //   if (!file) return alert('Please select a file.');  // Check if file is selected
  //   const formData = new FormData();
  //   formData.append('file', file);  // Append the file to the FormData object

  //   try {
  //     const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },  // Ensure the request is sent as form data
  //     });
  //     setData(response.data);  // Store the response data from the Flask server
  //   } catch (error) {
  //     console.error('Error uploading file:', error);  // Log any errors
  //   }
  // };

  const uploadFile = async () => {
    if (!file) return alert('Please select a file.');  // Check if file is selected
    const formData = new FormData();
    formData.append('file', file);  // Append the file to the FormData object

    try {
      // Send the formData using fetch
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',  // Use POST method
        body: formData,  // Send formData as the request body
      });

      // Check if the response is okay (status code 200-299)
      if (response.ok) {
        const data = await response.json();  // Parse the JSON response
        setData(data);
        console.log(data) // Store the response data
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);  // Log any errors
    }
  };


  const analyzeFile = async () => {
    try {
      // Assuming the `file` data is in a variable `df` on the backend
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // You can include additional payload data here if needed
      });

      if (!response.ok) {
        throw new Error('Failed to analyze file');
      }

      const headers = await response.json();
      console.log(headers);

      // Display the headers in the UI
      const outputElement = document.getElementById('arrayOutput');
      if (outputElement) {
        outputElement.textContent = `Headers: ${headers.join(', ')}`;
      }
    } catch (error) {
      console.error('Error analyzing file:', error);
    }
  };



  const onNodeDoubleClick = (_, node) => {
    // Check the node type or label
    if (node.type === 'data' || node.data.label === 'Impute' || node.data.label === 'Standardize Data' || node.data.label === 'Delete Outliers') {
      setIsDialogOpen(true);          // Open the dialog
      setDialogContent(node.data.label); // Set the dialog content
      setSelectedNodeData(node);      // Store the entire node in state
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);          // Close the dialog
    setDialogContent('');            // Clear dialog content
    setSelectedNodeData(null);       // Clear the selected node data
  };


  // const onConnect = async (params) => {
  //   setEdges((eds) => addEdge(params, eds)); // Add the edge to the canvas

  //   // Check if the connection is between "Data Node" and "Remove Duplicates Node"
  //   console.log(params);
  //   if (params.source.includes('data') && params.target.includes('preprocess')) {
  //     try {
  //       // Call the Flask endpoint to remove duplicates
  //       const response = await fetch('http://127.0.0.1:5000/removeduplicates', {
  //         method: 'POST',
  //       });

  //       if (response.ok) {
  //         const result = await response.json(); // Parse the response JSON
  //         alert(`Duplicates removed: ${result.duplicate_count}`);
  //         console.log(`Duplicates removed: ${result.duplicate_count}`);
  //       } else {
  //         console.error('Failed to remove duplicates.');
  //         alert('Error: Could not remove duplicates.');
  //       }
  //     } catch (error) {
  //       console.error('Error connecting to the backend:', error);
  //       alert('Error connecting to the server.');
  //     }
  //   }
  // };

  const onConnect = async (params) => {
    setEdges((eds) => addEdge(params, eds)); // Add the edge to the canvas

    // Check if the connection is between "Data Node" and the specific "Remove Duplicates Node"
    // console.log(params.target);
    if (params.source.includes('data') && params.target.includes('Duplicates')) {
      try {
        // Call the Flask endpoint to remove duplicates
        const response = await fetch('http://127.0.0.1:5000/removeduplicates', {
          method: 'POST',
        });

        if (response.ok) {
          const result = await response.json(); // Parse the response JSON
          alert(`Duplicates removed: ${result.duplicate_count}`);
          console.log(`Duplicates removed: ${result.duplicate_count}`);
        } else {
          console.error('Failed to remove duplicates.');
          alert('Error: Could not remove duplicates.');
        }
      } catch (error) {
        console.error('Error connecting to the backend:', error);
        alert('Error connecting to the server.');
      }
    }

    else if (params.source.includes('Standardize') && params.target.includes('Outliers') || params.source.includes('data') && params.target.includes('Outliers')) {
      try {
        // Call the Flask endpoint to remove duplicates
        // alert("This shit is working");
        const response = await fetch('http://127.0.0.1:5000/removeoutlier', {
          method: 'POST',
        });

        if (response.ok) {
          const result = await response.json(); // Parse the response JSON
          alert(`Outliers removed: ${result['Outliers Count']}`); // Use the correct key          
          console.log(`Outliers removed: ${result.outliers_count}`);
        } else {
          console.error('Failed to remove outliers.');
          alert('Error: Could not remove outliers.');
        }
      } catch (error) {
        console.error('Error connecting to the backend:', error);
        alert('Error connecting to the server.');
      }
    }
    else if (params.target.includes('Save Data')) {
      try {
        // Call the Flask endpoint to remove duplicates
        // alert("This shit is working");
        await fetch('http://127.0.0.1:5000/download', {
          method: 'GET',
        })
          .then(response => response.blob())  // Convert the response to a Blob
          .then(blob => {
            // Create a link element, use it to trigger the download, then remove it
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Preprocess360.csv';  // The file name to be downloaded
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          })

      } catch (error) {
        console.error('Error connecting to the backend:', error);
        alert('Error connecting to the server.');
      }
    }
  };


  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const onEdgeClick = (_, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const deleteSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  };

  const deleteSelectedEdge = () => {
    if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  const createNode = (type, position, label) => {
    const newNode = {
      id: `${type}-${label}-${nodes.length + 1}`,
      type,
      data: { label },
      position,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleVisualizationDropdown = () => {
    setVisualizationDropdownVisible((prev) => !prev);
  };

  const toggleDataDropdown = () => {  // Function to toggle the "Add Data" dropdown
    setDataDropdownVisible((prev) => !prev);
  };



  const handlePreprocessChange = (action) => {
    setDropdownVisible(false);

    let label = '';
    switch (action) {
      case 'removeDuplicates':
        label = "Remove Duplicates";
        break;
      case 'removeNullValues':
        label = 'Remove Null Values';
        break;
      case 'deleteOutliers':
        label = 'Delete Outliers';
        break;
      case 'normalizeData':
        label = 'Normalize Data';
        break;
      case 'standardizeData':
        label = 'Standardize Data';
        break;
      case 'impute':
        label = 'Impute';
        break;
      case 'unique':
        label = 'Display Unique';
        break;

      default:
        label = 'Preprocess Action';
    }

    createNode('preprocess', { x: 300, y: 100 }, label);
  };

  const handleDataChange = (action) => {
    setDropdownVisible(false); // Close the dropdown after selection

    let label = '';
    switch (action) {
      case 'file':
        label = 'File';
        break;
      case 'csvFileImport':
        label = 'CSV File';
        break;
      case 'datasets':
        label = 'Datasets';
        break;
      case 'sqlTable':
        label = 'SQL Table';
        break;
      case 'dataTable':
        label = 'Data Table';
        break;
      case 'dataInfo':
        label = 'Data Info';
        break;
      case 'saveData':
        label = 'Save Data';
        break;
      default:
        label = 'Data';
    }

    createNode('data', { x: 100, y: 100 }, label); // Create the node with the selected label
  };


  const handleVisualizationChange = (action) => {
    setVisualizationDropdownVisible(false);

    let label = '';
    switch (action) {
      case 'createChart':
        label = 'Create Chart';
        break;
      case 'createGraph':
        label = 'Create Graph';
        break;
      case 'createBar':
        label = 'Bar Plot';
        break;
      case 'createLine':
        label = 'Line Plot';
        break;
      case 'createViolin':
        label = 'Violin Plot';
        break;
      case 'createScatter':
        label = 'Scatter Plot';
        break;
      case 'createSilhouette':
        label = 'Silhouette Plot';
        break;
      case 'createHeatMap':
        label = 'Heat Map';
        break;
      default:
        label = 'Visualization Action';
    }

    createNode('visualize', { x: 500, y: 100 }, label);
  };

  async function dataImputer() {
    const missingVal = document.getElementById('missingVal').value;
    const checkBoxes = document.getElementsByName('options'); // Select all checkboxes with name 'options'
    const strategy = document.getElementById('strategyDrop').value;

    console.log("Missing Value:", missingVal);

    // Collect selected columns
    const columns = [];
    checkBoxes.forEach(box => {
      if (box.checked) {
        columns.push(box.value);
        console.log(box.value + ' is checked');
      }
    });

    console.log("Selected Columns:", columns);
    console.log("Strategy:", strategy);

    // Create form data
    const formData = new FormData();
    formData.append('mval', missingVal);
    formData.append('columns', JSON.stringify(columns)); // Serialize array as a JSON string
    formData.append('strategy', strategy);

    try {
      const response = await fetch('http://localhost:5000/impute', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json(); // Parse the response data (assumes JSON response)
      console.log("Impute Result:", result);
      alert("Data imputation completed successfully!");
    } catch (error) {
      console.error("Error during data imputation:", error);
      alert("An error occurred while imputing data.");
    }
  }

  async function standardizeData() {
    // const missingVal = document.getElementById('missingVal').value;
    const checkBoxes = document.getElementsByName('options'); // Select all checkboxes with name 'options'
    // const strategy = document.getElementById('strategyDrop').value;

    // console.log("Missing Value:", missingVal);

    // Collect selected columns
    const columns = [];
    checkBoxes.forEach(box => {
      if (box.checked) {
        columns.push(box.value);
        console.log(box.value + ' is checked');
      }
    });

    console.log("Selected Columns:", columns);
    // console.log("Strategy:", strategy);

    // Create form data
    const formData = new FormData();
    // formData.append('mval', missingVal);
    formData.append('columns', JSON.stringify(columns)); // Serialize array as a JSON string
    // formData.append('strategy', strategy);
    console.log(columns)

    try {
      const response = await fetch('http://localhost:5000/standardize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json(); // Parse the response data (assumes JSON response)
      console.log("Standardization Result:", result);
      alert("Selected columns Standardized successfully!");
    } catch (error) {
      console.error("Error during data imputation:", error);
      alert("An error occurred while imputing data.");
    }
  }

  // const checkConnection = (nodeId1, nodeId2) => {
  //   const isConnected = elements.some(
  //     (edge) => edge.source === nodeId1 && edge.target === nodeId2
  //   );
  //   return isConnected;
  // };









  return (
    <ReactFlowProvider>
      <div
        className={`flex h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <div className="w-1/4 p-4 border-r">
          <h3 className="font-bold text-lg mb-4">Tools</h3>

          {/* Add Data button with dropdown */}
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
            onClick={toggleDataDropdown} // This will toggle the dropdown visibility
          >
            <Database className="w-4 h-4 mr-2" />
            Data
          </button>

          {dataDropdownVisible && (
            <div className="bg-gray-200 rounded-lg shadow-lg p-2 mt-2 mb-2">
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('file')}
              >
                File
              </button>
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('csvFileImport')}
              >
                CSV File
              </button>
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('datasets')}
              >
                Datasets
              </button>
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('sqlTable')}
              >
                SQL Table
              </button>
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('dataTable')}
              >
                Data Table
              </button>
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('dataInfo')}
              >
                Data Info
              </button>
              <button
                className="block w-full px-4 py-2 text-left"
                onClick={() => handleDataChange('saveData')}
              >
                Save Data
              </button>
            </div>
          )}


          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
            onClick={toggleDropdown}
          >
            <Table className="w-4 h-4 mr-2" />
            Transform
          </button>
          {dropdownVisible && (
            <div className="bg-gray-200 rounded-lg shadow-lg p-2 mt-2 mb-2">
              <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('removeDuplicates')}>
                Remove Duplicate Values
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('removeNullValues')}>
                Remove Null Values
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('deleteOutliers')}>
                Delete Outliers
              </button>
              {/* <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('normalizeData')}>
                Normalize Data
              </button> */}
              <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('standardizeData')}>
                Standardize Data
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('impute')}>
                Impute
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handlePreprocessChange('unique')}>
                Display Unique
              </button>
            </div>
          )}

          {/* Visualize button with dropdown */}
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
            onClick={toggleVisualizationDropdown}
          >
            <ChartBar className="w-4 h-4 mr-2" />
            Visualize
          </button>
          {visualizationDropdownVisible && (
            <div className="bg-gray-200 rounded-lg shadow-lg p-2 mt-2 mb-2">
              {/* <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createChart')}>
                Create Chart
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createGraph')}>
                Create Graph
              </button> */}
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createBar')}>
                Bar Plot
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createLine')}>
                Line Plot
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createViolin')}>
                Violin Plot
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createScatter')}>
                Scatter Plot
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createSilhouette')}>
                Silhouette Plot
              </button>
              <button className="block w-full px-4 py-2 text-left" onClick={() => handleVisualizationChange('createHeatMap')}>
                Heat Map
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={onNodeDoubleClick}
          >
            <Controls />
            <Background />
            {isDialogOpen && selectedNodeData.type == 'data' && (
              <div
                className="rounded-lg fixed top-1/2 left-1/2 bg-white rounded shadow-lg border p-4 w-[400px] h-[400px] flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                {/* <h2 className="text-xl font-bold mb-4">Node Details</h2>
              <p className="mb-4">{dialogContent}</p> */}

                {/* Center the file input and button */}
                <div className="flex flex-col items-center justify-center mb-4">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="mb-2"
                    accept={
                      dialogContent === "CSV File" ? ".csv" :
                        dialogContent === "SQL Table" ? ".sql" :
                          // dialogContent === "Text Node" ? ".txt" : 
                          "*/*" // Default: Accept all files
                    }
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                    onClick={uploadFile}
                  >
                    Upload {dialogContent}
                  </button>
                </div>

                {/* Conditional rendering to display received data */}
                {data && (
                  <div className="mt-4 p-2 border rounded bg-gray-100 w-full text-center">
                    Data received: {JSON.stringify(data)}
                  </div>
                )}

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            )},

            {isDialogOpen && selectedNodeData.data.label == 'Impute' && (
              <div
                className="rounded-lg fixed top-1/2 left-1/2 bg-white rounded shadow-lg border p-4   flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                {/* <h2 className="text-xl font-bold mb-4">Node Details</h2>
              <p className="mb-4">{dialogContent}</p> */}

                {/* Center the file input and button */}
                <div className="flex flex-col items-center justify-center mb-4">
                  <label htmlFor="">What is the missing value you want to impute ?</label>
                  <input
                    placeholder='Enter value here'
                    type="text"
                    className="mb-2"
                    name='missing'
                    id='missingVal'

                  />
                  <div className="flex flex-col items-center justify-center mb-4"><AnalyzeHeadersGrid /></div>
                  <div id="arrayOutput"></div>

                  <DropdownMenu />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                    onClick={dataImputer}
                  >
                    Impute
                  </button>
                </div>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            )},
            {isDialogOpen && selectedNodeData.data.label == 'Standardize Data' && (
              <div
                className="rounded-lg fixed top-1/2 left-1/2 bg-white rounded shadow-lg border p-4   flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                {/* <h2 className="text-xl font-bold mb-4">Node Details</h2>
              <p className="mb-4">{dialogContent}</p> */}

                {/* Center the file input and button */}
                <div className="flex flex-col items-center justify-center mb-4">
                  <label htmlFor="">Select the Categorical columns that you want to Standardize .</label>
                  <div className="flex flex-col items-center justify-center mb-4"><AnalyzeHeadersGrid /></div>
                  {/* <div id="arrayOutput"></div> */}
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                    onClick={standardizeData}
                  >
                    Standardize
                  </button>
                </div>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            )},
            <ImputeComponent />
          </ReactFlow>
        </div>

        {/* Positioned buttons at the bottom right */}
        <div
          className="absolute bottom-4 right-4 flex flex-col space-y-2"
        >
          <button
            className="flex items-center px-4 py-2 bg-zinc-500 text-white rounded-lg hover:bg-red-600"
            onClick={deleteSelectedNode}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete Node
          </button>

          <button
            className="flex items-center px-4 py-2 bg-zinc-500 text-white rounded-lg hover:bg-red-600"
            onClick={deleteSelectedEdge}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete Edge
          </button>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowCanvas;
