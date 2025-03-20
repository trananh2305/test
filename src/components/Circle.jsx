import { useEffect, useState } from "react";

const Circle = ({
  id,
  x,
  y,
  handleChoosePoint,
  isCorrect,
  isAuto,
  nextPoint,
  isRestart,
}) => {
  const [time, setTime] = useState(3);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isAuto) {
      if (id === nextPoint) {
        setIsClicked(true);
      }
    }
    if (time === 0 && isCorrect) {
      handleChoosePoint(id);
    }
  }, [time, isAuto, nextPoint]);

  useEffect(() => {
    setTime(3);
    setIsClicked(false);
  }, [isRestart]);

  useEffect(() => {
    let timer;
    if (isClicked && isCorrect) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0.1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 0.1;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isClicked, isAuto]);


  return (
    <button
      className={`absolute border w-10 h-10 rounded-full border-red-700 focus:bg-red-200 hover:cursor-pointer flex flex-col  ${
        isClicked ? "bg-amber-700" : ""
      }`}
      style={{ top: `${y}px`, left: `${x}px`, opacity: time / 3 }}
      onClick={() => {
        setIsClicked(true);
      }}
      disabled={!isCorrect || isClicked}
    >
      {id}
      <span className="text-[7px] text-slate-500">{time.toFixed(1)}</span>
    </button>
  );
};

export default Circle;
