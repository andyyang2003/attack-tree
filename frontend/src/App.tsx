import { useEffect, useMemo, useState } from "react";
import {
	ReactFlow,
	Background,
	Controls,
	addEdge,
	useEdgesState,
	type Node,
	type Edge,
	type Connection,
} from "@xyflow/react";
import CircleNode from "./components/CircleNode";
import RectangleNode from "./components/RectangleNode";
import useNodes from "./hooks/useNodes";

import "@xyflow/react/dist/style.css";

function App() {
	// Initial nodes
	const initialNodes: Node[] = [
		{
			id: "1",
			position: { x: 100, y: 100 },
			data: { label: "First Move" },
			type: "circle",
		},
	];

	// Initial edges
	const initialEdges: Edge[] = [];

	// React Flow state hooks
	const { nodes, addNode, deleteSelectedNodes, onNodesChange } =
		useNodes(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Called when the user connects two nodes
	const onConnect = (connection: Connection) => {
		setEdges((prevEdges) => addEdge(connection, prevEdges));
	};

	const nodeTypes = useMemo(
		() => ({
			circle: CircleNode,
			rectangle: RectangleNode,
		}),
		[]
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Delete") {
				deleteSelectedNodes();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [deleteSelectedNodes]);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
			>
				<Background />
				<Controls />
			</ReactFlow>
			<div
				style={{
					position: "fixed",
					bottom: "20px",
					right: "20px",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					gap: "8px",
				}}
			>
				{isMenuOpen && (
					<div
						style={{
							backgroundColor: "white",
							borderRadius: "12px",
							boxShadow: "0 10px 25px rgba(15,23,42,0.2)",
							padding: "12px",
							minWidth: "160px",
						}}
					>
						<p style={{ margin: "0 0 8px", fontWeight: 600, color: "#0f172a" }}>
							Add Move
						</p>
						<button
							onClick={() => {
								addNode("circle");
								setIsMenuOpen(false);
							}}
							style={{
								width: "100%",
								padding: "8px 12px",
								marginBottom: "6px",
								borderRadius: "8px",
								border: "1px solid #cbd5f5",
								backgroundColor: "#eff6ff",
								color: "#1d4ed8",
								fontWeight: 600,
								cursor: "pointer",
							}}
						>
							Circle
						</button>
						<button
							onClick={() => {
								addNode("rectangle");
								setIsMenuOpen(false);
							}}
							style={{
								width: "100%",
								padding: "8px 12px",
								borderRadius: "8px",
								border: "1px solid #cbd5f5",
								backgroundColor: "#fef3c7",
								color: "#b45309",
								fontWeight: 600,
								cursor: "pointer",
							}}
						>
							Rectangle
						</button>
					</div>
				)}
				<button
					onClick={() => setIsMenuOpen((prev) => !prev)}
					style={{
						padding: "12px 24px",
						backgroundColor: isMenuOpen ? "#172554" : "#2563eb",
						color: "white",
						border: "none",
						borderRadius: "9999px",
						fontWeight: 600,
						cursor: "pointer",
						boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
					}}
				>
					{isMenuOpen ? "Choose Shape" : "Add Move"}
				</button>
			</div>
		</div>
	);
}

export default App;
