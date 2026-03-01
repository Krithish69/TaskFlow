import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

const TaskComments = ({ taskId, initialComments }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState(initialComments || []);
  const [text, setText] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // Calls the POST /api/tasks/:id/comments endpoint
      const { data } = await API.post(`/tasks/${taskId}/comments`, { text });
      setComments(data.data); // Updates the UI with the new comments array
      setText('');
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-sm font-semibold mb-2">Comments</h4>
      
      <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
        {comments.map((comment, index) => (
          <div key={index} className="text-xs bg-gray-50 p-2 rounded">
            <span className="font-bold text-blue-600">
              {comment.user?.name || user?.name}: 
            </span>
            <span className="ml-1 text-gray-700">{comment.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          type="text"
          className="flex-1 text-xs border rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default TaskComments;