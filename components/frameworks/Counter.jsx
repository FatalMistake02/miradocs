import {useState} from 'react';
import './counter.css';
export default function Counter({initial=0,label='React counter'}) {
  const [count,setCount]=useState(initial);
  return <div className="framework-counter"><span>{label}</span><button onClick={()=>setCount(count+1)} aria-label={`${label}: ${count}`}>Count: {count}</button></div>;
}
