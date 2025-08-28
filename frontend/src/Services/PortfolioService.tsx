import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<PortfolioPost>(
      `${process.env.REACT_APP_API_BASE_URL}/api/portfolio?symbol=${symbol}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGDeletePI = async (symbol: string) => {
  try {
    const data = await axios.delete<PortfolioPost>(
      `${process.env.REACT_APP_API_BASE_URL}/api/portfolio?symbol=${symbol}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const data = await axios.get<PortfolioGet[]>(
      `${process.env.REACT_APP_API_BASE_URL}/api/portfolio`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
