import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext();
export const useSocket = () => {
  return useContext(SocketContext);
};
function Socket({ children }) {
  const socket = useMemo(() => io("http://localhost:3001"), []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

Socket.propTypes = {
  children: PropTypes.node,
};

export default Socket;
