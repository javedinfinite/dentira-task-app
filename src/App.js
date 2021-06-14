import React, { useEffect } from "react";
import firebase from "firebase";
import { connect } from "react-firebase";
import { Form, TextArea, Card, Button, Icon } from 'semantic-ui-react'
import MyCard from './components/MyCard'

firebase.initializeApp({
  databaseURL:
    "https://dentira-ba865-default-rtdb.europe-west1.firebasedatabase.app"
});

const Task = ({ taskList, changeList, addToList, deleteItem }) => {

  const [newValue,setNewvalue] = React.useState('');
  const [edit,setEdit] = React.useState(false);
  const list = {...taskList};

  const onChangeUpdate = (e,index) => {

    changeList(e.target.value,index);

  }

  return (
  <div style={{padding:'1%'}}>
    <Card.Group>
    {
      
      Object.keys(list).map((key)=> <MyCard deleteItem={deleteItem} currentkey={key} key={key} onChangeUpdate={onChangeUpdate} header='my header' meta='my meta' description={list[key]}></MyCard> )
    
    }
    <div style={{marginTop:'5%', right:'5%'}} onClick={() => setEdit(true)}  onBlur={()=>setEdit(false)}   >
    
    {!edit ? <Button color='blue'> Add <Icon name='plus right' /></Button> :  <TextArea type="text" key={"new"} autoFocus  value={newValue} placeholder={"Add an item"} onBlur={(e)=>{
      
      if(newValue){
        addToList(newValue);
        setNewvalue('');
      }
      
    }}

    onChange={(e) => setNewvalue(e.target.value)}    />  } 

    </div>
    </Card.Group>





   
  </div>);
};

export default connect((props, ref) => ({
  taskList: "task",
  addToList: (data) => ref(`task`).push(data),
  changeList: (data,index) => ref(`task/${index}`).set(data),
  deleteItem: (index) => ref(`task`).child(index).remove()

}))(Task);
