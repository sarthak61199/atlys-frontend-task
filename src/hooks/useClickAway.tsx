import { useEffect, useRef, RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

interface UseClickAwayOptions {
  enabled?: boolean;
  eventTypes?: Array<"mousedown" | "mouseup" | "touchstart" | "touchend">;
}

export function useClickAway<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  options: UseClickAwayOptions = {}
): RefObject<T> {
  const { enabled = true, eventTypes = ["mousedown", "touchstart"] } = options;

  const ref = useRef<T>(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const handleEvent = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!element.contains(target)) {
        savedHandler.current(event);
      }
    };

    eventTypes.forEach((eventType) => {
      document.addEventListener(eventType, handleEvent);
    });

    return () => {
      eventTypes.forEach((eventType) => {
        document.removeEventListener(eventType, handleEvent);
      });
    };
  }, [enabled, eventTypes]);

  return ref;
}
