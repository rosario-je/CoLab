import React from 'react'
import { ProjectCard } from './ProjectCard'

export const ProjectList = () => {
  //will be populated with data from the backend
  return (
    <div className='w-11/12 '>
      <ProjectCard />
      <ProjectCard />
    </div>
  )
}
