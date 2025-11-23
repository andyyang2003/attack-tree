const CustomNode = ({ data }: { data: { label: string } }) => {
	return (
		<div
			style={{
				padding: "10px",
				border: "2px solid #007BFF",
				borderRadius: "50%",
				backgroundColor: "#E3F2FD",
				textAlign: "center",
				width: "80px",
				height: "80px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{data.label}
		</div>
	);
};

export default CustomNode;
