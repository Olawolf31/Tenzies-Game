import React from 'react'


const Die = ({ value, hold, holdDice }) => {

  return (
    <div>
      
      <div onClick={holdDice} className="num-container" style={hold ?
        { backgroundColor: 'green', color: "#fff" }
        : { backgroundColor: '#fff' }} >
        <h1 className="num-value">{value}</h1>
      </div>
    </div>

  )
}

export default Die
