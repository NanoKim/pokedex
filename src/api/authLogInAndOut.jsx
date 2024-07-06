import GoogleIcon from "../static/googleIcon.png";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { AuthContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { useContext } from "react";
import { auth } from "./firebase";

export const SignIn = () => {
  const { user } = useContext(AuthContext);
  const [signInWithGoogle, loading] = useSignInWithGoogle(auth);

  if (loading) {
    return <p className="text-white drop-shadow-lg">Loading...</p>;
  }
  if (user) {
    return <p className="dark:text-white">copy URL</p>;
  } 
  else {
    return (
      <>
        <div className="flex flex-row justify-end items-center gap-2 drop-shadow-lg">
          <button onClick={() => signInWithGoogle()}>
            <img src={GoogleIcon} className="hover:scale-110" />
          </button>
        </div>
      </>
    );
  }
};

export const logout = () => {
  auth.signOut(auth);
};

export const deleteUserButton = (user) => {
  deleteUser(user)
    .then(() => {
      Swal.fire({
        icon : 'success',
        title: '탈퇴 완료...!',
        text : 'poke-dex를 이용해주셔서 감사합니다.',
      });
      useNavigate("/", { replace: true });
    })
    .catch((error) => {
      console.log("실패...");
    });
};