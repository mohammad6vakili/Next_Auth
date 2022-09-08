import styled from "styled-components";
import { Colors } from "../../utils/colors";

export const AuthBox = styled.div`
  width: 35%;
  max-width: 550px;
  min-width: 350px;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${Colors.BgSecondary};
`;
