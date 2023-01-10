import { useState, useCallback } from "react";

export function useCustomRef<T>(): [T | null, (argNode: T) => void] {
  const [node, setNodeRef] = useState<T | null>(null);
  const setNodeRefCallback = useCallback(setNodeRef, []);

  return [node, setNodeRefCallback];
}
