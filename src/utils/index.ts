import { Connection, Equation } from "@/types";

export const generateConnections = (equations: Equation[]) => {
  const connections: Connection[] = [];
  const lastIndex = equations.length - 1;

  const firstCard = equations.findIndex((eq) => eq.order === 0);
  if (firstCard !== -1) {
    connections.push({ type: "initial", cardIndex: firstCard });
  }

  const lastCard = equations.findIndex((eq) => eq.order === lastIndex);

  const orderMap = new Map<number, number>();
  equations.forEach((eq, index) => {
    orderMap.set(eq.order, index);
  });

  for (let i = 0; i < lastIndex; i++) {
    const fromIndex = orderMap.get(i);
    const toIndex = orderMap.get(i + 1);

    if (fromIndex !== undefined && toIndex !== undefined) {
      connections.push({
        type: "card",
        from: fromIndex,
        to: toIndex,
      });
    }
  }

  if (lastCard !== -1) {
    connections.push({ type: "output", cardIndex: lastCard });
  }

  return connections;
};

export const generateNextFunctionDropdownList = (equations: Equation[]) => {
  const items = equations
    .map((eq) => {
      const toIndex = equations.findIndex((a) => a.order === eq.order + 1);

      return {
        label: toIndex !== -1 ? `Function: ${toIndex + 1}` : "-",
        value: toIndex.toString(),
      };
    })
    .filter(Boolean);

  return items;
};
