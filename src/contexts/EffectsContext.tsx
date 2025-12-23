import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface EffectsState {
  lightningActive: boolean;
  leavesActive: boolean;
  moneyActive: boolean;
}

type EffectsAction = 
  | { type: 'ACTIVATE_LIGHTNING' }
  | { type: 'ACTIVATE_LEAVES' }
  | { type: 'ACTIVATE_MONEY' }
  | { type: 'DEACTIVATE_LIGHTNING' }
  | { type: 'DEACTIVATE_LEAVES' }
  | { type: 'DEACTIVATE_MONEY' }
  | { type: 'RESET_ALL' };

interface EffectsContextType {
  effects: EffectsState;
  activateLightning: () => void;
  activateLeaves: () => void;
  activateMoney: () => void;
  deactivateLightning: () => void;
  deactivateLeaves: () => void;
  deactivateMoney: () => void;
  resetAllEffects: () => void;
}

const initialState: EffectsState = {
  lightningActive: false,
  leavesActive: false,
  moneyActive: false,
};

const effectsReducer = (state: EffectsState, action: EffectsAction): EffectsState => {
  switch (action.type) {
    case 'ACTIVATE_LIGHTNING':
      return { ...state, lightningActive: true };
    case 'ACTIVATE_LEAVES':
      return { ...state, leavesActive: true };
    case 'ACTIVATE_MONEY':
      return { ...state, moneyActive: true };
    case 'DEACTIVATE_LIGHTNING':
      return { ...state, lightningActive: false };
    case 'DEACTIVATE_LEAVES':
      return { ...state, leavesActive: false };
    case 'DEACTIVATE_MONEY':
      return { ...state, moneyActive: false };
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
};

const EffectsContext = createContext<EffectsContextType | undefined>(undefined);

export const EffectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [effects, dispatch] = useReducer(effectsReducer, initialState);

  const activateLightning = useCallback(() => {
    dispatch({ type: 'ACTIVATE_LIGHTNING' });
  }, []);

  const activateLeaves = useCallback(() => {
    dispatch({ type: 'ACTIVATE_LEAVES' });
  }, []);

  const activateMoney = useCallback(() => {
    dispatch({ type: 'ACTIVATE_MONEY' });
  }, []);

  const deactivateLightning = useCallback(() => {
    dispatch({ type: 'DEACTIVATE_LIGHTNING' });
  }, []);

  const deactivateLeaves = useCallback(() => {
    dispatch({ type: 'DEACTIVATE_LEAVES' });
  }, []);

  const deactivateMoney = useCallback(() => {
    dispatch({ type: 'DEACTIVATE_MONEY' });
  }, []);

  const resetAllEffects = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  return (
    <EffectsContext.Provider
      value={{
        effects,
        activateLightning,
        activateLeaves,
        activateMoney,
        deactivateLightning,
        deactivateLeaves,
        deactivateMoney,
        resetAllEffects,
      }}
    >
      {children}
    </EffectsContext.Provider>
  );
};

export const useEffects = () => {
  const context = useContext(EffectsContext);
  if (context === undefined) {
    throw new Error('useEffects must be used within an EffectsProvider');
  }
  return context;
};