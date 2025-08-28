export type PortfolioPost = {
  title: string;
  content: string;
};

export type PortfolioGet = {
    id: number;
    symbol: string;
    companyName: string;
    purchase: string;
    lastDiv: string;
    industry: string;
    marketCap: string;
    comments: any;
};