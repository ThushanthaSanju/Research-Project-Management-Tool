import { createContext } from "react";

const GlobalContext = createContext({
  open: false,
  notify: false,
  loading: false,
  onModalOpen: () => {},
  onModalClose: () => {},
  onNotifyOpen: () => {},
  onNotifyClose: () => {},
  onLoading: () => {}
});

export default GlobalContext;
