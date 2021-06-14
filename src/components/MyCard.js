import React, {useState} from 'react'
import { Card, TextArea, Button } from 'semantic-ui-react'

const MyTextArea = (prop) => {
  const [editCard,setEditCard] = useState(false);
  const [cardButton,setCardButton] = useState(false);

  const onClickCard = () =>{
    setEditCard(true)
  }

  const onBlurCard = () =>{
    setEditCard(false)
  }


  return (
    <div style={{padding:'6px'}} onBlur={onBlurCard} onMouseLeave={()=>setCardButton(false)} onMouseEnter={() => setCardButton(true)}>
{
  editCard? <TextArea   autoFocus onChange={(e)=>{prop.onChangeUpdate(e,prop.currentkey)}} value={prop.description}/> :   
  <Card >
  <Card.Content onClick={onClickCard}>
     
     
    <Card.Description>
    {prop.description} <strong>musicians</strong>
    </Card.Description>
  </Card.Content>

  <Card.Content extra>
{  cardButton &&   <div className='ui two buttons'>
      <Button basic color='red' active={false} onClick={(e)=>prop.deleteItem(prop.currentkey)}>
        Delete
      </Button>
    </div>}

  </Card.Content>
</Card>      
 
}


    </div>


)

}




export default MyTextArea
