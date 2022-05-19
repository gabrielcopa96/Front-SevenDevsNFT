import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCollections } from "../../redux/actions";
import styled from "styled-components";
import Button from "../shared/Button.jsx";
import Input from "../shared/Input.jsx";
import { useNavigate } from "react-router-dom";

const ContainerCreateCollections = styled.div`
  width: 45%;
  background-color: #46198f53;
  color: var(--secondFontColor);
  padding: 0.2rem 0.85rem;
  border-radius: 0.4rem;
  margin: auto;
`;

const FormCreateCollections = styled.form`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
`;

const ContainerBtnCreateCollection = styled.div`
  width: 56%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;
`;

export const CreateCollection = () => {
  const token = localStorage.getItem("token");

  const [dataCollection, setDataCollection] = useState({
    name: "",
  });

  const [data, setData] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [imageCollection, setImageCollection] = useState("");

  const formData = new FormData();

  formData.append("img", imageCollection);

  const handleInput = (e) => {

    e.preventDefault();
    console.log(e.target.value)
    setDataCollection({
      name: e.target.value,
    });
  };



  const handleSubmitCollection = (e) => {
    e.preventDefault();
    dispatch(postCollections(token, dataCollection, formData));
    alert("creado correctamente")
    setDataCollection({
      name: "",
    });
    navigate("/myprofile/mispublicaciones")
  };
  return (
    <>
      <ContainerCreateCollections>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          Create Collection
        </h2>
        <FormCreateCollections onSubmit={(e) => handleSubmitCollection(e)}>
          <Input
             placeholder="escriba el name o title del nft"
             padding=".4rem"
             onChange={(e) => handleInput(e)}
             name="name"
             value={dataCollection.name}
             width="40%"
          />
          <Input
            type="file"
            padding=".4rem"
            width="40%"
            name="image"
            onChange={(e) => setImageCollection(e.target.files[0])}
          />
          <ContainerBtnCreateCollection>
            <Button
              title="BACK"
              margin="1.8rem 2rem"
              padding=".2rem 3rem"
              onClick={() => navigate("/myprofile/mispublicaciones")}
            />
            <Button
              title="CREATE"
              type="submit"
              margin="1.8rem 2rem"
              padding=".2rem 3rem"
            />
          </ContainerBtnCreateCollection>
        </FormCreateCollections>
      </ContainerCreateCollections>
    </>
  );
};
