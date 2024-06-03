import { useState } from 'react'
import './App.css'

function App() {

  const initial_item = [{
    nome: "Benvenuto",
    comprato: false
  }];

  const [inputItemName, setInputItemName] = useState("");

  // all, toBuy, alreadyBought
  const [productFilter, setProductFilter] = useState("all");

  const [prodotti, setProdotti] = useState(initial_item);

  return (
    <>
      <Header />
      <InputItem
        inputItemName={inputItemName}
        setInputItemName={setInputItemName}
        prodotti={prodotti}
        setProdotti={setProdotti}
      />
      <ItemList
        prodotti={prodotti}
        setProdotti={setProdotti}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
      />
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

function InputItem({ inputItemName, setInputItemName, prodotti, setProdotti }) {

  const handleInputChange = (event) => {
    setInputItemName(event.target.value);
  };

  const handleAddItem = () => {
    // impedisci l'aggiunta di item con lo stesso nome o vuoti
    if (prodotti.map(({ nome }) => nome).includes(inputItemName) || inputItemName === "") {
      return;
    }
    setProdotti([...prodotti, { "nome": inputItemName, "comprato": false }]);
  }

  return (
    <div>
      <input type="text" value={inputItemName} onChange={handleInputChange} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

function ItemList({ prodotti, setProdotti, productFilter, setProductFilter }) {

  const handleToggle = (name) => {
    let products = [...prodotti];
    products.forEach(item => {
      if (item.nome === name) {
        item.comprato = !item.comprato;
      }
    });

    setProdotti(products);
  };

  const handleDelete = (name) => {
    setProdotti([...prodotti.filter(item => item.nome !== name)]);
  };

  const filteredItems = prodotti.filter(item => {
    if (productFilter === 'all') return true;
    else if (productFilter === "toBuy") return !item.comprato;
    else if (productFilter === "alreadyBought") return item.comprato;
  });

  return (
    <div className="item-list">
      <div className="filter">
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
          <option value="all">Tutti</option>
          <option value="toBuy">Da comprare</option>
          <option value="alreadyBought">Già comprati</option>
        </select>
      </div>
      <div className="items">
        {filteredItems.map(item => (
          <Item
            name={item.nome}
            completed={item.comprato}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

function Item({ name, completed, onToggle, onDelete }) {
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

export default App