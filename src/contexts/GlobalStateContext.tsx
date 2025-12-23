import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface ModalState {
  calculatorOpen: boolean;
  techModalOpen: boolean;
  partnerModalOpen: boolean;
}

type ModalAction = 
  | { type: 'TOGGLE_CALCULATOR' }
  | { type: 'TOGGLE_TECH_MODAL' }
  | { type: 'TOGGLE_PARTNER_MODAL' }
  | { type: 'CLOSE_ALL' };

interface GlobalStateContextType {
  modals: ModalState;
  toggleCalculator: () => void;
  toggleTechModal: () => void;
  togglePartnerModal: () => void;
  closeAllModals: () => void;
}

const initialState: ModalState = {
  calculatorOpen: false,
  techModalOpen: false,
  partnerModalOpen: false,
};

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'TOGGLE_CALCULATOR':
      return { ...state, calculatorOpen: !state.calculatorOpen };
    case 'TOGGLE_TECH_MODAL':
      return { ...state, techModalOpen: !state.techModalOpen };
    case 'TOGGLE_PARTNER_MODAL':
      return { ...state, partnerModalOpen: !state.partnerModalOpen };
    case 'CLOSE_ALL':
      return initialState;
    default:
      return state;
  }
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, dispatch] = useReducer(modalReducer, initialState);

  const toggleCalculator = useCallback(() => {
    dispatch({ type: 'TOGGLE_CALCULATOR' });
  }, []);

  const toggleTechModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_TECH_MODAL' });
  }, []);

  const togglePartnerModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_PARTNER_MODAL' });
  }, []);

  const closeAllModals = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL' });
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        modals,
        toggleCalculator,
        toggleTechModal,
        togglePartnerModal,
        closeAllModals,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};