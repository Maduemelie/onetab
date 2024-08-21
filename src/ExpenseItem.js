export const ExpenseItem = ({ expense }) => {
  return (
    <li className="expense-item">
      <div className="expense-info">
        <h3>{expense.description}</h3>
        <p>Amount: ${expense.amount}</p>
        <p>Paid by: {expense.payer}</p>
      </div>
    </li>
  );
};
