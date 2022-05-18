import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../shared/Button.jsx";
import {
  postNft,
  getFileTypes,
  getCurrencies,
  getSalesType,
  getCategory,
} from "../../redux/actions";

import Input from "../shared/Input.jsx";

import Swal from "sweetalert2";


const ContainerCreateNft = styled.div`
  width: 60%;
  margin: 7.5rem auto 0 auto;
  color: var(--secondFontColor);
`;

const FormCreateNft = styled.form``;

const HeaderCreateNft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContainerGridLabelInput = styled.div`
  display: grid;
  margin-bottom: 1.32rem;
  margin-left: 6rem;
  gap: 0.2rem;
`;

const ContainerImageView = styled.div`
  width: 165px;
  height: 155px;
  border-radius: 0.3rem;
  margin-left: 20%;
  background: ${(props) => `url(${props.backgroundImage})`};
  border: 1px solid var(--mainBackGroundButtonColor);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ImageView = (props) => {
  const { backgroundImage } = props;

  return (
    <ContainerImageView backgroundImage={backgroundImage}></ContainerImageView>
  );
};

const TextArea = styled.textarea`
  width: 75%;
  height: 150px;
  border-radius: 0.35rem;
  border: none;
  padding: 0.2rem 0.4rem;
`;

const SelectType = styled.select`
  width: 75%;
  height: 40px;
  border: none;
  border-radius: 0.35rem;
  cursor: pointer;
`;

const ContainerCurrencies = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const SelectTypeCurrencies = styled.select`
  width: 100%;
  height: 40px;
  border: none;

  border-radius: 0.35rem;
  cursor: pointer;
`;

const ContainerFormCreateNft = styled.div`
  width: 100%;
  margin: 1.2rem auto 0 auto;
  border-radius: 0.2rem;
  background-color: #46198f53;
  padding: 2rem 0.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const CreateNft = () => {
  const token = localStorage.getItem("token");

  const category = useSelector((state) => state.category);
  const currency = useSelector((state) => state.currencies);
  const filesType = useSelector((state) => state.files_type);
  const salesType = useSelector((state) => state.sales_type);
  const user = useSelector((state) => state.user);

  const idUser = user.uid;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const contrato = location.state.obj1[0]
  const tokenId = location.state.obj1[1]

  const [send, setSend] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");

  const formDateishon = new FormData();

  const instantCallback = useCallback(dispatch, [dispatch]);

  formDateishon.append("img", selectedImage);

  useEffect(() => {
    instantCallback(getCategory());
    instantCallback(getFileTypes());
    instantCallback(getCurrencies());
    instantCallback(getSalesType());
  }, [instantCallback]);

  const [data, setData] = useState({
    name: "",
    description: "",
    contract_address: contrato,
    token_id: tokenId,
    // collection_nft: "",
    category: "",
    price: 0,
    sales_types: "",
    currencies: "",
    files_types: "",
  });

  const [enia, setEnia] = useState("");

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // ? Realizar el upload de la image del nft

  const handleSelect = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //! acordarse que una de las soluciones puede ser de al setear del otro lado le mandemos el await por lo que la funcion es async
  const handleSubmit = (e) => {
    e.preventDefault();
    if (send === false) {
      dispatch(postNft(token, data, formDateishon));
      setData({
        name: "",
        image: "",
        description: "",
        contract_address: "",
        collection_nft: "",
        category: "",
        price: 0,
        sales_types: "",
        currencies: "",
        files_types: "",
      });
      setSend(true);
      Swal.fire(
        "NFT Created Successfully",
        "You Clicked the button!",
        "success"
      );
      navigate("/home")
    } else {
      Swal.fire("Error, no se creo el nft", "error");
    }
  };

  return (
    <ContainerCreateNft>
      <HeaderCreateNft>
        <h1>Create NFT</h1>
        <Button
          title="CREATE COLLECTION"
          onClick={() => navigate("/home/creationcollection")}
        />
      </HeaderCreateNft>
      <hr style={{ borderColor: "var(--mainBackGroundButtonColor)" }} />
      <FormCreateNft onSubmit={(e) => handleSubmit(e)}>
        <ContainerFormCreateNft>
          <div>
            <ContainerGridLabelInput>
              <label style={{ fontSize: "1.2rem" }}>Name</label>
              <Input
                placeholder="escriba el name o title del nft"
                padding=".4rem"
                onChange={(e) => handleInput(e)}
                name="name"
                value={data.name}
                width="75%"
              />
            </ContainerGridLabelInput>
            <ContainerGridLabelInput>
              <label style={{ fontSize: "1.2rem" }}>Image</label>
              <Input
                padding=".4rem"
                width="75%"
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                style={{ color: "#000" }}
                name="image"
              />
            </ContainerGridLabelInput>
            {/* <ImageView backgroundImage={selectedImage.name} /> */}
            <ContainerGridLabelInput>
              <label style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                Description
              </label>
              <TextArea
                placeholder="Description..."
                name="description"
                value={data.description}
                onChange={(e) => handleInput(e)}
              />
            </ContainerGridLabelInput>
          </div>
          <div>
            <ContainerGridLabelInput>
              <label style={{ fontSize: "1.2rem" }}>Category</label>
              <SelectType name="category" onChange={(e) => handleSelect(e)}>
                <option>select option..</option>
                {category?.map((x) => (
                  <option value={x._id} key={x._id}>
                    {x.name}
                  </option>
                ))}
              </SelectType>
            </ContainerGridLabelInput>
            <ContainerGridLabelInput>
              <label style={{ fontSize: "1.2rem" }}>Sale Types</label>
              <SelectType name="sales_types" onChange={(e) => handleSelect(e)}>
                <option>select option..</option>
                {salesType?.map((x) => (
                  <option value={x._id} key={x._id}>
                    {x.name}
                  </option>
                ))}
              </SelectType>
            </ContainerGridLabelInput>
            <ContainerGridLabelInput>
              <label style={{ fontSize: "1.2rem" }}>File Types</label>
              <SelectType name="files_types" onChange={(e) => handleSelect(e)}>
                <option>select option..</option>
                {filesType?.map((x) => (
                  <option value={x._id} key={x._id}>
                    {x.name}
                  </option>
                ))}
              </SelectType>
            </ContainerGridLabelInput>
            <ContainerGridLabelInput>
              <ContainerCurrencies>
                <div style={{ display: "grid" }}>
                  <label style={{ fontSize: "1.2rem" }}>Currencies</label>
                  <SelectTypeCurrencies
                    name="currencies"
                    onChange={(e) => handleSelect(e)}
                  >
                    <option>select option..</option>
                    {currency?.map((x) => (
                      <option value={x._id} key={x._id}>
                        {x.name}
                      </option>
                    ))}
                  </SelectTypeCurrencies>
                </div>
                <div style={{ display: "grid" }}>
                  <label style={{ fontSize: "1.2rem" }}>Price</label>
                  <Input
                    placeholder="price"
                    padding=".4rem"
                    width="100%"
                    onChange={(e) => handleInput(e)}
                    name="price"
                    value={data.price}
                  />
                </div>
              </ContainerCurrencies>
            </ContainerGridLabelInput>
          </div>
        </ContainerFormCreateNft>
        <div
          style={{
            display: "flex",
            background: "#46198f53",
            paddingBottom: "2.2rem",
            justifyContent: "center",
          }}
        >
          <Button
            title="BACK"
            onClick={() => navigate("/myprofile/mispublicaciones")}
            margin="0 2rem"
            padding=".2rem 3rem"
          />
          <Button
            title="CREATE"
            type="submit"
            margin="0 2rem"
            padding=".2rem 3rem"
          />
        </div>
      </FormCreateNft>
    </ContainerCreateNft>
  );
};
