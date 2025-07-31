import React from 'react'

function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  const Array = user.name.split(' ');
  
  return (
    <>
    <p style={{padding:8,color:'red',fontSize:24,fontWeight:'bold'}}>HELLO,<span style={{color:'blue'}}>{Array[0].toUpperCase()}</span></p>
    
    </>
  )
}

export default Home