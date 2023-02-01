import React from "react";
import Items from "./Items";
import ToDoForm from "./ToDoForm";

function List({ title, itemList, actionCheck, onSumbitAction }) {
  return (
    <div className="list">
      <h1>{title}</h1>
      {title === "TO DO" ? <ToDoForm onSubmitAction={onSumbitAction} /> : ""}
      <ul>
        {itemList.map((item) => {
          return (
            <Items
              itemInfo={item}
              actionClick={() => actionCheck(item.id)}
              key={item.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default List;
