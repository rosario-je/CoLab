import React from 'react';  
import { Navbar } from '../components/Navbar';
import { UserLeftMenu } from '../components/UserLeftMenu';  
import { MyMessageList } from '../components/MyMessages/MyMessageList';
import { UserRightMenu } from '../components/UserRightMenu';

export const MyMessages = () => { 
  return(
    <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 mt-16">
      <UserLeftMenu />
      <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
        <div className="flex-grow flex flex-col justify-center items-center h-full mx-72">
          <MyMessageList />
        </div>
      </div>
      <UserRightMenu />
    </div>
  </div>
  )
}