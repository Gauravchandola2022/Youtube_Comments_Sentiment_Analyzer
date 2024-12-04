import axios from 'axios';

const API_KEY = 'AIzaSyC9sGnIQB2WQ20-0Q2hhRNMRm7mjevOqn0'; // Note: User needs to provide their YouTube API key

export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

export const fetchComments = async (videoId: string) => {
  if (!API_KEY) {
    throw new Error('YouTube API key is required');
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads`,
      {
        params: {
          part: 'snippet',
          videoId: videoId,
          key: API_KEY,
          maxResults: 100,
        },
      }
    );

    return response.data.items.map((item: any) => ({
      id: item.id,
      text: item.snippet.topLevelComment.snippet.textDisplay,
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};