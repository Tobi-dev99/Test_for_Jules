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

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const clearAllHabits = () => {
    setHabits([]);
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
            <li key={habit.id} className="flex items-center justify-between gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 group">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit.id)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400 cursor-pointer"
                />
                <span className={`text-lg truncate ${habit.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {habit.text}
                </span>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                aria-label="Delete habit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))}

          {habits.length === 0 && (
            <p className="text-center text-gray-500 italic mt-4">No habits yet. Add one above!</p>
          )}
        </ul>

        {habits.length > 0 && (
          <div className="mt-6 border-t border-gray-100 pt-4 flex justify-end">
            <button
              onClick={clearAllHabits}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1 rounded hover:bg-red-50"
            >
              Clear All Habits
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
