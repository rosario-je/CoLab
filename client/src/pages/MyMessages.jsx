import React from 'react';  
import { Navbar } from '../components/Navbar';
import { UserLeftMenu } from '../components/UserLeftMenu';  
import { MyMessageList } from '../components/MyMessageList';
import { UserRightMenuMessages } from '../components/UserRightMenuMessages';

export const MyMessages = () => { 
  return(
    <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 mt-16">
      <UserLeftMenu />
      <div className="flex flex-col w-full h-full bg-project-background overflow-hidden">
        <div className="flex-grow flex flex-col justify-center items-center h-full">
          <div className="w-full flex justify-start items-center py-1 bg-menu-colors h-[75px]">
          <h1 className="text-white text-2xl">My Messages</h1>
          </div>
          <MyMessageList />
        </div>
      </div>
      <UserRightMenuMessages />
    </div>
  </div>
  )
}