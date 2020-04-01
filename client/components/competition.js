import React from 'react'
import {Link} from 'react-router-dom'

export const Competition = props => {
  return (
    <div>
      <Link to={`/competitions/${props.comp.id}`}>
        <h2>{props.comp.name}</h2>
      </Link>
      <h3>Date: {props.comp.date}</h3>
      <h4>Address: {props.comp.location}</h4>
    </div>
  )
}
