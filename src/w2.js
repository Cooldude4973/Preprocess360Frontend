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
const DataNode = () => (
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

const PreprocessNode = () => (
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

const VisualizationNode = () => (
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
      position: { x: 100, y: 100 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null); // Deselect edge if a node is selected
  };

  const onEdgeClick = (_, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null); // Deselect node if an edge is selected
  };

  const deleteSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
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

  const createNode = (type, position) => {
    const newNode = {
      id: `${type}-${nodes.length + 1}`,
      type,
      position,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-100 border-r">
          <h3 className="font-bold text-lg mb-4">Tools</h3>
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-2 w-full"
            onClick={() => createNode('data', { x: 100, y: 100 })}
          >
            <Database className="w-4 h-4 mr-2" />
            Add Data Node
          </button>
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-2 w-full"
            onClick={() => createNode('visualize', { x: 500, y: 100 })}
          >
            <ChartBar className="w-4 h-4 mr-2" />
            Add Visualization Node
          </button>
          <button
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mb-2 w-full"
            onClick={() => createNode('preprocess', { x: 300, y: 100 })}
          >
            <Table className="w-4 h-4 mr-2" />
            Add Preprocess Node
          </button>
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