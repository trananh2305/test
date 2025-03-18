import { useCallback, useEffect, useState } from "react";
import Circle from "./components/Circle";

function App() {
  const getRandomPosition = (max) => Math.floor(Math.random() * max);
  const [isPlay, setIsPlay] = useState(false);
  const [isRestart, setIsRestart] = useState(false);
  const [inputPoint, setInputPoint] = useState(0);
  const [points, setPoints] = useState([]);
  const [nextPoint, setNextPoint] = useState(1);
  const [isCorrect, setIsCorrect] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setPoints(
      Array.from({ length: inputPoint }, (_, i) => ({
        id: i + 1,
        x: getRandomPosition(400),
        y: getRandomPosition(400),
        isChoose: false,
      }))
    );
    setNextPoint(1);
    setIsCorrect(true);
    setIsFinished(false);
    setTime(0);
    setIsAuto(false);
  }, [inputPoint, isRestart, isPlay]);

  useEffect(() => {
    let timer;
    if (isPlay && isCorrect && !isFinished) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlay, isCorrect, isFinished]);

  const handleRemove = (id) => {
    setPoints((prev) => prev.filter((point) => point.id !== id));
  };
  const handleClickCircle = useCallback(
    (id) => {
      if (id !== nextPoint) {
        setIsCorrect(false);
      }
      if (id === nextPoint) {
        handleRemove(id);
        if (nextPoint == inputPoint) {
          setIsFinished(true);
        }
        setNextPoint(id + 1);
      }
    },
    [nextPoint]
  );

  // useEffect(() => {
  //     if (!isAuto || !isCorrect || isFinished || points.length === 0) return;

  //     let index = 0;
  //     const interval = setTimeout(() => {
  //       if (index >= points.length || !isAuto) {
  //         clearInterval(interval);
  //         return;
  //       }
  //       handleClickCircle(points[index].id);
  //       index++;
  //     }, 1000);

  //     return () => clearTimeout(interval);
  //   }, [isAuto, isCorrect, isFinished, points]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-fit h-fit border-2 border-black p-4 gap-2">
        <h1
          className={`font-bold ${
            isCorrect
              ? isFinished
                ? "text-green-500"
                : "text-black"
              : "text-red-600"
          }`}
        >
          {" "}
          {isCorrect ? (isFinished ? "ALL CLEAR" : "LET'S PLAY") : "GAMEOVER"}
        </h1>
        <div className="flex gap-10">
          <span>Points:</span>
          <input
            type="text"
            className="border outline-0"
            value={inputPoint}
            onChange={(e) => setInputPoint(e.target.value)}
          />
        </div>
        <div className="flex gap-12">
          <span>Time:</span>
          <span>{time.toFixed(1)}s</span>
        </div>
        <div className="">
          {isPlay ? (
            <div className="flex gap-10">
              <button
                className="border px-4 rounded bg-slate-200"
                onClick={() => {
                  setIsRestart(!isRestart);
                  setIsCorrect(true);
                }}
              >
                Restart
              </button>
              {isAuto ? (
                <button
                  className="border px-1 rounded bg-slate-200"
                  onClick={() => setIsAuto(false)}
                >
                  Auto Play OFF
                </button>
              ) : (
                <button
                  className="border px-1 rounded bg-slate-200"
                  onClick={() => {
                    setIsAuto(true);
                  }}
                >
                  Auto Play ON
                </button>
              )}
            </div>
          ) : (
            <button
              className="border px-4 rounded bg-slate-200"
              onClick={() => {
                setIsPlay(true);
                setIsCorrect(true);
              }}
            >
              Play
            </button>
          )}
        </div>
        <div className="w-[450px] h-[450px] border-2 relative">
          {isPlay &&
            points.map((point) => (
              <Circle
                key={point.id}
                id={point.id}
                handleChoosePoint={handleClickCircle}
                x={point.x}
                y={point.y}
                isCorrect={isCorrect}
                nextPoint={nextPoint}
                handleRemove={handleRemove}
                isAuto={isAuto}
                isRestart={isRestart}
              />
            ))}
        </div>
        {isPlay && <span>next: {nextPoint > inputPoint ? 0 : nextPoint} </span>}
      </div>
    </div>
  );
}

export default App;
