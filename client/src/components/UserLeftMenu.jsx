import React from 'react';

export const UserLeftMenu = () => {
  return (
    <div className="h-screen text-text-color">
      <ul className="menu bg-base-200 w-56 h-full">
        <li className="pl-0 border-none">
          <h2 className="text-text-color text-lg">Main Menu</h2>
          <ul className="pl-0 border-none">
            <li className=""><a>Feed</a></li>
            <li className=""><a>Projects</a></li>
            <li className=""><a>Messages</a></li>
            <li className=""><a>Users</a></li>
          </ul>
        </li>
        <li className="pl-0 border-none">
          <h2 className="text-text-color text-lg">Explore</h2>
          <ul className="pl-0 border-none">
            <li className=""><a>Liked Projects</a></li>
            <li className=""><a>Recommended</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
