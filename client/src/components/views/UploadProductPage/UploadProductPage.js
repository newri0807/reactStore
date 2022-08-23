import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../Utils/FileUpload";
import Axios from "axios";
import QueryString from "qs";

const { Title } = Typography;
const { TextArea } = Input;
const qs = require("qs");
const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !Images
    ) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
    };

    //서버에 채운 값들을 request를 보낸다.

    //console.log("FORM VALUE CHECK", variables);

    // 원본
    // Axios.post("/api/product", variables).then((response) => {
    //   if (response.data.success) {
    //     alert("상품 업로드에 성공 했습니다.");
    //     props.history.push("/"); //<- RETURN SET
    //   } else {
    //     alert("상품 업로드에 실패 했습니다.");
    //   }
    // });

    // TRY1
    Axios({
      method: "post",
      url: " http://localhost:5000/api/product",
      data: variables,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        console.log(response, response.data.success);
        alert("상품 업로드에 성공 했습니다.");
        props.history.push("/");
      })
      .catch(function (response) {
        //handle error
        console.log(response, response.data.success, "실패여");
        alert("상품 업로드에 실패 했습니다.");
      });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Travel Product</Title>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
