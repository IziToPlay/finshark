import { toast } from "react-toastify";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { useAuth } from "../../Context/useAuth";
import { CommentGet } from "../../Models/Comment";
import { useEffect, useState } from "react";
import StockCommentList from "../StockCommentList/StockCommentList";
import Spinner from "../Spinner/Spinner";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs, reset: () => void) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Comment created successfully!");
          getComments();
          reset();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const getComments = () => {
    setLoading(true);
    commentGetAPI(stockSymbol).then((res) => {
      setLoading(false);
      setComments(res?.data!);
    });
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
