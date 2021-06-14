import React, { useEffect } from "react";
import firebase from "firebase";
import { connect } from "react-firebase";
import { Form, TextArea, Card, Button, Icon } from "semantic-ui-react";
import TaskItem from "./components/TaskItem";

firebase.initializeApp({
  databaseURL:
    "https://dentira-ba865-default-rtdb.europe-west1.firebasedatabase.app",
});

const Task = ({ taskList, updateItem, addItem, deleteItem }) => {
  const [newValue, setNewvalue] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const list = { ...taskList };

  const onChangeUpdate = (e, index) => {
    updateItem(e.target.value, index);
  };

  return (
    <div style={{ padding: "1%" }}>
      <Card.Group>
        {Object.keys(list).map((key) => (
          <TaskItem
            deleteItem={deleteItem}
            currentkey={key}
            key={key}
            onChangeUpdate={onChangeUpdate}
            header="my header"
            meta="my meta"
            description={list[key]}
          ></TaskItem>
        ))}
        <div
          style={{ marginTop: "5%", right: "5%" }}
          onClick={() => setEdit(true)}
          onBlur={() => setEdit(false)}
        >
          {!edit ? (
            <Button color="blue">
              {" "}
              Add <Icon name="plus right" />
            </Button>
          ) : (
            <TextArea
              type="text"
              key={"new"}
              autoFocus
              value={newValue}
              placeholder={"Add an item"}
              onBlur={(e) => {
                if (newValue) {
                  addItem(newValue);
                  setNewvalue("");
                }
              }}
              onChange={(e) => setNewvalue(e.target.value)}
            />
          )}
        </div>
      </Card.Group>
    </div>
  );
};

export default connect((props, ref) => ({
  taskList: "task",
  addItem: (data) => ref(`task`).push(data),
  updateItem: (data, index) => ref(`task/${index}`).set(data),
  deleteItem: (index) => ref(`task`).child(index).remove(),
}))(Task);
