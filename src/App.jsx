import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      return JSON.parse(savedHabits);
    } else {
      return [];
    }
  });
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), text: newHabit, completed: false }]);
    setNewHabit('');
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div>
      <h1>Daily Habit Tracker</h1>
      <form onSubmit={addHabit}>
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit"
        />
        <button type="submit">Add Habit</button>
      </form>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit.id)}
            />
            <span style={{ textDecoration: habit.completed ? 'line-through' : 'none', marginLeft: '8px' }}>
              {habit.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
