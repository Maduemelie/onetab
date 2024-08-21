export const FriendDetails = ({ friend, expenses }) => {
  const friendExpenses = expenses.flatMap((expense) =>
    expense.participants
      .filter((participant) => participant.name === friend.name)
      .map((participant) => ({
        description: expense.description,
        amountOwed: parseFloat(participant.amountOwed) || 0, // Ensure amountOwed is a number
        payer: expense.payer,
      }))
  );

  if (friendExpenses.length === 0) {
    return <div>No expenses found for {friend.name}.</div>;
  }

  return (
    <div className="friend-details">
      <h2>{friend.name}'s Expenses</h2>
      <ul>
        {friendExpenses.map((expense, index) =>
          friend.name !== expense.payer ? (
            <li key={index}>
              {` ${expense.description}: $${expense.amountOwed.toFixed(2)}
          owed to ${expense.payer}`}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};
