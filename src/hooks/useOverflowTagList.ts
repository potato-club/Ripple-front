import { useLayoutEffect, useState } from "react";

export const useOverflowTagList = <T>(
  containerRef: React.RefObject<HTMLElement | null>,
  moreTagRef: React.RefObject<HTMLElement | null>,
  items: T[]
) => {
  const [visibleCount, setVisibleCount] = useState(items.length);

  useLayoutEffect(() => {
    if (!containerRef.current || !moreTagRef.current) return;

    const container = containerRef.current;
    const moreEl = moreTagRef.current;

    const children = Array.from(container.children)
      .filter(el => el !== moreEl) as HTMLElement[];

    const maxX =
      container.clientWidth - moreEl.offsetWidth;

    let count = 0;

    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const rightEdge = el.offsetLeft + el.offsetWidth;

      if (rightEdge > maxX) break;
      count++;
    }

    setVisibleCount(count);
  }, [items]);

  return {
    visibleCount,
    hiddenCount: Math.max(0, items.length - visibleCount),
  };
};