import {
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import StoryComments from "../components/StoryComments";
import StoryCommentsForm from "../components/StoryCommentsForm";
import useUser from "../hooks/useUser";

interface Story {
  name: string;
  title?: string;
  content: string;
  likes: number;
  comments: {
    writtenBy: string;
    content: string;
    date: string;
  }[];
  likeIds?: string[];
}

export const StoryPage = () => {
  const { name } = useParams();
  const story = useLoaderData() as Story;
  const { likes: initialLikes, comments: initialComments } = story;

  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [hasLiked, setHasLiked] = useState(false);
  const { user } = useUser();

  // 👇 Determinar si el usuario ya le dio like
  useEffect(() => {
    if (user && story.likeIds?.includes(user.uid)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [user, story.likeIds]);

  const likeStory = async () => {
    if (!user) return;

    const token = await user.getIdToken();
    const headers = { authtoken: token };

    const response = await axios.post(`/api/stories/${name}/like`, null, {
      headers,
    });

    const updatedStoryData = response.data.value ?? response.data;

    setLikes(updatedStoryData.likes);
    setHasLiked(updatedStoryData.likeIds.includes(user.uid));
  };

  const commentStory = async ({
    nameText,
    contentText,
  }: {
    nameText: string;
    contentText: string;
  }) => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.post(
      `/api/stories/${name}/comments`,
      {
        writtenBy: nameText,
        content: contentText,
      },
      { headers }
    );

    const updatedStoryData = response.data.value ?? response.data;

    setComments(updatedStoryData.comments);
  };

  return (
    <>
      <h1 className="text-center text-[#000000] text-3xl font-bold">
        {story.name}
      </h1>

      <section className="flex flex-col gap-3 lg:max-w-3xl lg:mx-auto text-[#000000] h-fit overflow-auto">
        <p className="text-xl break-words whitespace-pre-wrap">
          {story.content}
        </p>
      </section>

      <section className="space-y-6 self-center w-full h-fit text-white lg:max-w-3xl flex items-center gap-4">
        {user && (
          <button
            className={`w-[140px] m-0 text-[#14213d] px-4 py-2 rounded font-bold bg-red ${
              !hasLiked ? "bg-[#fca311]" : " text-[#fca311] bg-[#14213d]"
            }`}
            onClick={likeStory}
          >
            {hasLiked ? "Unlike Story" : "Like Story"}
          </button>
        )}

        <p className="font-bold text-left text-[#14213d]">
          {likes} {likes === 1 ? "like" : "likes"}
        </p>
      </section>

      {user ? (
        <StoryCommentsForm commentStory={commentStory} />
      ) : (
        <p className="text-xl text-[#000000] text-center font-bold">
          You need to be logged in to like/comment
        </p>
      )}

      {comments.length > 0 ? (
        <StoryComments comments={comments} />
      ) : (
        <p className="text-xl text-[#000000] text-center font-bold">
          No comments yet
        </p>
      )}
    </>
  );
};

export const storyLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await axios.get(`/api/stories/${params.name}`);
  return response.data;
};
