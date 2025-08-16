import React, { JSX } from "react";
import "./Card.css";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({
  companyName,
  ticker,
  price,
}: Props): JSX.Element => {
  return (
    <div className="card">
      <img
        src="https://media.istockphoto.com/id/1463455851/photo/cryptocurrency-market-financial-data-and-candlesticks-internet-banking.jpg?s=612x612&w=0&k=20&c=wt4VtTDywhqk3QpUIkV6qw_8pODWFSmE9VAMrg_Pm_M="
        alt="Image"
      />
      <div className="details">
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
      </div>
      <p className="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default Card;
