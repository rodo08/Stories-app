interface Comment {
  writtenBy: string;
  content: string;
  date: string;
}

const StoryComments = ({ comments }: { comments: Comment[] }) => {
  return (
    <section className="self-center w-full text-[#000000] lg:max-w-3xl space-y-6">
      <h3>Comments</h3>
      {comments.map((comment) => {
        const date = new Date(comment.date);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}`;

        return (
          <div
            key={comment.date}
            className="space-y-2 border-l-2 border-[#fca311] pl-4 py-2"
          >
            <h4 className="text-[#fca311] font-bold">{comment.writtenBy}</h4>
            <p className="text-[#000000]">{comment.content}</p>
            <span className="text-[#778da9] text-[10px]">{formattedDate}</span>
          </div>
        );
      })}
    </section>
  );
};

export default StoryComments;
