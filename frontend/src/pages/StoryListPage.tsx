import { useEffect, useState } from "react";
import axios from "axios";
import StoriesList from "../components/StoriesList";

export interface Story {
  name: string;
  title: string;
  content: string; // un solo párrafo
  likes: number;
  comments: {
    writtenBy: string;
    content: string;
    date: string;
  }[];
}

const StoryListPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/api/stories"); // necesitamos crear este endpoint
        setStories(response.data);
      } catch (e) {
        console.error("Error fetching stories:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return <StoriesList stories={stories} />;
};

export default StoryListPage;
