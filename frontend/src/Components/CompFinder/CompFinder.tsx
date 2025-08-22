import { useEffect, useState } from "react";
import { CompanyCompData } from "../../company";
import { getCompData } from "../../api";
import { get } from "http";
import Spinner from "../Spinner/Spinner";
import CompFinderItem from "./CompFinderItem/CompFinderItem";

type Props = {
  ticker:string;
}

const CompFinder = ({ticker}: Props) => {
  const [companyData, setCompanyData] = useState<CompanyCompData[]>();
  useEffect(() => {
    const getComps = async () => {
        const value = await getCompData(ticker)
        setCompanyData(value?.data)
    }
    getComps();
}, [ticker]);

 return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData?.map((ticker) => {
          return <CompFinderItem ticker={ticker.symbol} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompFinder;