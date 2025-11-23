import { ReactFlow, Background, Controls, applyNodeChanges, type NodeChange } from "@xyflow/react";
import useNodes from "./hooks/useNodes";
import CustomNode from "./components/CircleNode.tsx";
import { useEffect } from "react";

// Use a type-only import for FlowNode
import type { Node as FlowNode } from "@xyflow/react";

const App = () => {
	const initialNodes = [
		{
			id: "1",
			position: { x: 100, y: 100 },
			data: { label: "First Move" },
		},
		{
			id: "2",
			position: { x: 200, y: 200 },
			data: { label: "Second Move" },
		},
	];

	// Ensure proper integration of useNodes with ReactFlow
	const { nodes, setNodes, addNode, deleteNode } = useNodes(initialNodes);

	const nodeTypes = { custom: CustomNode };
	useEffect(() => {
		// Attach the handleKeyDown event listener to the window
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Delete" && nodes.length > 0) {
				const selectedNode = nodes.find((node) => node.selected);
				if (selectedNode) {
					deleteNode(selectedNode.id);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [nodes, deleteNode]);

	// Add the onNodeContextMenu event handler for right-click functionality
	const onNodeContextMenu = (event: React.MouseEvent, node: FlowNode) => {
		event.preventDefault();
		deleteNode(node.id);
	};

	const onNodesChange = (changes: NodeChange[]) => {
		setNodes((nds) => applyNodeChanges(changes, nds));
	};

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange} // Pass onNodesChange to ReactFlow
				onNodeContextMenu={(event, node) => onNodeContextMenu(event, node as FlowNode)} // Explicitly cast node
			>
				<Background />
				<Controls />
			</ReactFlow>
			<button
				onClick={addNode}
				style={{
					position: "fixed",
					bottom: "20px",
					right: "20px",
					padding: "10px 20px",
					backgroundColor: "#007BFF",
					color: "white",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
				}}
			>
				Add Node
			</button>
		</div>
	);
};

export default App;
