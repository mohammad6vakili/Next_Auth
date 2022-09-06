// Next imports
import { NextPage } from "next";
import Image from "next/image";

// Third Libraries imports
import styled from "styled-components";

// assets import
import LoadingSvg from "../../Assets/Loading.svg";

// utils import
import { Colors } from "../../utils/Colors";

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

const AppLoading: NextPage = () => {
  return (
    <Container>
      <Image src={LoadingSvg} />
    </Container>
  );
};
export default AppLoading;
