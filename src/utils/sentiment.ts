import Sentiment from 'sentiment';
import { Comment, SentimentSummary } from '../types';

const sentiment = new Sentiment();

export const analyzeSentiment = (text: string) => {
  return sentiment.analyze(text);
};

export const calculateSentimentSummary = (comments: Comment[]): SentimentSummary => {
  let positive = 0;
  let negative = 0;
  let neutral = 0;

  comments.forEach(comment => {
    if (comment.sentiment.score > 0) positive++;
    else if (comment.sentiment.score < 0) negative++;
    else neutral++;
  });

  return {
    positive,
    negative,
    neutral,
    total: comments.length
  };
};

export const getCommonWords = (comments: Comment[], type: 'positive' | 'negative'): string[] => {
  const wordCount: { [key: string]: number } = {};
  
  comments.forEach(comment => {
    const words = type === 'positive' ? comment.sentiment.positive : comment.sentiment.negative;
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
};