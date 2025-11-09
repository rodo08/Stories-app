import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import type { Story } from "../pages/StoryListPage";

interface StoriesListProps {
  stories: Story[];
}

const StoriesList = ({ stories }: StoriesListProps) => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <div className="w-full flex justify-center px-4">
          <Link
            to="/new-story"
            className="w-full md:w-[230px] relative z-0 flex items-center justify-center p-[2px] rounded bg-black/10 overflow-hidden hover:scale-105 active:scale-100 transition-transform duration-300"
          >
            <span className="absolute -z-10 -left-1/2 -top-1/2 w-[200%] h-[200%] bg-[linear-gradient(90deg,_#14213d,_#fe7f2d,_#fca311,_#ffffff,_#14213d,_#fca311,_#14213d)] bg-[length:50%_30%] bg-no-repeat bg-[100%_50%] blur-md animate-[rotate_4s_ease-in-out_infinite]"></span>
            <button className="w-full px-8 py-3 text-white rounded font-semibold text-lg bg-[#14213d] backdrop-blur">
              Create a new Story
            </button>
          </Link>
        </div>
      ) : null}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-4">
        {stories.map((story) => (
          <div
            key={story.name}
            className="bg-[#ffffff] text-[#14213d] px-4 py-6 flex flex-col justify-between gap-4 shadow-xs rounded"
          >
            <h3 className="font-bold text-xl">{story.title}</h3>
            <p className="overflow-hidden">
              {story.content.substring(0, 100) + "..."}
            </p>
            <Link
              className="text-m px-3 py-1.5 bg-[#0b192c] text-[#ffffff] font-semibold rounded self-start hover:scale-105 active:scale-100 transition-transform duration-300"
              to={`/stories/${story.name}`}
            >
              Read more...
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default StoriesList;
