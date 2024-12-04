import React, { useState } from 'react';
import { Comment } from '../types';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComments = comments.filter(comment => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'positive' && comment.sentiment.score > 0) ||
      (filter === 'negative' && comment.sentiment.score < 0) ||
      (filter === 'neutral' && comment.sentiment.score === 0);

    const matchesSearch = comment.text.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="flex gap-4 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Comments</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
        <input
          type="text"
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-4">
        {filteredComments.map(comment => (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow">
            <p className="mb-2">{comment.text}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {comment.sentiment.score > 0 ? (
                <ThumbsUp className="text-green-500" size={16} />
              ) : comment.sentiment.score < 0 ? (
                <ThumbsDown className="text-red-500" size={16} />
              ) : (
                <Minus className="text-gray-500" size={16} />
              )}
              <span>Sentiment score: {comment.sentiment.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};