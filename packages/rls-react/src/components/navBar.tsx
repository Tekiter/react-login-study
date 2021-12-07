import styled from "styled-components";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <StyledNavBar>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 0.6em;
  }
`;
