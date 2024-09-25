export const UserBalance = ({ name, friends }) => {
  // Find the current user once and store in a variable
  const currentUser = friends.find((friend) => friend.name === name);

  console.log('UserBalance: currentUser', currentUser);
  // Set userImage using the result from currentUser
  const userImage = currentUser
    ? currentUser.image
    : 'https://i.pravatar.cc/48?u=118836';

  // Set user balance, and if the user isn't found, default to 0
  const userBalance = currentUser ? currentUser.balance : 0;

  return (
    <div className="balance">
      <img src={userImage} alt="User" className="user-image" />
      <h2>{name}</h2>
      <div className="balance-info">
        <h2>Total Balance</h2>
        <p>{userBalance}</p>
      </div>
    </div>
  );
};
