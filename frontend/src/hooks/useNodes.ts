import { useState } from "react";
import { type Node } from "@xyflow/react";

const useNodes = (initialNodes: Node[]) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const addNode = () => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `New Move ${nodes.length + 1}` },
      type: "custom",
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  };

  return { nodes, setNodes, addNode, deleteNode };
};

export default useNodes;