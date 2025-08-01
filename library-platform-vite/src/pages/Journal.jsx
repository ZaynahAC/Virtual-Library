import { useState } from "react";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    if (editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex] = newEntry;
      setEntries(updated);
      setEditingIndex(null);
    } else {
      setEntries([{ text: newEntry, date: new Date() }, ...entries]);
    }
    setNewEntry("");
  };

  const handleEdit = (index) => {
    setNewEntry(entries[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📓 Book Journal</h1>

      <textarea
        className="w-full h-32 p-3 border rounded-lg mb-3"
        placeholder="Write your thoughts about a book..."
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
        onClick={handleAddEntry}
      >
        {editingIndex !== null ? "Update Entry" : "Add Entry"}
      </button>

      <div className="space-y-4">
        {entries.length === 0 && (
          <p className="text-gray-500">No journal entries yet.</p>
        )}
        {entries.map((entry, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 border relative"
          >
            <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
            <p className="text-sm text-gray-400 mt-2">
              {entry.date instanceof Date
                ? entry.date.toLocaleString()
                : new Date(entry.date).toLocaleString()}
            </p>
            <div className="absolute top-3 right-3 space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;
