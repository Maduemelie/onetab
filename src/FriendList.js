import React from 'react';
import { Friend } from './Friend';

export const FriendList = ({
  friends,
  expenses,
  selectedFriend,
  onSetSelectedFriend,
  showExpenseList,
  onShowExpenseList,
}) => {
  return (
    <div className="friend-list">
      <h2>Friend List</h2>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            expenses={expenses}
            selectedFriend={selectedFriend}
            onSetSelectedFriend={onSetSelectedFriend}
            showExpenseList={showExpenseList}
            onShowExpenseList={onShowExpenseList}
          />
        ))}
      </ul>
    </div>
  );
};
