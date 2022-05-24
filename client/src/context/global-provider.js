import { useState } from "react";
import Context from "./global-context";
import { io } from 'socket.io-client';
const socket = io("http://localhost:5000");

const GlobalProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);

  const modalOpenHandler = () => {
    setOpen(true);
  };

  const modalCloseHandler = () => {
    setOpen(false);
  };

  const notifyOpenHandler = () => {
    setNotify(true);
  };

  const notifyCloseHandler = () => {
    setNotify(false);
  };

  const loadingHandler = (value) => {
    setLoading(value);
  };

  const context = {
    open,
    notify,
    loading,
    socket,
    onModalOpen: modalOpenHandler,
    onModalClose: modalCloseHandler,
    onNotifyOpen: notifyOpenHandler,
    onNotifyClose: notifyCloseHandler,
    onLoading: loadingHandler
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default GlobalProvider;
