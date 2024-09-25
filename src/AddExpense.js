import { useState } from 'react';
import { Button } from './Button';

export const AddExpense = ({
  friends,
  onSetFriends,
  onSetExpenses,
  onShowAddExpenseForm,
}) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState([]);
  // const [amountsOwed, setAmountsOwed] = useState({});
  const [errors, setErrors] = useState({});

  // Function to calculate owed amounts
  const calculateOwedAmounts = (participants, totalAmount, payer) => {
    const totalParticipants = participants.length;
    const owedAmounts = {};

    participants.forEach((participant) => {
      if (participant === payer) {
        owedAmounts[participant] = 0; // Payer doesn't owe anything
      } else {
        owedAmounts[participant] = (totalAmount / totalParticipants).toFixed(2);
      }
    });
    return owedAmounts;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!payer) newErrors.payer = 'Please select a payer.';
    if (amount <= 0) newErrors.amount = 'Amount must be greater than zero.';
    if (participants.length === 0)
      newErrors.participants = 'Please select at least one participant.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate how much each participant owes
    const owedAmounts = calculateOwedAmounts(participants, amount, payer);

    const newExpense = {
      payer,
      amount: parseFloat(amount),
      description,
      participants: participants.map((participant) => ({
        name: participant,
        amountOwed: parseFloat(owedAmounts[participant] || 0).toFixed(2),
      })),
    };
    console.log('New Expense:', newExpense);

    // Update the balances of the friends
    const updatedFriends = friends.map((friend) => {
      let friendBalance = parseFloat(friend.balance || 0);

      if (payer === friend.name) {
        // Calculate the total owed to the payer
        const totalOwedToPayer = participants.reduce((total, participant) => {
          return participant !== payer
            ? total + parseFloat(owedAmounts[participant] || 0)
            : total;
        }, 0);

        // The payer's balance increases by what others owe minus their own share
        friendBalance += totalOwedToPayer;
      } else if (participants.includes(friend.name)) {
        // If the friend is a participant but not the payer, subtract what they owe
        const owedAmount = parseFloat(owedAmounts[friend.name] || 0);
        friendBalance -= owedAmount;
      }

      return { ...friend, balance: parseFloat(friendBalance.toFixed(2)) };
    });

    onSetFriends(updatedFriends);
    onSetExpenses(newExpense);

    // Reset form
    resetForm();
    onShowAddExpenseForm(false);
  };

  const resetForm = () => {
    setPayer('');
    setAmount('');
    setDescription('');
    setParticipants([]);
    setErrors({});
  };

  // Event handlers
  const handlePayerChange = (event) => setPayer(event.target.value);
  const handleAmountChange = (event) =>
    setAmount(parseFloat(event.target.value) || '');
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleParticipantChange = (event, participant) => {
    const { checked } = event.target;
    setParticipants((prevParticipants) =>
      checked
        ? [...prevParticipants, participant]
        : prevParticipants.filter((p) => p !== participant)
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="payer-selector">
          <label>Payer:</label>
          <select value={payer} onChange={handlePayerChange} required>
            <option value="">Select Payer</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.name}>
                {friend.name}
              </option>
            ))}
          </select>
          {errors.payer && <p className="error">{errors.payer}</p>}
        </div>

        <div className="amount-input">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
            required
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>

        <div className="description-input">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter Description"
            required
          />
        </div>

        <div className="participants-selector">
          <label>Participants:</label>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>
                <input
                  type="checkbox"
                  value={friend.name}
                  onChange={(e) => handleParticipantChange(e, friend.name)}
                />
                <span>{friend.name}</span>
              </li>
            ))}
          </ul>
          {errors.participants && (
            <p className="error">{errors.participants}</p>
          )}
        </div>

        <div className="add-button">
          <Button disabled={!payer || amount <= 0 || participants.length === 0}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
