import { useCallback, useEffect, useMemo, useState } from "react";
import Counter from "./Counter";

// function slowFunction(n: number) {
//   console.log("Calling slow function")
//   for (let i = 0; i <= 1000_000_000; i++) {}
//   return n * n;
// }

const getArray = () => {
    console.log("Array printed!");
    for (let i = 0; i <= 2000_000_000; i++) {};
    return ['Austin',' ', 'Mattix'];
  }

const useMemoHook: React.FC = () => {
    // Use Memo hook
  const slowFunction = useCallback((n: number) => {
    console.log("Calling slow function")
    for (let i = 0; i <= 1000_000_000; i++) {}
    return n * n;
    }, []);

  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => slowFunction(number), [number, slowFunction]);
  const themeStyles = useMemo(() => { return {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }}, [dark]) // {} === {} false, [] === [] false

  const array = useMemo(()=>getArray(), []);

useEffect(() => {
  console.log("Theme Changed!")
}, [themeStyles]);
  return (
    <>
    <input className="root__background-color" type="number" name="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}/>
    <button type="button" onClick={() => setDark((prevDark) => !prevDark)}>{"<<setDark>>"}</button>
    <div style={themeStyles}>{doubleNumber}</div>
    <div>{array}</div>
    <Counter />
    </>
  )
}

export default useMemoHook;