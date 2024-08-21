// import { useState, useEffect } from 'react';
// import { Button } from './Button';

// export const AddExpense = ({
//   friends,
//   onSetFriends,
//   onSetExpenses,
//   expenses,
//   onShowAddExpenseForm,
//   userBalance,
//   onSetUserBalance,
// }) => {
//   const [payer, setPayer] = useState('');
//   const [amount, setAmount] = useState(0);
//   const [description, setDescription] = useState('');
//   const [participants, setParticipants] = useState([]);
//   const [amountsOwed, setAmountsOwed] = useState({});

//   useEffect(() => {
//     if (participants.length > 0 && amount) {
//       const owedAmounts = calculateOwedAmounts(participants, amount, payer);
//       setAmountsOwed(owedAmounts);
//     }
//   }, [participants, amount, payer]);

//   const handlePayerChange = (event) => {
//     setPayer(event.target.value);
//   };

//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleParticipantChange = (event, participant) => {
//     const { checked } = event.target;
//     setParticipants((prevParticipants) => {
//       if (checked) {
//         return [...prevParticipants, participant];
//       } else {
//         return prevParticipants.filter((p) => p !== participant);
//       }
//     });
//   };

//   const calculateOwedAmounts = (participants, totalAmount, payer) => {
//     const totalParticipants = participants.length;
//     const owedAmounts = {};

//     participants.forEach((participant) => {
//       if (participant === payer) {
//         owedAmounts[participant] = 0;
//       } else {
//         owedAmounts[participant] = totalAmount / totalParticipants;
//       }
//     });

//     return owedAmounts;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newExpense = {
//       payer,
//       amount: amount,
//       description,
//       participants: participants.map((participant) => ({
//         name: participant,
//         amountOwed: amountsOwed[participant].toFixed(2),
//       })),
//     };

//     const updatedExpenses = [...expenses, newExpense];
//     onSetExpenses(updatedExpenses);
//     const updatedFriends = friends.map((friend) => {
//       const amountOwed = amountsOwed[friend.name];
//       if (amountOwed) {
//         const newBalance = parseFloat((friend.balance + amountOwed).toFixed(2));
//         return { ...friend, balance: newBalance };
//       }
//       return friend;
//     });
//     participants.map((participant) => {
//       if (participant === 'User') {
//         const newBalance = parseFloat(
//           (userBalance + amountsOwed['User']).toFixed(2)
//         );
//         onSetUserBalance(newBalance);
//       }
//       return null;
//     });
//     onSetFriends(updatedFriends);
//     setPayer('');
//     setAmount(0);
//     setDescription('');
//     setParticipants([]);
//     setAmountsOwed({});
//     onShowAddExpenseForm((onShowAddExpenseForm) => !onShowAddExpenseForm);
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <div className="payer-selector">
//           <label>Payer:</label>
//           <select value={payer} onChange={handlePayerChange} required>
//             <option value="">Select Payer</option>
//             <option value="User">You</option>
//             {friends.map((friend) => (
//               <option key={friend.id} value={friend.name}>
//                 {friend.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="amount-input">
//           <label>Amount:</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={handleAmountChange}
//             placeholder="Enter Amount"
//             required
//           />
//         </div>

//         <div className="description-input">
//           <label>Description:</label>
//           <input
//             type="text"
//             value={description}
//             onChange={handleDescriptionChange}
//             placeholder="Enter Description"
//             required
//           />
//         </div>

//         <div className="participants-selector">
//           <label>Participants:</label>
//           <ul>
//             <li>
//               <input
//                 type="checkbox"
//                 value="User"
//                 onChange={(e) => handleParticipantChange(e, 'User')}
//               />
//               <span>You</span>
//               <input
//                 type="number"
//                 value={amountsOwed['User'] || ''}
//                 onChange={(e) => handleAmountChange(e, 'User')}
//                 disabled
//               />
//             </li>
//             {friends.map((friend) => (
//               <li key={friend.id}>
//                 <input
//                   type="checkbox"
//                   value={friend.name}
//                   onChange={(e) => handleParticipantChange(e, friend.name)}
//                 />
//                 <span>{friend.name}</span>
//                 <input
//                   type="number"
//                   value={amountsOwed[friend.name] || ''}
//                   onChange={(e) => handleAmountChange(e, friend.name)}
//                   disabled={!participants.includes(friend.name)}
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="add-button">
//           <Button>Add</Button>
//         </div>
//       </form>
//     </div>
//   );
// };
import { useState, useEffect } from 'react';
import { Button } from './Button';

export const AddExpense = ({
  friends,
  onSetFriends,
  onSetExpenses,
  onShowAddExpenseForm,
  userBalance,
  onSetUserBalance,
}) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState([]);
  const [amountsOwed, setAmountsOwed] = useState({});

  useEffect(() => {
    if (participants.length > 0 && amount) {
      const owedAmounts = calculateOwedAmounts(participants, amount, payer);
      setAmountsOwed(owedAmounts);
    }
  }, [participants, amount, payer]);

  const handlePayerChange = (event) => {
    setPayer(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleParticipantChange = (event, participant) => {
    const { checked } = event.target;
    setParticipants((prevParticipants) => {
      if (checked) {
        return [...prevParticipants, participant];
      } else {
        return prevParticipants.filter((p) => p !== participant);
      }
    });
  };

  const calculateOwedAmounts = (participants, totalAmount, payer) => {
    const totalParticipants = participants.length;
    const owedAmounts = {};

    participants.forEach((participant) => {
      if (participant === payer) {
        owedAmounts[participant] = 0;
      } else {
        owedAmounts[participant] = totalAmount / totalParticipants;
      }
    });

    return owedAmounts;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newExpense = {
      payer,
      amount: amount,
      description,
      participants: participants.map((participant) => ({
        name: participant,
        amountOwed: amountsOwed[participant].toFixed(2),
      })),
    };

    // Calculate the payer's share
    const payerShare = parseFloat((amount / participants.length).toFixed(2));

    let updatedFriends = friends.map((friend) => {
      let friendBalance = friend.balance;

      if (payer === friend.name) {
        // If the friend is the payer, they cover the whole amount
        friendBalance += amount - payerShare; // They pay the total amount but will be owed their share
      } else if (amountsOwed[friend.name]) {
        // If the friend is not the payer, they owe a part of the total amount
        friendBalance -= amountsOwed[friend.name];
      }

      return { ...friend, balance: parseFloat(friendBalance.toFixed(2)) };
    });

    // Update User's balance
    if (payer === 'User') {
      // User is the payer
      const userNewBalance = userBalance + amount - payerShare;
      onSetUserBalance(parseFloat(userNewBalance.toFixed(2)));
    } else {
      // User is not the payer
      const userOwed = amountsOwed['User'] || 0;
      const userNewBalance = userBalance - userOwed;
      onSetUserBalance(parseFloat(userNewBalance.toFixed(2)));
    }

    // Update the balance between the payer and each friend to reflect net amounts and user
    updatedFriends = updatedFriends.map((friend) => {
      if (friend.name === payer && payer !== 'User') {
        // Adjust balance between payer and the user
        const netBalance = friend.balance - amountsOwed['User'];
        return { ...friend, balance: parseFloat(netBalance.toFixed(2)) };
      }
      return friend;
    });

    onSetFriends(updatedFriends);
    onSetExpenses(newExpense);

    // Reset form
    setPayer('');
    setAmount(0);
    setDescription('');
    setParticipants([]);
    setAmountsOwed({});
    onShowAddExpenseForm((onShowAddExpenseForm) => !onShowAddExpenseForm);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="payer-selector">
          <label>Payer:</label>
          <select value={payer} onChange={handlePayerChange} required>
            <option value="">Select Payer</option>
            <option value="User">You</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.name}>
                {friend.name}
              </option>
            ))}
          </select>
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
            <li>
              <input
                type="checkbox"
                value="User"
                onChange={(e) => handleParticipantChange(e, 'User')}
              />
              <span>You</span>
              <input
                type="number"
                value={amountsOwed['User'] || ''}
                onChange={(e) => handleAmountChange(e, 'User')}
                disabled
              />
            </li>
            {friends.map((friend) => (
              <li key={friend.id}>
                <input
                  type="checkbox"
                  value={friend.name}
                  onChange={(e) => handleParticipantChange(e, friend.name)}
                />
                <span>{friend.name}</span>
                <input
                  type="number"
                  value={amountsOwed[friend.name] || ''}
                  onChange={(e) => handleAmountChange(e, friend.name)}
                  disabled={!participants.includes(friend.name)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="add-button">
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
};
