import { useState, useEffect } from 'react';
import NameInputPage from './NameInputPage';
import { AddExpense } from './AddExpense';
import { Button } from './Button';
import { ExpenseList } from './ExpenseList';
// import { Balance } from './Balance';
import { UserBalance } from './UserBalance';
import { FriendList } from './FriendList';
import { AddFriendForm } from './AddFriendForm';
import { FriendDetails } from './FriendDetails';
import { Friend } from './Friend';

const App = () => {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [name, setName] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [amountsOwedHistory, setAmountsOwedHistory] = useState([]);
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [friends, setFriends] = useState(() => {
    const storedFriends = localStorage.getItem('friends');
    return storedFriends ? JSON.parse(storedFriends) : [];
  });

  // Store expenses and friends in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  // Retrieve user's name from local storage or set it when it's updated
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Add the user to the friends list if they are not already there
  useEffect(() => {
    if (name && !friends.some((friend) => friend.name === name)) {
      const newFriend = {
        id: Date.now(),
        name,
        balance: 0,
        image: `https://i.pravatar.cc/48?u=${name}`,
      };
      setFriends((prevFriends) => [...prevFriends, newFriend]);
    }
  }, [name, friends]);

  // Toggle forms
  const handleShowAddFriendForm = () => {
    setShowAddFriendForm((show) => !show);
    setShowAddExpenseForm(false);
  };

  const handleShowAddExpenseForm = () => {
    setShowAddExpenseForm((show) => !show);
    setShowAddFriendForm(false);
  };

  // Select or deselect a friend
  const handleSelectedFriend = (friend) => {
    setSelectedFriend(selectedFriend === friend ? null : friend);
  };

  // Add a new expense
  const handleAddExpense = (expense) => {
    setExpenses((expenses) => [...expenses, expense]);
  };

  return (
    <div className="app">
      {!name ? (
        <NameInputPage setName={setName} />
      ) : (
        <>
          <div className="balance-container">
            <UserBalance friends={friends} expenses={expenses} name={name} />
          </div>

          <div className="main-content">
            <div className="sidebar">
              <FriendList>
                <Friend
                  name={name}
                  friends={friends}
                  onSetFriends={setFriends}
                  expenses={expenses}
                  selectedFriend={selectedFriend}
                  onSetSelectedFriend={handleSelectedFriend}
                />
              </FriendList>

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
                <FriendDetails
                  friend={selectedFriend}
                  expenses={expenses}
                  amountsOwedHistory={amountsOwedHistory}
                />
              ) : (
                <ExpenseList
                  expenses={expenses}
                  onSetExpenses={handleAddExpense}
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
                  amountsOwedHistory={amountsOwedHistory}
                  setAmountsOwedHistory={setAmountsOwedHistory}
                />
              )}

              {!selectedFriend && (
                <Button onClick={handleShowAddExpenseForm}>
                  {showAddExpenseForm ? 'Close' : 'Add Expense'}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
