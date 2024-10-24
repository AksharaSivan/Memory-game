import { useEffect, useState } from 'react';
import './cardgame.css';

const cardData = [
    { id: 1, value: '🐶' },
    { id: 2, value: '🐱' },
    { id: 3, value: '🐭' },
    { id: 4, value: '🐹' },
    { id: 5, value: '🐰' },
    { id: 6, value: '🦊' },
    { id: 7, value: '🐻' },
    { id: 8, value: '🐼' },
    { id: 9, value: '🐶' },
    { id: 10, value: '🐱' },
    { id: 11, value: '🐭' },
    { id: 12, value: '🐹' },
    { id: 13, value: '🐰' },
    { id: 14, value: '🦊' },
    { id: 15, value: '🐻' },
    { id: 16, value: '🐼' }
  ];

const Card = ({ value, isFlipped, onClick }) => {
    
       return(
        
        <div className={`card ${isFlipped? 'flipped' : ''}`} onClick={onClick}>
        <div className='cards'>
        <div className='card_back'>

        </div>
        <div className='card_front'>
          {value}
        </div>
        </div>
        </div>
       )      

  };

const MemoryGame = () => {
       const[cards, setCards] = useState([]);
       const[first,setFirst]=useState(null);
       const [moves, setMoves] = useState(0);
       const [matches, setMatches] = useState(0);
       const[disabled,setDisabled]=useState(false)
       const array=cardData.map(({id,value})=>({id,value,isFlipped:false}))


       useEffect(()=>{
        setCards(array)
       },[])

       const handleClick =(ind)=>{
        if(disabled || cards[ind].isFlipped){
            return;
        }
        const newcardslist=[...cards]
        newcardslist[ind].isFlipped=true;
        setCards(newcardslist);
        setMoves((preMoves)=>preMoves+1)

        if(first===null){
            setFirst(ind);
        }else{
            setDisabled(true)
        

        if(newcardslist[first].value !== newcardslist[ind].value){

             setTimeout(()=>{
                newcardslist[first].isFlipped=false;
                newcardslist[ind].isFlipped=false
                setCards(newcardslist)
                setFirst(null)
                setDisabled(false)

             },1000)
        }
       else{
        setMatches((preMatches)=>preMatches+1);
        setFirst(null)
        setDisabled(false)
       }
       }
       }


      return(
        <div className="main_cards">
         {cards.map((card,ind)=>(
            <Card key={ind}
            value={card.value}
             isFlipped={card.isFlipped}
            onClick={()=>handleClick(ind)}
            />
          
         ))}  
    <div className='marks'>
            Matches:{matches}  <br/>  Moves:{moves}
        </div>
         
        </div>
      )
  };

export default MemoryGame;  