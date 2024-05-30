import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <Header />
       
      <InputItem />
      <ItemList />
    </>
  )
  
}

function Header() {
  return (
    <header>
      <h1>My Shopping List</h1>
    </header>
  );
}

function ItemList() {
  
}

function Item() {

}

function InputItem() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    // Logic to add the item using the inputValue
    // For example, you can store the items in an array or send them to an API
    console.log('Adding item:', inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default App
