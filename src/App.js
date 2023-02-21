import { useState } from "react";
import "./styles.css";
import List from "./components/List";
import { getMatches } from "./provider/getMatches";

export default function App() {
  const [toDos, setToDos] = useState([]);
  const [dones, setDones] = useState([]);

  const toDone = (id) => {
    const toDosCopy = [...toDos];
    const toDosUpdate = toDosCopy.filter((f) => f.id !== id);
    const toAdd = toDosCopy.filter((f) => f.id === id);
    setToDos(toDosUpdate);
    setDones([...dones, ...toAdd]);
  };

  const addItem = (ItemToAdd) => {
    const toDosCopy = [...toDos];
    toDosCopy.push(ItemToAdd);
    setToDos(toDosCopy);
  };

  return (
    <div className="App">
      <button onClick={() => getMatches()}>getMatches</button>
      <div className="content">
        <List
          title={"TO DO"}
          itemList={toDos}
          actionCheck={toDone}
          onSumbitAction={addItem}
        />
        <List title={"DONE"} itemList={dones} actionCheck={toDone} />
      </div>
    </div>
  );
}
