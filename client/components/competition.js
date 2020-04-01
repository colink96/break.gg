import React from 'react'

export const Competition = props => {
  return (
    <div>
      <h2>{props.comp.name}</h2>
      <h3>
        Date: {props.comp.month}/{props.comp.day}/{props.comp.year}
      </h3>
      <h4>Address: {props.comp.location}</h4>
    </div>
  )
}
