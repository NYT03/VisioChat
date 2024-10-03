import { createContext, useContext } from 'react';
const [currentUser, setCurrentUser] = useState('');
const CurrentUserContext = createContext(currentUser,setCurrentUser);
export default CurrentUserContext;