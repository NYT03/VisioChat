import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

function User({ children }) {
  const [currentUser, setCurrentUser] = useState({username:"Nikhil",email:"nikhilraval203@gmail.com"});
  const user = useMemo(() => {
    return { currentUser, setCurrentUser };
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

User.propTypes = {
  children: PropTypes.node,
};

export default User;

