import { ConnectionPath, Equation } from "@/types";
import { generateConnections } from "@/utils";
import { useEffect, useRef, useState } from "react";

function ConnectionLine({ equations }: { equations: Equation[] }) {
  const [paths, setPaths] = useState<ConnectionPath[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    updatePaths();

    const observer = new ResizeObserver(updatePaths);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connections = generateConnections(equations);

  const updatePaths = () => {
    if (!containerRef?.current) return;

    const newPaths = connections
      .map((conn) => {
        let fromNode, toNode;

        const card = document.getElementById(
          `function-card-${conn.type === "card" ? conn.from : conn.cardIndex}`
        );

        if (!card) return null;

        if (conn.type === "initial") {
          fromNode = document.querySelector(`#${conn.type} #connection-node`);
          toNode = card.querySelector(
            ".connection-node-container:first-child #connection-node"
          );
        } else if (conn.type === "output") {
          fromNode = card.querySelector(
            ".connection-node-container:last-child #connection-node"
          );
          toNode = document.querySelector(`#${conn.type} #connection-node`);
        } else {
          const fromCard = document.getElementById(
            `function-card-${conn.from}`
          );
          const toCard = document.getElementById(`function-card-${conn.to}`);
          if (!fromCard || !toCard) return null;

          fromNode = fromCard.querySelector(
            ".connection-node-container:last-child #connection-node"
          );
          toNode = toCard.querySelector(
            ".connection-node-container:first-child #connection-node"
          );
        }

        if (!fromNode || !toNode) return null;

        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (!containerRect) return;

        const startX = fromRect.left + 7.5 - containerRect.left;
        const startY = fromRect.top + 7.5 - containerRect.top;
        const endX = toRect.left + 7.5 - containerRect.left;
        const endY = toRect.top + 7.5 - containerRect.top;

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const isMoreHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

        let curvature = 0.35;

        if (conn.type === "initial" || conn.type === "output") curvature = 0;

        let controlPoint;
        if (isMoreHorizontal) {
          const offset = Math.abs(deltaX) * curvature;
          const midX = (startX + endX) / 2;
          controlPoint = {
            x: midX,
            y: Math.max(startY, endY) + offset,
          };
        } else {
          const offset = Math.abs(deltaY) * curvature;
          const midY = (startY + endY) / 2;
          controlPoint = {
            x: Math.max(startX, endX) + offset,
            y: midY,
          };
        }

        const path = `
            M ${startX} ${startY}
            Q ${controlPoint.x} ${controlPoint.y},
              ${endX} ${endY}
          `;

        return {
          mainPath: path,
          startCircle: {
            cx: startX,
            cy: startY,
          },
          endCircle: {
            cx: endX,
            cy: endY,
          },
        };
      })
      .filter(Boolean) as ConnectionPath[];

    setPaths(newPaths);
  };

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        {paths.map((path, index) => (
          <g key={index}>
            <path
              d={path.mainPath}
              fill="none"
              strokeWidth="7"
              className="stroke-lines"
            />
            <circle
              cx={path.startCircle.cx}
              cy={path.startCircle.cy}
              r="4"
              className="fill-line-end-circles"
            />
            <circle
              cx={path.endCircle.cx}
              cy={path.endCircle.cy}
              r="4"
              className="fill-line-end-circles"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default ConnectionLine;
