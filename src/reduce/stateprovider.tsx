import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { ActionTypesProps, StateProps } from "../interfaces/interfaces";

// Определяем типы для провайдера состояния и хука
interface StateProviderProps{
  reducer: (state: StateProps, action: ActionTypesProps) => StateProps;
  initialState: StateProps;
  children: ReactNode;
};

// Создаем контекст состояния
export const StateContext = createContext<[StateProps, React.Dispatch<ActionTypesProps>] | undefined>(undefined);

// Создаем провайдер состояния
export const StateProvider: React.FC<StateProviderProps> = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Создаем хук для получения значения состояния
export const useStateValue = () => useContext(StateContext) as [StateProps, React.Dispatch<ActionTypesProps>];