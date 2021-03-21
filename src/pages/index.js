import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";
export const API = "https://restcountries.eu/rest/v2/all";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountres = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const handleChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          There are {countries.length} countries.
        </div>

        <div className={styles.input}>
        <SearchInput
          placeholder="Filter by name, region or subregion.."
          onChange={handleChange}
        />
        </div>
      </div>
        
        <CountriesTable countries={filteredCountres}></CountriesTable>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(API);
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
