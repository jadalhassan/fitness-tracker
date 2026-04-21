import { useEffect, useState } from "react";

export function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, running]);

  return {
    remaining,
    running,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: (nextSeconds = initialSeconds) => {
      setRunning(false);
      setRemaining(nextSeconds);
    }
  };
}
