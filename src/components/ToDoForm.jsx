import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ToDoForm({ onSubmitAction }) {
  const [newItem, setNewItem] = useState("");

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nom = newItem;
    const id = uuidv4();
    const isComplet = false;
    //const id = "" + Date.now;

    if (nom.length > 0) {
      const toAdd = { id, nom, isComplet };
      onSubmitAction(toAdd);
      setNewItem("");
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <input
        name="newTodo"
        type="text"
        value={newItem}
        placeholder="Ajouter un Item"
        onChange={handleChange}
      />
    </form>
  );
}

export default ToDoForm;
