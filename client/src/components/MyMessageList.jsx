import React from 'react';  
import { MyMessageListItems } from './MyMessageListItems';  

export const MyMessageList = () => {
  return(
    <div className="h-full w-[90%]">
      {/* map through the component when database is populated */}
      <MyMessageListItems />
    </div>
  )
}