import { useState, useMemo, useReducer } from 'react'

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
}

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {count: state.count + 1};
    case ACTIONS.DECREMENT:
      return {count: state.count - 1};
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0});
  // const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const incrementCounterOne = () => {
    dispatch({ type: ACTIONS.INCREMENT});
  }

  const decrementCounterOne = () => {
    dispatch({ type: ACTIONS.DECREMENT});
  }

  const incrementCounterTwo = () => {
    setCounterTwo((prevCount) => prevCount + 1);
  }

  // const isEven = () => {
  //   let i = 0;
  //   while( i< 2000_000_000) i++
  //   return counterOne % 2 === 0;
  // }

  // const isEven = useMemo(() => {
  //   let i = 0;
  //   while( i< 2000_000_000) i++
  //   return counterOne % 2 === 0;
  // }, [counterOne]);

  return (
    <>
    <div> 
        <button type='button' onClick={decrementCounterOne}>-</button>
        {state.count}
        <button type='button' onClick={incrementCounterOne}>+{}</button><br/>
        {/* <span>{isEven() ? 'Even' : 'Odd'}</span> */}
        {/* <span>{isEven ? 'Even' : 'Odd'}</span> */}
    </div>
    <div>
        <button type='button' onClick={incrementCounterTwo}>Count Two - {counterTwo}</button>
    </div>
    </>
  )
}

export default Counter