import { ChangeEvent, SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import CardList from "../../Components/CardList/CardList";
import Hero from "../../Components/Hero/Hero";
import ListPortfolio from "../../Components/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";

interface Props {
  
}

const SearchPage = ({}: Props) => {
 const [search, setSearch] = useState<string>("");
   const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
   const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
   const [serverError, setServerError] = useState<string | null>(null);
 
   const onPortfolioCreate = (e: any) => {
     e.preventDefault();
     const exists = portfolioValues.find((value) => value === e.target[0].value);
     if(exists) return;
     const updatedPortfolio = [...portfolioValues, e.target[0].value];
     setPortfolioValues(updatedPortfolio)
   };
 
   const onPortfolioDelete = (e: any) => {
     e.preventDefault();
     const removed = portfolioValues.filter((value) => {
       return value !== e.target[0].value;
     })
     setPortfolioValues(removed);
   };
 
   const onSearchSubmit = async (e: SyntheticEvent) => {
     e.preventDefault();
 
     const result = await searchCompanies(search);
     if (typeof result === "string") {
       setServerError(result);
     } else if (Array.isArray(result.data)) {
       setSearchResult(result.data);
     }
     console.log(result);
   };
 
   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
     setSearch(e.target.value);
     console.log(e);
   };
 
   return (
     <div className="App">
       <Search
         onSearchSubmit={onSearchSubmit}
         search={search}
         handleSearchChange={handleSearchChange}
       />
       <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete}/>
       {serverError && <div>Unable to connect to API</div>}
       <CardList
         searchResults={searchResult}
         onPortfolioCreate={onPortfolioCreate}
       />
     </div>
   );
  
}

export default SearchPage;