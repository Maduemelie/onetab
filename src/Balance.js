import { useState } from 'react';

export const Balance = ({ friends, expenses, userBalance }) => {
  const userImage = 'https://i.pravatar.cc/48?u=118836 ';

  return (
    <div className="balance">
      <img src={userImage} alt="User " className="user-image" />
      <div className="balance-info">
        <h2>Total Balance</h2>
        <p>${userBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};
