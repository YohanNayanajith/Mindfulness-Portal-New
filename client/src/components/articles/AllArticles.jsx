import { useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Announcement from "../Announcement";
// import Products from "../components/Products";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import { mobile } from "../../responsive";
import ArticlesComponent from "./ArticlesComponent";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const AllItems = styled.div`
  display: flex;
  flex-direction: column;
`;
const Option = styled.option``;

const AllArticles = () => {
  //   const cat = window.location.pathname.split("/")[2];
  const cat = "all";
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>All Articles</Title>
      <FilterContainer>
        {/* <Filter>
          <FilterText>Filter Articles:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter> */}
        <Filter>
          <FilterText>Sort Articles:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
          <Option value="all">All</Option>
            <Option value="newest">Newest</Option>
            {/* <Option value="asc">Price (asc)</Option> */}
            {/* <Option value="desc">Price (desc)</Option> */}
          </Select>
        </Filter>
      </FilterContainer>
      <ArticlesComponent
        cat={cat}
        filters={filters}
        sort={sort}
        number={1000}
      />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default AllArticles;
