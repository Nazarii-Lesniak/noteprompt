import { useEffect, useRef } from 'react';
import { Message } from '../types/chat';

export function useScrollMessage(dependency: Message[], isStreaming: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 100;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isAtBottomRef.current) {
      return;
    }

    if (isStreaming) {
      container.scrollTop = container.scrollHeight;
    } else {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [dependency, isStreaming]);

  return {
    containerRef,
    handleScroll,
  };
}
