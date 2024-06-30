import { useContext } from "react";
import { AuthContext } from "../hooks/UserContext";
import { SignIn } from "../api/authLogInAndOut";

const UserSignInForm = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user ? (
        <>
          <SignIn />
        </>
      ) : (
        <>
          <div style={{ width: '50px', height: '50px', visibility: 'hidden' }}></div>
        </>
      )}
    </>
  );
};

export default UserSignInForm;