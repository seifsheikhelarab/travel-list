import { useState } from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }
    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item,
            ),
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItems={handleToggleItem}
            />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 🎒</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {
            description,
            amount,
            packed: false,
            id: Date.now(),
        };

        onAddItems(newItem);

        setDescription("");
        setAmount(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                name=""
                id=""
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Item...."
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem, onToggleItems }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onToggleItems={onToggleItems}
                    />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem, onToggleItems }) {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.amount} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>You have X items on your list, and you already packed X</em>
        </footer>
    );
}
