import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(
      `${process.env.REACT_APP_API_BASE_URL}/api/comment/${symbol}`,
      {
        title: title,
        content: content,
      }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (
  symbol: string
) => {
  try {
    const data = await axios.get<CommentGet[]>(
      `${process.env.REACT_APP_API_BASE_URL}/api/comment?Symbol=${symbol}`
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};
