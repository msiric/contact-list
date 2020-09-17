import React, { createContext, useReducer } from 'react';

const store = {
  favorites: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setFavorites':
      return action.favorites;
    case 'addFavorite': {
      return {
        ...state,
        [action.favorite]: true,
      };
    }
    case 'removeFavorite': {
      return {
        ...state,
        [action.favorite]: false,
      };
    }
    default:
      return state;
  }
};

const Store = ({ children, definedState }) => {
  const [state, dispatch] = useReducer(
    reducer,
    definedState ? definedState : store
  );

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext({
  store: store,
  dispatch: reducer,
});
export default Store;
