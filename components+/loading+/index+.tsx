import { useEffect } from "react";

// Next imports
import { NextPage } from "next";
import Image from "next/image";

// Third Libraries imports
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../app+/store+";

// assets import
import LoadingSvg from "../../assets+/loading+.svg";

// utils import
import { Colors } from "../../utils+/colors+";

// custom components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  background-color: ${Colors.BgPrimary};
  opacity: 0.4;
  transition: opacity 0.5s;
`;

const Loading: NextPage = () => {
  const loading = useSelector((state: RootState) => state.app.loading);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    loading && (
      <Container>
        <Image alt="loading" src={LoadingSvg} />
      </Container>
    )
  );
};
export default Loading;
