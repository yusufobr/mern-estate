import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.user);

  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comment/get?listingId=${id}&limit=5`);
      setComments(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    if (currentUser) {
      e.preventDefault();
      const res = await axios.post("/api/comment/add", {
        user: currentUser.id,
        listing: id,
        comment,
      });
      if (res.status === 201) {
        setComment("");
        fetchComments();
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="capitalize text-lg font-semibold text-center">
        comments :
      </div>
      {comments.length === 0 && (
        <div className="text-center">No comments yet</div>
      )}
      {comments.map((comment, index) => (
        <>
          <div key={comment._id} className="">
            <div className="w-10 h-10 rounded-full float-left mr-2">
              <img
                src={
                  comment.userDetails?.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt={comment.userDetails.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 font-extrabold -mb-1">
                {comment.userDetails.username}
              </p>
              <p className="text-sm">{comment.comment}</p>
            </div>
          </div>
          {index !== comments.length - 1 && (
            <div className="w-80 h-[1px] bg-gray-200"></div>
          )}
        </>
      ))}
      <div className="flex flex-col gap-2 py-3">
        <div className="text-sm font-semibold text-center text-gray-800">
          Add a comment :
        </div>
        <form onSubmit={addComment} className="flex flex-col gap-2">
          <textarea
            value={comment}
            placeholder="Add a comment"
            cols={30}
            rows={2}
            className="border rounded p-2"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-gray-600 text-white font-semibold py-2 rounded"
          >
            comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
