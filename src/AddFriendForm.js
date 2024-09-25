import React, { useState } from 'react';
import { Button } from './Button';

export const AddFriendForm = ({
  friends,
  onSetFriends,
  onShowAddFriendForm,
}) => {
  const [name, setName] = useState('');
  // const [id, setId] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newId = crypto.randomUUID();
    if (!name || !image) {
      return;
    }
    // setId(newId);
    const newFriend = {
      id: newId,
      name,
      image: `${image}?=${newId}`,
      balance: parseFloat(0.0),
    };
    onSetFriends([...friends, newFriend]);
    onShowAddFriendForm((onShowAddFriendForm) => !onShowAddFriendForm);
  };

  return (
    <form onSubmit={handleSubmit} className="add-friend-form">
      <label> 🎅🏽Friend's Name:</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label> 🎅🏽Friend's Image URL</label>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};
