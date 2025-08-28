import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${process.env.REACT_APP_API_BASE_URL}/api/account/login`,
      {
        username: username,
        password: password,
      }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${process.env.REACT_APP_API_BASE_URL}/api/account/register`,
      {
        email: email,
        username: username,
        password: password,
      }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};
