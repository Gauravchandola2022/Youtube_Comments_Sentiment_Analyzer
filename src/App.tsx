import React, { useState } from 'react';
import { VideoInput } from './components/VideoInput';
import { SentimentChart } from './components/SentimentChart';
import { CommentList } from './components/CommentList';
import { Comment, SentimentSummary } from './types';
import { extractVideoId, fetchComments } from './utils/youtube';
import { analyzeSentiment, calculateSentimentSummary, getCommonWords } from './utils/sentiment';
import { YoutubeIcon } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [summary, setSummary] = useState<SentimentSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const rawComments = await fetchComments(videoId);
      const analyzedComments = rawComments.map(comment => ({
        ...comment,
        sentiment: analyzeSentiment(comment.text)
      }));

      setComments(analyzedComments);
      setSummary(calculateSentimentSummary(analyzedComments));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <YoutubeIcon size={40} className="text-red-600" />
            <h1 className="text-3xl font-bold">YouTube Comment Sentiment Analyzer</h1>
          </div>
          <p className="text-gray-600">
            Analyze the sentiment of YouTube video comments to understand viewer reactions
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <VideoInput onAnalyze={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="w-full max-w-3xl p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {summary && (
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Sentiment Analysis Results</h2>
              <SentimentChart data={summary} />
            </div>
          )}

          {comments.length > 0 && (
            <div className="w-full max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <CommentList comments={comments} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;