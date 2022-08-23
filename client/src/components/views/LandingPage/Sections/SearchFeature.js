import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState("");

  const searchHandler = (event) => {
    setSearchTerms(event.currentTarget.value);

    //부모 컴포넌트에 업데이트 하기
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        value={SearchTerms}
        onChange={searchHandler}
        placeholder="Search By Typing..."
      />
    </div>
  );
}

export default SearchFeature;
