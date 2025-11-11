import axios from "axios";
import api from "../data/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewStory = () => {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/stories/new-story", {
        name: storyTitle,
        content: storyContent,
      });

      const newStory = response.data;

      setMessage("Story created successfully!");
      setStoryTitle("");
      setStoryContent("");

      navigate(`/stories/${newStory.name}`);
    } catch (e) {
      let errorMessage = "Error creating story. Try again.";

      if (axios.isAxiosError(e)) {
        errorMessage = e.response?.data?.message || errorMessage;
      }

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-8 self-center w-full text-[#000000] lg:max-w-3xl my-8"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="story-title"
        className="flex flex-col text-xl gap-2 focus-within:text-[#fca311] focus-within:font-bold"
      >
        {" "}
        Story Title
        <input
          className="border-b border-gray-600 focus:border-[#fca311] outline-none py-2 text-2xl text-[#000000]"
          type="text"
          id="story-title"
          maxLength={50}
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          required
          placeholder="Write your story's title"
        />
      </label>
      <label
        htmlFor="story-content"
        className="flex flex-col text-xl gap-2 focus-within:text-[#fca311] focus-within:font-bold"
      >
        {" "}
        Story Content
        <textarea
          name="story-content"
          className="border border-gray-600 focus:border-[#fca311] outline-none p-2 text-2xl text-[#000000] "
          value={storyContent}
          onChange={(e) => setStoryContent(e.target.value)}
          required
          maxLength={2000}
          rows={10}
          placeholder="Write your story here..."
        />
      </label>

      <button
        className="text-[#000000] font-bold bg-[#fca311] px-4 py-3 rounded text-xl"
        type="submit"
      >
        {loading ? "Posting..." : "Post Story"}
      </button>
      {message && <p className="text-center text-[#ff6500]">{message}</p>}
    </form>
  );
};

export default NewStory;
