import UserSignInForm from "../components/UserSignInForm";
import PikaHeader from "../static/PikaHeader.webp";
import PokeBall from "../static/poke-ball.png";
import tw from "tailwind-styled-components";

import { AuthContext } from "../hooks/UserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <HeaderBox>
      <Link to="/" className="p-2 md:p-4 text-sm md:text-base text-gray dark:text-white box-decoration-clone drop-shadow-lg">HOME</Link>
      {!user ? ("") : (<Link to="/poke-box" className="p-2 md:p-4 text-sm md:text-base text-gray dark:text-white box-decoration-clone drop-shadow-lg">포켓몬박스</Link>)}
      <Link to="/poke-custom" className="p-2 md:p-4 text-sm md:text-base text-gray dark:text-white box-decoration-clone drop-shadow-lg">랜덤뽑기</Link>
      <PikaHeaderAnimation src={PikaHeader} />
      <PokeBallAnimation src={PokeBall} />
      <UserSignInForm />
    </HeaderBox>
  );
};

export default Header;

const HeaderBox           = tw.div`bg-slate-600 p-5 bg-header-pattern bg-center bg-no-repeat font-bold`;
const PikaHeaderAnimation = tw.img`w-24 inline-flex ease-in-out delay-150 sm:hover:translate-x-64 transition-transform lg:hover:translate-x-96 duration-700 peer`;
const PokeBallAnimation   = tw.img`w-8 mt-5 delay-300 ease-in-out opacity-0 peer-hover:opacity-100 transition-opacity inline-flex animate-spin`;