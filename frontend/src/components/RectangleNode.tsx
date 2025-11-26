import { Handle, Position } from "@xyflow/react";

const RectangleNode = ({ data }: { data: { label: string } }) => {
	return (
		<div
			style={{
				padding: "10px",
				border: "2px solid #007BFF",
				borderRadius: "10%",
				backgroundColor: "#E3F2FD",
				textAlign: "center",
				width: "80px",
				height: "80px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Handle type="target" position={Position.Top} />
			{data.label}
			<Handle type="source" position={Position.Bottom} />
		</div>
	);
};

export default RectangleNode;
