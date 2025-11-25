import { useCallback } from "react";
import { useNodesState, type Node } from "@xyflow/react";

type NodeShape = "circle" | "rectangle";

const useNodes = (initialNodes: Node[]) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);

  const addNode = useCallback(
    (shape: NodeShape = "circle") => {
      setNodes((currentNodes) => {
        const nextIndex = currentNodes.length + 1;
        const newNode: Node = {
          id: nextIndex.toString(),
          position: {
            x: Math.random() * 400,
            y: Math.random() * 400,
          },
          data: { label: `New Move ${nextIndex}` },
          type: shape,
        };
        return currentNodes.concat(newNode);
      });
    },
    [setNodes],
  );

  const deleteSelectedNodes = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
  }, [setNodes]);

  return { nodes, addNode, deleteSelectedNodes, onNodesChange };
};

export default useNodes;