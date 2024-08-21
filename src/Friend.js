import { Button } from './Button';

export const Friend = ({
  friend,
  selectedFriend,
  onSetSelectedFriend,
  showExpenseList,
  onShowExpenseList,
}) => {
  const handleSelect = () => {
    onSetSelectedFriend(friend);
  };

  return (
    <>
      <li className="friend">
        <img src={friend.image} alt={friend.name} />
        <div className="friend-info">
          <h2>{friend.name}</h2>
          <p className={friend.balance < 0 ? 'balance negative' : 'balance'}>
            <span>Balance:</span>
            {friend.balance}
          </p>
        </div>
        <Button onClick={handleSelect}>
          {selectedFriend === friend ? 'Close' : 'Select'}
        </Button>
      </li>
    </>
  );
};
