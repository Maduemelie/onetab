import { Button } from './Button';

export const Friend = ({
  friends,
  selectedFriend,
  onSetSelectedFriend,
  name,
}) => {
  const handleSelect = (friend) => {
    onSetSelectedFriend(friend);
  };

  // Filter out the current user from the friends list
  const filteredFriends = friends.filter((friend) => friend.name !== name);

  return (
    <>
      <ul>
        {filteredFriends.map((friend) => (
          <li key={friend.name} className="friend">
            <img src={friend.image} alt={friend.name} />
            <div className="friend-info">
              <h2>{friend.name}</h2>
              <p
                className={friend.balance < 0 ? 'balance negative' : 'balance'}
              >
                <span>Balance:</span>
                {friend.balance}
              </p>
            </div>
            <Button onClick={() => handleSelect(friend)}>
              {selectedFriend === friend ? 'Close' : 'Select'}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
