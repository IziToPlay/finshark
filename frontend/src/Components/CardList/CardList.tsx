import { JSX } from "react";
import Card from "../Card/Card";

interface Props {}

const CardList : React.FC<Props> = ({}: Props) : JSX.Element => {
    return <div>
        <Card companyName="Apple" ticker="AAPL" price={100}></Card>
        <Card companyName="Microsoft" ticker="MSFT" price={200}></Card>
        <Card companyName="Tesla" ticker="TSLA" price={300}></Card>
    </div>
};

export default CardList;
