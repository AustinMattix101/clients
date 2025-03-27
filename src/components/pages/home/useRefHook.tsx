import { useEffect, useRef, useState } from "react";
import CustomInput from "./CustomInput";

const useRefHook: React.FC = () => {
  // Use Ref hook
  const [name, setName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(1);
  const ref = useRef(1);
  const inputRef = useRef<any>();
  const prevName = useRef('');

  // Use Ref hook
  function getFocusHandler () {
    const value = inputRef.current.value;
    if (!value) inputRef.current.focus();
    else alert(inputRef.current.value);
  }

  useEffect(() => {
    ref.current += 1;
    prevName.current = name;
  }, [name]);

    // Cause Inifine Loop
  // useEffect(() => { 
  //   setCount((prevState) => prevState + 1);
  //   console.log(count);
  // }, [count]);

  // useEffect(() => { 
  //   setCount((prevState) => prevState + 1);
  //   console.log(count);
  // });

  return (
    <>
    <CustomInput ref={inputRef} className="root__background-color" type="text" value={name} onChange={(e:any) => setName(e.target.value)} />
    <div>My name is "{name}"</div>
    <div>Previous Name used to be "{prevName.current}"</div>
    <div>I rendered {ref.current} {count} times.</div>
    <button type="button" onClick={getFocusHandler}>{"<<getFocus>>"}</button>
    </>
  )
}

export default useRefHook;