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
import { Database, Table, ChartBar, Trash, Moon, Sun } from 'lucide-react';

// Node Components
const DataNode = ({ data }) => (
  <div
    className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
    style={{
      background: 'radial-gradient(circle farthest-side, #FEDEB6 50%, #FEC27B)',
    }}
  >
    <Handle type="target" position="left" style={{ background: '#555' }} />
    <Database className="w-5 h-5" />
    <Handle type="source" position="right" style={{ background: '#555' }} />
  </div>
);

const PreprocessNode = ({ data }) => (
  <div
    className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
    style={{
      background: 'radial-gradient(circle farthest-side, #FEDEB6 50%, #FEC27B)',
    }}
  >
    <Handle type="target" position="left" style={{ background: '#555' }} />
    <Table className="w-5 h-5" />
    <Handle type="source" position="right" style={{ background: '#555' }} />
  </div>
);

const VisualizationNode = ({ data }) => (
  <div
    className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
    style={{
      background: 'radial-gradient(circle farthest-side, #FEDEB6 50%, #FEC27B)',
    }}
  >
    <Handle type="target" position="left" style={{ background: '#555' }} />
    <ChartBar className="w-5 h-5" />
    <Handle type="source" position="right" style={{ background: '#555' }} />
  </div>
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
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null); // Deselect edge when a node is clicked
  };

  const onEdgeClick = (_, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null); // Deselect node when an edge is clicked
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
      id: `${type}-${nodes.length + 1}`,
      type,
      data: { label },
      position,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handlePreprocessChange = (action) => {
    setDropdownVisible(false);

    let label = '';
    switch (action) {
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
      default:
        label = 'Preprocess Action';
    }

    createNode('preprocess', { x: 300, y: 100 }, label);
  };

  return (
    <ReactFlowProvider>
      <div
        className={`flex h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} // Apply dark mode class conditionally
      >
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
          <h3 className="font-bold text-lg mb-4">Tools</h3>
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
            onClick={() => createNode('data', { x: 100, y: 100 }, 'Data Node')}
          >
            <Database className="w-4 h-4 mr-2" />
            Add Data
          </button>
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
            onClick={() => createNode('visualize', { x: 500, y: 100 }, 'Visualization Node')}
          >
            <ChartBar className="w-4 h-4 mr-2" />
            Visualization Tools
          </button>
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 w-full"
            onClick={toggleDropdown}
          >
            <Table className="w-4 h-4 mr-2" />
            Preprocessing Tools
          </button>

          {dropdownVisible && (
            <div  className={`mt-4 shadow-lg rounded-lg border p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} >
              <h3 className="font-medium mb-2">Select Preprocessing</h3>
              <ul>
                <li>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-200"
                    onClick={() => handlePreprocessChange('removeNullValues')}
                  >
                    Remove Null Values
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-200"
                    onClick={() => handlePreprocessChange('deleteOutliers')}
                  >
                    Delete Outliers
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-200"
                    onClick={() => handlePreprocessChange('normalizeData')}
                  >
                    Normalize Data
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-200"
                    onClick={() => handlePreprocessChange('standardizeData')}
                  >
                    Standardize Data
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background gap={16} size={0.5} />
            <Controls />
          </ReactFlow>

          {/* Delete Buttons */}
          <div className="absolute bottom-4 right-4 space-y-2">
            <button
              onClick={deleteSelectedNode}
              disabled={!selectedNode}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedNode
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete Node
            </button>
            <button
              onClick={deleteSelectedEdge}
              disabled={!selectedEdge}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedEdge
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete Edge
            </button>
          </div>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-600"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowCanvas;
