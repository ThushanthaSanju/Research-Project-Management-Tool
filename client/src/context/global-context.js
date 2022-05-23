import { createContext } from "react";

const GlobalContext = createContext({
  open: false,
  notify: false,
  loading: false,
  socket: {},
  onModalOpen: () => { },
  onModalClose: () => { },
  onNotifyOpen: () => { },
  onNotifyClose: () => { },
  onLoading: () => { }
});

export default GlobalContext;
