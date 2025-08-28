import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import CardList from "../../Components/CardList/CardList";
import Hero from "../../Components/Hero/Hero";
import ListPortfolio from "../../Components/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioGDeletePI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = ({}: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        toast.warning("Could not get portfolio values!");
      });
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res?.status == 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not create portfolio item!");
      });
    /* const exists = portfolioValues.find((value) => value === e.target[0].value);
     if(exists) return;
     const updatedPortfolio = [...portfolioValues, e.target[0].value];
     setPortfolioValues(updatedPortfolio) */
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioGDeletePI(e.target[0].value)
      .then((res) => {
        if (res?.status == 200) {
          toast.success("Stock deleted from portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not delete portfolio item!");
      });
    /* const removed = portfolioValues.filter((value) => {
       return value !== e.target[0].value;
     })
     setPortfolioValues(removed); */
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

  return (
    <div className="App">
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <div>Unable to connect to API</div>}
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
};

export default SearchPage;
