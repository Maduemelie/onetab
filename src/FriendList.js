import React from 'react';

export const FriendList = ({ children }) => {
  return (
    <div className="friend-list">
      <h2>Friend List</h2>
      {children}
    </div>
  );
};
