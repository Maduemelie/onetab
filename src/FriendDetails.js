
export const FriendDetails = ({ friend, expenses, amountsOwedHistory }) => {
  const friendExpenses = expenses.flatMap((expense) =>
    expense.participants
      .filter((participant) => participant.name === friend.name)
      .map((participant) => ({
        description: expense.description,
        amountOwed: parseFloat(participant.amountOwed) || 0, // Ensure amountOwed is a number
        payer: expense.payer,
      }))
  );

  // Calculate the balance based on amounts owed and expenses paid
  const balanceWithFriends = amountsOwedHistory.reduce(
    (totalBalance, currentOwed) => {
      const friendOwes = currentOwed.owedAmounts[friend.name] || 0;
      const youOweFriend = currentOwed.owedAmounts['User'] || 0;

      if (currentOwed.payer === friend.name) {
        // Friend paid for an expense, you owe them
        return totalBalance + friendOwes;
      } else if (currentOwed.payer === 'User') {
        // You paid for an expense, friend owes you
        return totalBalance - youOweFriend;
      }

      return totalBalance;
    },
    0
  );

  return (
    <div className="friend-details">
      <h2>{friend.name}'s Details</h2>
      <ul>
        {friendExpenses.map((expense, index) => (
          <li key={index}>
            {friend.name !== expense.payer
              ? `${expense.description}: $${expense.amountOwed.toFixed(
                  2
                )} owed to ${expense.payer}`
              : `You paid for ${
                  expense.description
                }, covering $${expense.amountOwed.toFixed(2)}.`}
          </li>
        ))}
      </ul>

      {/* Display balance with friend */}
      <div className="balance-details">
        <h3>Balance Summary</h3>
        {balanceWithFriends > 0 ? (
          <p>{`${friend.name} owes you $${balanceWithFriends.toFixed(2)}.`}</p>
        ) : (
          <p>{`You owe ${friend.name} $${Math.abs(balanceWithFriends).toFixed(
            2
          )}.`}</p>
        )}
      </div>
    </div>
  );
};
