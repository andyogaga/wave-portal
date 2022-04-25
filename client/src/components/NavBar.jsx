import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/icons/caption-logo.svg";
import { ReactComponent as HamburgerMenu } from "../assets/icons/menu.svg";
import { breakpoints, PRI_COLOR, PRI_COLOR_FADED } from "../utils/constants";
import { getTotalWaves } from "../store/actions/caption.actions";

const Navbar = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1rem;
  padding-right: 0.3rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const LogoContainer = styled.div`
  width: 4rem;
  height: 100%;
`;

const MenuContainer = styled.div`
  height: 100%;
  padding-right: 3rem;

  @media screen and ${breakpoints.sm} {
    width: 25%;
    padding-right: 1rem;
  }
`;

const Mobile = styled.div`
  @media (min-width: 700px) {
    display: none;
  }
`;


const MenuLink = styled(NavLink)`
  padding: 1rem;
  text-decoration: none;
  &.active {
    background-color: ${PRI_COLOR_FADED}
  }
`;

const UL = styled.ul`
  border-left: 1px solid ${PRI_COLOR_FADED};
  border-right: 1px solid ${PRI_COLOR_FADED};
  border-bottom: 2px solid ${PRI_COLOR_FADED};
  border-radius: 0 0 3px 3px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-size: 1.25em;
  margin-top: 0;
  opacity: 1;
  padding-left: 0;
  position: relative;
  transform: none;
  transition: opacity 0.1s ease-out 0.15s, transform 0.3s linear,
    z-index 0s linear 0.4s;
  will-change: transform;
  z-index: 1;
  &.hide {
    opacity: 0;
    transition: opacity 0.15s ease-in, transform 0.3s linear, z-index linear;
    transform: translateY(-12em);
    z-index: -9;
  }
`;

const Button = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  height: 4rem;
  margin: auto;
  width: 4rem;
`;

/*
 * Links
 */

const Link = styled(NavLink)`
  align-items: center;
  align-self: center;
  border-radius: 10px 10px 0 0;
  color: #000;
  cursor: pointer;
  display: none;
  font-size: 1rem;
  font-weight: 300;
  height: 100%;
  margin-top: 2px;
  outline: 0;
  padding: 0 0.7em;
  user-select: none;
  text-decoration: none;
  &.active {
    border-bottom: 2px solid #e3e2de;
    color: ${PRI_COLOR};
    font-weight: 500;
  }

  @media screen and (min-width: 756px) {
    display: inline-flex;
  }
`;

const BTN = styled.button`
  align-items: center;
  align-self: center;
  border-radius: 10px 10px 0 0;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  height: 100%;
  margin: 2px 6px 2px 12px;
  outline: 0;
  padding: 0 0.7em;
  user-select: none;
  text-decoration: none;
  background-color: ${PRI_COLOR};
  color: #fff;


  @media screen and (min-width: 756px) {
    display: inline-flex;
  }
`

const MENU = styled(HamburgerMenu)`
  width: 2.5rem;
  height: 2.5rem;
  margin: auto;
`;

const LOGO = styled(Logo)`
  width: 4rem;
  height: 4rem;
`

const NavBar = ({ connectWallet, currentAccount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalWaves, setTotalWaves] = useState("0");
  const handleMobileMenuClick = () => {
    setMenuOpen(!menuOpen)
  }

  const waveCount = async () => {
    try {
      const waves = await getTotalWaves();
      setTotalWaves(waves);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    waveCount()
  }, [])


  return (
    <Navbar>
      <LogoContainer>
        <LOGO />
      </LogoContainer>
      <MenuContainer>
        <Mobile>
          <Button onClick={handleMobileMenuClick}>
            <MENU />
          </Button>
          <UL className={!menuOpen && 'hide'}>
            <MenuLink exact activeClassName="active" to="/">Home</MenuLink>
          </UL>
        </Mobile>
        <Link exact activeClassName="active" to="/">
          Home
        </Link>
        {
          !currentAccount ? (
            <BTN onClick={connectWallet}>
              Connect Wallet
            </BTN>
          ) : <BTN onClick={() => waveCount()} >
            Total Waves: {totalWaves}
          </BTN>
        }
      </MenuContainer>
    </Navbar>
  );
};

export default NavBar;
