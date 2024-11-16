// import React, { useState } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Card, CardContent } from './components/ui/card';
// import { Database, Table, ChartBar, Play } from 'lucide-react';

// // Define the node components first
// const DataNode = ({ data }) => {
//   return (
//     <div className="bg-white p-3 rounded-md shadow-sm">
//       <Database className="w-5 h-5 mb-2" />
//       <div className="text-sm font-medium">{data.label}</div>
//     </div>
//   );
// };

// const PreprocessNode = ({ data }) => {
//   return (
//     <div className="bg-white p-3 rounded-md shadow-sm">
//       <Table className="w-5 h-5 mb-2" />
//       <div className="text-sm font-medium">{data.label}</div>
//     </div>
//   );
// };

// const VisualizationNode = ({ data }) => {
//   return (
//     <div className="bg-white p-3 rounded-md shadow-sm">
//       <ChartBar className="w-5 h-5 mb-2" />
//       <div className="text-sm font-medium">{data.label}</div>
//     </div>
//   );
// };

// // Define nodeTypes after components are defined
// const nodeTypes = {
//   data: {
//     component: DataNode,
//     icon: Database
//   },
//   preprocess: {
//     component: PreprocessNode,
//     icon: Table
//   },
//   visualize: {
//     component: VisualizationNode,
//     icon: ChartBar
//   }
// };

// const WorkflowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

//   const onNodeClick = (event, node) => {
//     setSelectedNode(node);
//   };

//   const createNode = (type, position) => {
//     const newNode = {
//       id: `${type}-${nodes.length + 1}`,
//       type,
//       data: { label: type },
//       position
//     };
//     setNodes((nds) => [...nds, newNode]);
//     return newNode;
//   };

//   return (
//     <ReactFlowProvider>
//       <div className="h-screen w-full">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={onNodeClick}
//           nodeTypes={{
//             data: nodeTypes.data.component,
//             preprocess: nodeTypes.preprocess.component,
//             visualize: nodeTypes.visualize.component
//           }}
//           fitView
//         >
//           <Controls />
//         </ReactFlow>

//         <div className="absolute top-4 right-4">
//           <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//             <Play className="w-4 h-4 mr-2" />
//             Run Workflow
//           </button>
//         </div>

//         {selectedNode && (
//           <Card className="absolute w-64 shadow-md" style={{ left: selectedNode.position.x + 200, top: selectedNode.position.y }}>
//             <CardContent>
//               <div className="flex items-center mb-2">
//               {nodeTypes[selectedNode.type]?.icon && React.createElement(nodeTypes[selectedNode.type].icon, { className: "w-5 h-5 mr-2" })}
//                 <span className="font-medium">{selectedNode.data.label}</span>
//               </div>
//               <NodeConfiguration node={selectedNode} nodeTypes={nodeTypes} />
//             </CardContent>
//           </Card>
//         )}

//         <div className="absolute top-4 left-4">
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2" onClick={() => createNode('data', { x: 100, y: 100 })}>
//             <Database className="w-4 h-4 mr-2" />
//             Add Data
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2" onClick={() => createNode('preprocess', { x: 300, y: 100 })}>
//             <Table className="w-4 h-4 mr-2" />
//             Add Preprocess
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => createNode('visualize', { x: 500, y: 100 })}>
//             <ChartBar className="w-4 h-4 mr-2" />
//             Add Visualization
//           </button>
//         </div>
//       </div>
//     </ReactFlowProvider>
//   );
// };

// const NodeConfiguration = ({ node, nodeTypes }) => {
//   return (
//     <div>
//       {nodeTypes[node.type]?.icon && React.createElement(nodeTypes[node.type].icon, { className: "w-5 h-5 mr-2" })}
//       <span className="font-medium">{node.data.label}</span>
//       {/* Add configuration options for the selected node */}
//     </div>
//   );
// };

// export default WorkflowCanvas;



// import React, { useState } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   Background
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Card, CardContent } from './components/ui/card';
// import { Database, Table, ChartBar, Play, Trash } from 'lucide-react';

// const DataNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <Database className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const PreprocessNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <Table className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const VisualizationNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <ChartBar className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const nodeTypes = {
//   data: { component: DataNode, icon: Database },
//   preprocess: { component: PreprocessNode, icon: Table },
//   visualize: { component: VisualizationNode, icon: ChartBar }
// };

// const WorkflowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: 'data-1',
//       type: 'data',
//       data: { label: 'Data Node' },
//       position: { x: 100, y: 100 }
//     }
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
//   const onNodeClick = (event, node) => {
//       setSelectedNode(node);
//       console.log("Hello");
// }

//   const deleteSelectedNode = () => {
//     if (selectedNode) {
//       setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
//       setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
//       setSelectedNode(null);
//     }
//   };

//   const createNode = (type, position) => {
//     const newNode = {
//       id: `${type}-${nodes.length + 1}`,
//       type,
//       data: { label: type },
//       position
//     };
//     setNodes((nds) => [...nds, newNode]);
//     return newNode;
//   };

//   return (
//     <ReactFlowProvider>
//       <div className="relative h-screen w-full">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={onNodeClick}
//           nodeTypes={{
//             data: nodeTypes.data.component,
//             preprocess: nodeTypes.preprocess.component,
//             visualize: nodeTypes.visualize.component
//           }}
//           fitView
//         >
//           <Background gap={16} size={0.5} />
//           <Controls />
//         </ReactFlow>

//         <div className="absolute top-4 right-4">
//           <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//             <Play className="w-4 h-4 mr-2" />
//             Run Workflow
//           </button>
//         </div>

//         {selectedNode && (
//           <Card className="absolute w-64 shadow-md" style={{ left: selectedNode.position.x + 200, top: selectedNode.position.y }}>
//             <CardContent>
//               <div className="flex items-center mb-2">
//                 {nodeTypes[selectedNode.type]?.icon && React.createElement(nodeTypes[selectedNode.type].icon, { className: "w-5 h-5 mr-2" })}
//                 <span className="font-medium">{selectedNode.data.label}</span>
//               </div>
//               <NodeConfiguration node={selectedNode} nodeTypes={nodeTypes} />
//             </CardContent>
//           </Card>
//         )}

//         <div className="absolute top-4 left-4">
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2 mb-2" onClick={() => createNode('data', { x: 100, y: 100 })}>
//             <Database className="w-4 h-4 mr-2" />
//             Add Data
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-2" onClick={() => createNode('visualize', { x: 500, y: 100 })}>
//             <ChartBar className="w-4 h-4 mr-2" />
//             Add Visualization
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2 mb-2" onClick={() => createNode('preprocess', { x: 300, y: 100 })}>
//             <Table className="w-4 h-4 mr-2" />
//             Add Preprocess
//           </button>
//         </div>

//         <div className="absolute bottom-4 right-4">
//           <button
//             onClick={deleteSelectedNode}
//             disabled={!selectedNode}
//             className={`flex items-center px-4 py-2 rounded-lg ${
//               selectedNode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             <Trash className="w-4 h-4 mr-2" />
//             Delete Node
//           </button>
//         </div>
//       </div>
//     </ReactFlowProvider>
//   );
// };

// const NodeConfiguration = ({ node, nodeTypes }) => {
//   return (
//     <div>
//       {nodeTypes[node.type]?.icon && React.createElement(nodeTypes[node.type].icon, { className: "w-5 h-5 mr-2" })}
//       <span className="font-medium">{node.data.label}</span>
//     </div>
//   );
// };

// export default WorkflowCanvas;


// import React, { useState } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   Background
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Card, CardContent } from './components/ui/card';
// import { Database, Table, ChartBar, Play, Trash } from 'lucide-react';

// const DataNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <Database className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const VisualizationNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <ChartBar className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const nodeTypes = {
//   data: { component: DataNode, icon: Database },
//   visualize: { component: VisualizationNode, icon: ChartBar }
// };

// const WorkflowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: 'data-1',
//       type: 'data',
//       data: { label: 'Data Node' },
//       position: { x: 100, y: 100 }
//     }
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedAction, setSelectedAction] = useState(""); // Track selected action

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
//   const onNodeClick = (event, node) => setSelectedNode(node);

//   const deleteSelectedNode = () => {
//     if (selectedNode) {
//       setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
//       setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
//       setSelectedNode(null);
//     }
//   };

//   const createNode = (type, position) => {
//     const newNode = {
//       id: `${type}-${nodes.length + 1}`,
//       type,
//       data: { label: type },
//       position
//     };
//     setNodes((nds) => [...nds, newNode]);
//     return newNode;
//   };

//   // Handle the dropdown visibility and action selection
//   const toggleDropdown = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const handlePreprocessChange = (action) => {
//     setSelectedAction(action);
//     setDropdownVisible(false); // Hide the dropdown after selection
//     console.log("Selected Preprocessing Action:", action);

//     // You can now implement the preprocessing logic based on the action selected
//   };

//   return (
//     <ReactFlowProvider>
//       <div className="relative h-screen w-full">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={onNodeClick}
//           nodeTypes={{
//             data: nodeTypes.data.component,
//             visualize: nodeTypes.visualize.component
//           }}
//           fitView
//         >
//           <Background gap={16} size={0.5} />
//           <Controls />
//         </ReactFlow>

//         {/* Node Action Buttons */}
//         <div className="absolute top-4 left-4">
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2" onClick={() => createNode('data', { x: 100, y: 100 })}>
//             <Database className="w-4 h-4 mr-2" />
//             Add Data
//           </button>
//           <button
//             className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
//             onClick={toggleDropdown}
//           >
//             <Table className="w-4 h-4 mr-2" />
//             Add Preprocess
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => createNode('visualize', { x: 500, y: 100 })}>
//             <ChartBar className="w-4 h-4 mr-2" />
//             Add Visualization
//           </button>
//         </div>

//         {/* Preprocessing Dropdown */}
//         {dropdownVisible && (
//           <div className="absolute top-16 left-16 bg-white shadow-lg rounded-lg border w-48 p-2">
//             <h3 className="font-medium mb-2">Select Preprocessing</h3>
//             <ul>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange("removeNullValues")}
//                 >
//                   Remove Null Values
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange("deleteOutliers")}
//                 >
//                   Delete Outliers
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange("normalizeData")}
//                 >
//                   Normalize Data
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange("standardizeData")}
//                 >
//                   Standardize Data
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Delete Node Button */}
//         <div className="absolute bottom-4 right-4">
//           <button
//             onClick={deleteSelectedNode}
//             disabled={!selectedNode}
//             className={`flex items-center px-4 py-2 rounded-lg ${selectedNode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//           >
//             <Trash className="w-4 h-4 mr-2" />
//             Delete Node
//           </button>
//         </div>

//         {/* Node Configuration Panel */}
//         {selectedNode && (
//           <Card className="absolute w-64 shadow-md" style={{ left: selectedNode.position.x + 200, top: selectedNode.position.y }}>
//             <CardContent>
//               <div className="flex items-center mb-2">
//                 {nodeTypes[selectedNode.type]?.icon && React.createElement(nodeTypes[selectedNode.type].icon, { className: "w-5 h-5 mr-2" })}
//                 <span className="font-medium">{selectedNode.data.label}</span>
//               </div>
//               <NodeConfiguration node={selectedNode} nodeTypes={nodeTypes} />
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </ReactFlowProvider>
//   );
// };

// const NodeConfiguration = ({ node, nodeTypes }) => {
//   return (
//     <div>
//       {nodeTypes[node.type]?.icon && React.createElement(nodeTypes[node.type].icon, { className: "w-5 h-5 mr-2" })}
//       <span className="font-medium">{node.data.label}</span>
//     </div>
//   );
// };

// export default WorkflowCanvas;

// import React, { useState } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   Background
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Card, CardContent } from './components/ui/card';
// import { Database, Table, ChartBar, Play, Trash } from 'lucide-react';

// // Node configuration component to display node's data and type
// const NodeConfiguration = ({ node, nodeTypes }) => {
//   return (
//     <div>
//       {nodeTypes[node.type]?.icon && React.createElement(nodeTypes[node.type].icon, { className: "w-5 h-5 mr-2" })}
//       <span className="font-medium">{node.data.label}</span>
//     </div>
//   );
// };

// const DataNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <Database className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const PreprocessNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <Table className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const VisualizationNode = ({ data }) => (
//   <div className="bg-white p-3 rounded-md shadow-sm">
//     <ChartBar className="w-5 h-5 mb-2" />
//     <div className="text-sm font-medium">{data.label}</div>
//   </div>
// );

// const nodeTypes = {
//   data: { component: DataNode, icon: Database },
//   preprocess: { component: PreprocessNode, icon: Table },
//   visualize: { component: VisualizationNode, icon: ChartBar }
// };

// const WorkflowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: 'data-1',
//       type: 'data',
//       data: { label: 'Data Node' },
//       position: { x: 100, y: 100 }
//     }
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
//   const onNodeClick = (event, node) => setSelectedNode(node);

//   const deleteSelectedNode = () => {
//     if (selectedNode) {
//       setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
//       setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
//       setSelectedNode(null);
//     }
//   };

//   const createNode = (type, position, label) => {
//     const newNode = {
//       id: `${type}-${nodes.length + 1}`,
//       type,
//       data: { label },
//       position
//     };
//     setNodes((nds) => [...nds, newNode]);
//     return newNode;
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const handlePreprocessChange = (action) => {
//     setDropdownVisible(false);

//     let label = '';
//     switch (action) {
//       case 'removeNullValues':
//         label = 'Remove Null Values';
//         break;
//       case 'deleteOutliers':
//         label = 'Delete Outliers';
//         break;
//       case 'normalizeData':
//         label = 'Normalize Data';
//         break;
//       case 'standardizeData':
//         label = 'Standardize Data';
//         break;
//       default:
//         label = 'Preprocess Action';
//     }

//     const newNode = createNode('preprocess', { x: 300, y: 100 }, label);

//     const dataNode = nodes.find((node) => node.type === 'data');
//     if (dataNode) {
//       setEdges((eds) => [
//         ...eds,
//         {
//           id: `e-${dataNode.id}-${newNode.id}`,
//           source: dataNode.id,
//           target: newNode.id,
//           animated: true
//         }
//       ]);
//     }
//   };

//   return (
//     <ReactFlowProvider>
//       <div className="relative h-screen w-full">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={onNodeClick}
//           nodeTypes={{
//             data: nodeTypes.data.component,
//             preprocess: nodeTypes.preprocess.component,
//             visualize: nodeTypes.visualize.component
//           }}
//           fitView
//         >
//           <Background gap={16} size={0.5} />
//           <Controls />
//         </ReactFlow>

//         <div className="absolute top-4 left-4">
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2 mb-2" onClick={() => createNode('data', { x: 100, y: 100 }, 'Data Node')}>
//             <Database className="w-4 h-4 mr-2" />
//             Add Data
//           </button>
//           <button
//             className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2 mb-2"
//             onClick={toggleDropdown}
//           >
//             <Table className="w-4 h-4 mr-2" />
//             Add Preprocess
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => createNode('visualize', { x: 500, y: 100 }, 'Visualization Node')}>
//             <ChartBar className="w-4 h-4 mr-2" />
//             Add Visualization
//           </button>
//         </div>

//         {dropdownVisible && (
//           <div className="absolute top-16 left-16 bg-white shadow-lg rounded-lg border w-48 p-2">
//             <h3 className="font-medium mb-2">Select Preprocessing</h3>
//             <ul>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('removeNullValues')}
//                 >
//                   Remove Null Values
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('deleteOutliers')}
//                 >
//                   Delete Outliers
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('normalizeData')}
//                 >
//                   Normalize Data
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('standardizeData')}
//                 >
//                   Standardize Data
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         <div className="absolute bottom-4 right-4">
//           <button
//             onClick={deleteSelectedNode}
//             disabled={!selectedNode}
//             className={`flex items-center px-4 py-2 rounded-lg ${selectedNode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//           >
//             <Trash className="w-4 h-4 mr-2" />
//             Delete Node
//           </button>
//         </div>

//         {selectedNode && (
//           <Card className="absolute w-64 shadow-md" style={{ left: selectedNode.position.x + 200, top: selectedNode.position.y }}>
//             <CardContent>
//               <div className="flex items-center mb-2">
//                 {nodeTypes[selectedNode.type]?.icon && React.createElement(nodeTypes[selectedNode.type].icon, { className: "w-5 h-5 mr-2" })}
//                 <span className="font-medium">{selectedNode.data.label}</span>
//               </div>
//               <NodeConfiguration node={selectedNode} nodeTypes={nodeTypes} />
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </ReactFlowProvider>
//   );
// };

// export default WorkflowCanvas;

// import React, { useState } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   Background,
//   Handle
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Card, CardContent } from './components/ui/card';
// import { Database, Table, ChartBar, Play, Trash } from 'lucide-react';

// // Node configuration component to display node's data and type
// const NodeConfiguration = ({ node, nodeTypes }) => {
//   return (
//     <div>
//       {nodeTypes[node.type]?.icon && React.createElement(nodeTypes[node.type].icon, { className: "w-5 h-5 mr-2" })}
//       <span className="font-medium">{node.data.label}</span>
//     </div>
//   );
// };


// const DataNode = ({ data }) => (
//   <div 
//   className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300" 
//     style={{
//     background: 'radial-gradient(circle farthest-side, #FEDEB6 50% , #FEC27B)',
//   }}>
//     <Handle type="target" position="left" style={{ background: '#555' }} />
//     <Database className="w-5 h-5 " />
//     {/* { <div className="text-xs font-medium text-center">{data.label}</div> } */}
//     <Handle type="source" position="right" style={{ background: '#555' }} />
//   </div>
// );

// const PreprocessNode = ({ data }) => (
//   <div 
//   className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
//   style={{
//     background: 'radial-gradient(circle farthest-side, #FEDEB6 50% , #FEC27B)',
//   }}>
//     <Handle type="target" position="left" style={{ background: '#555' }} />
//     <Table className="w-5 h-5" />
//     {/* <div className="text-xs font-medium text-center">{data.label}</div> */}
//     <Handle type="source" position="right" style={{ background: '#555' }} />
//   </div>
// );

// const VisualizationNode = ({ data }) => (
//   <div 
//   className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
//   style={{
//     background: 'radial-gradient(circle farthest-side, #FEDEB6 50% , #FEC27B)',
//   }}>
//     <Handle type="target" position="left" style={{ background: '#555' }} />
//     <ChartBar className="w-5 h-5" />
//     {/* <div className="text-xs font-medium text-center">{data.label}</div> */}
//     <Handle type="source" position="right" style={{ background: '#555' }} />
//   </div>
// );

// const nodeTypes = {
//   data: { component: DataNode, icon: Database },
//   preprocess: { component: PreprocessNode, icon: Table },
//   visualize: { component: VisualizationNode, icon: ChartBar }
// };

// const WorkflowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: 'data-1',
//       type: 'data',
//       data: { label: 'Data Node' },
//       position: { x: 100, y: 100 }
//     }
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
//   const onNodeClick = (event, node) => setSelectedNode(node);

//   const deleteSelectedNode = () => {
//     if (selectedNode) {
//       setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
//       setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
//       setSelectedNode(null);
//     }
//   };

//   const createNode = (type, position, label) => {
//     const newNode = {
//       id: `${type}-${nodes.length + 1}`,
//       type,
//       data: { label },
//       position
//     };
//     setNodes((nds) => [...nds, newNode]);
//     return newNode;
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const handlePreprocessChange = (action) => {
//     setDropdownVisible(false);

//     let label = '';
//     switch (action) {
//       case 'removeNullValues':
//         label = 'Remove Null Values';
//         break;
//       case 'deleteOutliers':
//         label = 'Delete Outliers';
//         break;
//       case 'normalizeData':
//         label = 'Normalize Data';
//         break;
//       case 'standardizeData':
//         label = 'Standardize Data';
//         break;
//       default:
//         label = 'Preprocess Action';
//     }

//     const newNode = createNode('preprocess', { x: 300, y: 100 }, label);
//   };

//   return (
//     <ReactFlowProvider>
//       <div className="relative h-screen w-full">
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onNodeClick={onNodeClick}
//           nodeTypes={{
//             data: nodeTypes.data.component,
//             preprocess: nodeTypes.preprocess.component,
//             visualize: nodeTypes.visualize.component
//           }}
//           fitView
//         >
//           <Background gap={16} size={0.5} />
//           <Controls />
//         </ReactFlow>

//         <div className="absolute top-4 left-4">
//           <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mr-2 mb-2 " onClick={() => createNode('data', { x: 100, y: 100 }, 'Data Node')}>
//             <Database className="w-4 h-4 mr-2" />
//             Add Data
//           </button>
//           <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2" onClick={() => createNode('visualize', { x: 500, y: 100 }, 'Visualization Node')}>
//             <ChartBar className="w-4 h-4 mr-2" />
//             Add Visualization
//           </button>
//           <button
//             className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mr-2 mb-2"
//             onClick={toggleDropdown}
//           >
//             <Table className="w-4 h-4 mr-2" />
//             Preprocessing Tool
//           </button>
//         </div>

//         {dropdownVisible && (
//           <div className="absolute top-16 left-16 bg-white shadow-lg rounded-lg border w-48 p-2">
//             <h3 className="font-medium mb-2">Select Preprocessing</h3>
//             <ul>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('removeNullValues')}
//                 >
//                   Remove Null Values
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('deleteOutliers')}
//                 >
//                   Delete Outliers
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('normalizeData')}
//                 >
//                   Normalize Data
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full text-left p-2 hover:bg-gray-200"
//                   onClick={() => handlePreprocessChange('standardizeData')}
//                 >
//                   Standardize Data
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         <div className="absolute bottom-4 right-4">
//           <button
//             onClick={deleteSelectedNode}
//             disabled={!selectedNode}
//             className={`flex items-center px-4 py-2 rounded-lg ${selectedNode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//           >
//             <Trash className="w-4 h-4 mr-2" />
//             Delete Node
//           </button>
//         </div>

//         {selectedNode && (
//           <Card className="absolute top-16 right-4 w-72">
//             <CardContent>
//               <NodeConfiguration node={selectedNode} nodeTypes={nodeTypes} />
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </ReactFlowProvider>
//   );
// };

// export default WorkflowCanvas;

// import React, { useState } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   Background,
//   Handle
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { Card, CardContent } from './components/ui/card';
// import { Database, Table, ChartBar, Trash } from 'lucide-react';

// // Node Components
// const DataNode = ({ data }) => (
//   <div
//     className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
//     style={{
//       background: 'radial-gradient(circle farthest-side, #FEDEB6 50% , #FEC27B)'
//     }}
//   >
//     <Handle type="target" position="left" style={{ background: '#555' }} />
//     <Database className="w-5 h-5" />
//     <Handle type="source" position="right" style={{ background: '#555' }} />
//   </div>
// );

// const PreprocessNode = ({ data }) => (
//   <div
//     className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
//     style={{
//       background: 'radial-gradient(circle farthest-side, #FEDEB6 50% , #FEC27B)'
//     }}
//   >
//     <Handle type="target" position="left" style={{ background: '#555' }} />
//     <Table className="w-5 h-5" />
//     <Handle type="source" position="right" style={{ background: '#555' }} />
//   </div>
// );

// const VisualizationNode = ({ data }) => (
//   <div
//     className="bg-white p-3 rounded-full shadow-sm w-10 h-10 flex flex-col items-center justify-center border-2 border-zinc-300"
//     style={{
//       background: 'radial-gradient(circle farthest-side, #FEDEB6 50% , #FEC27B)'
//     }}
//   >
//     <Handle type="target" position="left" style={{ background: '#555' }} />
//     <ChartBar className="w-5 h-5" />
//     <Handle type="source" position="right" style={{ background: '#555' }} />
//   </div>
// );

// const nodeTypes = {
//   data: { component: DataNode, icon: Database },
//   preprocess: { component: PreprocessNode, icon: Table },
//   visualize: { component: VisualizationNode, icon: ChartBar }
// };

// const WorkflowCanvas = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: 'data-1',
//       type: 'data',
//       data: { label: 'Data Node' },
//       position: { x: 100, y: 100 }
//     }
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
//   const onNodeClick = (event, node) => setSelectedNode(node);

//   const deleteSelectedNode = () => {
//     if (selectedNode) {
//       setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
//       setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
//       setSelectedNode(null);
//     }
//   };

//   const createNode = (type, position, label) => {
//     const newNode = {
//       id: `${type}-${nodes.length + 1}`,
//       type,
//       data: { label },
//       position
//     };
//     setNodes((nds) => [...nds, newNode]);
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   const handlePreprocessChange = (action) => {
//     setDropdownVisible(false);

//     let label = '';
//     switch (action) {
//       case 'removeNullValues':
//         label = 'Remove Null Values';
//         break;
//       case 'deleteOutliers':
//         label = 'Delete Outliers';
//         break;
//       case 'normalizeData':
//         label = 'Normalize Data';
//         break;
//       case 'standardizeData':
//         label = 'Standardize Data';
//         break;
//       default:
//         label = 'Preprocess Action';
//     }

//     createNode('preprocess', { x: 300, y: 100 }, label);
//   };

//   return (
//     <ReactFlowProvider>
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <div className="w-1/4 p-4 bg-gray-100 border-r">
//           <h3 className="font-bold text-lg mb-4">Tools</h3>
//           <button
//             className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
//             onClick={() => createNode('data', { x: 100, y: 100 }, 'Data Node')}
//           >
//             <Database className="w-4 h-4 mr-2" />
//             Add Data
//           </button>
//           <button
//             className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 mb-2 w-full"
//             onClick={() => createNode('visualize', { x: 500, y: 100 }, 'Visualization Node')}
//           >
//             <ChartBar className="w-4 h-4 mr-2" />
//             Add Visualization
//           </button>
//           <button
//             className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 w-full"
//             onClick={toggleDropdown}
//           >
//             <Table className="w-4 h-4 mr-2" />
//             Preprocessing Tool
//           </button>

//           {dropdownVisible && (
//             <div className="mt-4 bg-white shadow-lg rounded-lg border p-2">
//               <h3 className="font-medium mb-2">Select Preprocessing</h3>
//               <ul>
//                 <li>
//                   <button
//                     className="w-full text-left p-2 hover:bg-gray-200"
//                     onClick={() => handlePreprocessChange('removeNullValues')}
//                   >
//                     Remove Null Values
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     className="w-full text-left p-2 hover:bg-gray-200"
//                     onClick={() => handlePreprocessChange('deleteOutliers')}
//                   >
//                     Delete Outliers
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     className="w-full text-left p-2 hover:bg-gray-200"
//                     onClick={() => handlePreprocessChange('normalizeData')}
//                   >
//                     Normalize Data
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     className="w-full text-left p-2 hover:bg-gray-200"
//                     onClick={() => handlePreprocessChange('standardizeData')}
//                   >
//                     Standardize Data
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Canvas */}
//         <div className="flex-1 relative">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onNodeClick={onNodeClick}
//             nodeTypes={{
//               data: nodeTypes.data.component,
//               preprocess: nodeTypes.preprocess.component,
//               visualize: nodeTypes.visualize.component
//             }}
//             fitView
//           >
//             <Background gap={16} size={0.5} />
//             <Controls />
//           </ReactFlow>

//           {/* Delete Node Button */}
//           <div className="absolute bottom-4 right-4">
//             <button
//               onClick={deleteSelectedNode}
//               disabled={!selectedNode}
//               className={`flex items-center px-4 py-2 rounded-lg ${
//                 selectedNode
//                   ? 'bg-red-500 hover:bg-red-600 text-white'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <Trash className="w-4 h-4 mr-2" />
//               Delete Node
//             </button>
//           </div>
//         </div>
//       </div>
//     </ReactFlowProvider>
//   );
// };

// export default WorkflowCanvas;



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
import { Database, Table, ChartBar, Trash } from 'lucide-react';

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
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-100 border-r">
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
            <div className="mt-4 bg-white shadow-lg rounded-lg border p-2">
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
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowCanvas;


