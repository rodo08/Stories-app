import { useState } from "react";
import useUser from "../hooks/useUser";

interface CommentStoryProp {
  commentStory: ({
    nameText,
    contentText,
  }: {
    nameText: string;
    contentText: string;
  }) => void;
}

const StoryCommentsForm = ({ commentStory }: CommentStoryProp) => {
  const [contentText, setContentText] = useState("");
  const { user, isLoading } = useUser();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!contentText || !user) return;

        commentStory({
          nameText: user.displayName || user.email || "Anonymous",
          contentText,
        });

        setContentText("");
      }}
      className="flex flex-col gap-8 self-center w-full text-[#000000] lg:max-w-3xl my-8"
    >
      <h3 className="text-2xl font-bold mb-4">Add a comment</h3>

      <label
        htmlFor="comment"
        className="flex flex-col text-xl gap-2 focus-within:text-[#fca311] focus-within:font-bold"
      >
        Comment
        <input
          className="border-b border-gray-600 focus:border-[#fca311] outline-none py-2 text-2xl text-[#000000]"
          type="text"
          id="comment"
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          required
          placeholder="Add a comment"
        />
      </label>

      <button
        type="submit"
        className="text-[#000000] font-bold bg-[#fca311] px-4 py-3 rounded text-xl"
      >
        Add comment
      </button>
    </form>
  );
};

export default StoryCommentsForm;
