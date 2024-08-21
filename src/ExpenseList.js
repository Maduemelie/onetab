import { ExpenseItem } from './ExpenseItem';

export const ExpenseList = ({ expenses, onsetExpenses, friends }) => {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <ExpenseItem
            key={index}
            expense={expense}
            friends={friends}
            onsetExpenses={onsetExpenses}
          />
        ))}
      </ul>
    </div>
  );
};
