export interface Comment {
  id: string;
  text: string;
  sentiment: {
    score: number;
    comparative: number;
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  };
}

export interface VideoData {
  videoId: string;
  comments: Comment[];
}

export interface SentimentSummary {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}