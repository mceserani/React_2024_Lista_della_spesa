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

function ItemList() 
{
  const [items, setItems] = useState([
    { name: 'Banana', completed: false },
    { name: 'Farina', completed: true },
    { name: 'Mela', completed: false },
    { name: 'Wurstel', completed: false },
  ]);

  const [filter, setFilter] = useState('Tutti');
  const [newItem, setNewItem] = useState('');

  const handleToggle = (name) => {
    setItems(items.map(item =>
      item.name === name ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleDelete = (name) => {
    setItems(items.filter(item => item.name !== name));
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      setItems([...items, { name: newItem, completed: false }]);
      setNewItem('');
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'Tutti') return true;
    return filter === 'Completati' ? item.completed : !item.completed;
  });

  return (
    <div className="item-list">      
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Tutti">Tutti</option>
          <option value="Completati">Completati</option>
          <option value="Non completati">Non completati</option>
        </select>
      </div>
      <div className="items">
        {filteredItems.map(item => (
          <Item
            key={item.name}
            name={item.name}
            completed={item.completed}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

function Item({ name, completed, onToggle, onDelete }) 
{
  return (
    <div className="item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(name)}
      />
      <span>{name}</span>
      <button onClick={() => onDelete(name)}>X</button>
    </div>
  );
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
