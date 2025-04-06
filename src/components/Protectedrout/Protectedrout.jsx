import React, { useEffect, useState } from 'react'
import Style from'./Protectedrout.module.css'
export default function Protectedrout() {
    const [counter, setCounter] = useState(0)
    useEffect(()=>{},[]);
  return (
    <>
    <h1>Protectedrout</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas impedit repellat, praesentium eius est et repellendus nisi. Deserunt, qui asperiores laborum officia perferendis ducimus nostrum blanditiis, eos doloremque in assumenda!</p>
    </>
  )
}
