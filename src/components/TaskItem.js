import React, { useState } from "react";
import { Card, TextArea, Button } from "semantic-ui-react";

const TaskItem = (prop) => {
  const [editCard, setEditCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

  const onClickCard = () => {
    setEditCard(true);
  };

  const onBlurCard = () => {
    setEditCard(false);
  };

  return (
    <div
      style={{ padding: "6px" }}
      onBlur={onBlurCard}
      onMouseLeave={() => setDeleteCard(false)}
      onMouseEnter={() => setDeleteCard(true)}
    >
      {editCard ? (
        <TextArea
          autoFocus
          onChange={(e) => {
            prop.onChangeUpdate(e, prop.currentkey);
          }}
          value={prop.description}
        />
      ) : (
        <Card>
          <Card.Content onClick={onClickCard}>
            <Card.Description>{prop.description}</Card.Description>
          </Card.Content>

          <Card.Content extra>
            {deleteCard && (
              <div className="ui two buttons">
                <Button
                  basic
                  color="red"
                  active={false}
                  onClick={(e) => prop.deleteItem(prop.currentkey)}
                >
                  Delete
                </Button>
              </div>
            )}
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default TaskItem;
