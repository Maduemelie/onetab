import { useState } from 'react';
import { AddExpense } from './AddExpense';
import { Button } from './Button';
import { ExpenseList } from './ExpenseList';
import { Balance } from './Balance';
import { FriendList } from './FriendList';
import { AddFriendForm } from './AddFriendForm';
import { FriendDetails } from './FriendDetails';

const initialExpenses = [
  {
    description: 'Lunch at cafe',
    amount: 15.0,
    payer: 'Zenny',
    participants: [
      { name: 'Ahamad', amountOwed: 5.0 },
      { name: 'Bobby', amountOwed: 5.0 },
      { name: 'Zenny', amountOwed: 5.0 },
    ],
  },
  {
    description: 'Dinner at restaurant',
    amount: 50.0,
    payer: 'Ahamad',
    participants: [
      { name: 'Zenny', amountOwed: 15.0 },
      { name: 'Bobby', amountOwed: 15.0 },
      { name: 'Ahamad', amountOwed: 20.0 },
    ],
  },
  {
    description: 'Movie night',
    amount: 20.0,
    payer: 'Bobby',
    participants: [
      { name: 'Zenny', amountOwed: 5.0 },
      { name: 'Ahamad', amountOwed: 5.0 },
      { name: 'Bobby', amountOwed: 10.0 },
    ],
  },
];

const initialFriends = [
  {
    id: 4994766745,
    name: 'Zenny',
    balance: 0,
    image: 'https://i.pravatar.cc/48?u=4994766745',
  },
  {
    id: 4994766565,
    name: 'Ahamad',
    balance: 0,
    image: 'https://i.pravatar.cc/48?u=4994766565',
  },
  {
    id: 49947675,
    name: 'Bobby',
    balance: 0,
    image: 'https://i.pravatar.cc/48?u=49947675',
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [userBalance, onSetUserBalance] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriendForm = () => {
    setShowAddFriendForm((showAddFriendForm) => !showAddFriendForm);
  };

  const handleSelectedFriend = (friend) => {
    setSelectedFriend(selectedFriend === friend ? null : friend);
  };

  const handleShowAddExpenseForm = () => {
    setShowAddExpenseForm((showAddExpenseForm) => !showAddExpenseForm);
  };

  const handleAddExpense = (expense) => {
    setExpenses((expenses) => [...expenses, expense]);
  };

  return (
    <div className="app">
      <div className="balance-container">
        <Balance
          friends={friends}
          expenses={expenses}
          userBalance={userBalance}
          onSetUserBalance={onSetUserBalance}
        />
      </div>

      <div className="main-content">
        <div className="sidebar">
          <FriendList
            friends={friends}
            onSetFriends={setFriends}
            expenses={expenses}
            selectedFriend={selectedFriend}
            onSetSelectedFriend={handleSelectedFriend}
          />

          {showAddFriendForm && !selectedFriend && (
            <AddFriendForm
              friends={friends}
              onSetFriends={setFriends}
              onShowAddFriendForm={handleShowAddFriendForm}
              expenses={expenses}
            />
          )}
          <Button onClick={handleShowAddFriendForm}>
            {showAddFriendForm && !selectedFriend ? 'Close' : 'Add Friend'}
          </Button>
        </div>

        <div className="expense-container">
          {selectedFriend ? (
            <FriendDetails friend={selectedFriend} expenses={expenses} />
          ) : (
            <ExpenseList
              expenses={expenses}
              onsetExpenses={handleAddExpense}
              friends={friends}
            />
          )}

          {showAddExpenseForm && !selectedFriend && (
            <AddExpense
              friends={friends}
              expenses={expenses}
              onSetExpenses={handleAddExpense}
              onSetFriends={setFriends}
              onShowAddExpenseForm={handleShowAddExpenseForm}
              userBalance={userBalance}
              onSetUserBalance={onSetUserBalance}
            />
          )}

          {!selectedFriend && (
            <Button onClick={handleShowAddExpenseForm}>
              {showAddExpenseForm ? 'Close' : 'Add Expense'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
