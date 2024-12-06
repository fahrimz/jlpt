import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export interface StopwatchImperativeHandle {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getTime: () => number;
}

export const Stopwatch = forwardRef<StopwatchImperativeHandle>((_, ref) => {
  const [time, setTime] = useState(0);
  const stopwatchInterval = useRef<NodeJS.Timeout | null>(null);
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [time]);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        stopwatchInterval.current = setInterval(() => {
          setTime((prev) => prev + 1);
        }, 1000);
      },
      stop: () => {
        if (stopwatchInterval.current) {
          clearInterval(stopwatchInterval.current);
        }
      },
      reset: () => {
        setTime(0);
      },
      getTime: () => time,
    }),
    [time]
  );

  return (
    <div className="absolute right-0 bottom-0 mr-8 mb-8">
      <div className="border-4 border-[#535bf2] p-8 w-14 h-14 flex flex-col justify-center items-center rounded-full">
        <span className="font-semibold font-mono">{formattedTime}</span>
      </div>
    </div>
  );
});

Stopwatch.displayName = "Stopwatch";
