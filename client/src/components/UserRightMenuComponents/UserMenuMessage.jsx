import React from 'react'

export const UserMenuMessage = (props) => {
  return (
    <li className="group">
    <a className="flex items-center">
      <i className="fa-regular fa-circle text-2xl group-hover:text-icon-purple group-hover:drop-shadow-white-glow group-hover:animate-sideToSide mr-2"></i>
      {props.userName}
    </a>
  </li>
  )
}
