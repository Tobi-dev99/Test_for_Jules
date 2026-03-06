import { useState, useEffect } from 'react'

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daily Habit Tracker</h1>

        <form onSubmit={addHabit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Habit
          </button>
        </form>

        <ul className="space-y-3">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400 cursor-pointer"
              />
              <span className={`text-lg ${habit.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {habit.text}
              </span>
            </li>
          ))}

          {habits.length === 0 && (
            <p className="text-center text-gray-500 italic mt-4">No habits yet. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
