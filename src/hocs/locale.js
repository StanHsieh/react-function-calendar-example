import React, { createContext, useContext } from 'react';
import hoistStatics from "hoist-non-react-statics";
import { getLocale } from '../locales';

const LocaleCtx = createContext({});

export const withLocale = (Component) => {
  const C = props => {
    const i18n = useContext(LocaleCtx);
    return (
      <Component
        {...props}
        i18n={i18n}
      />
    );
  };
  C.displayName = `withLocale(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
}

export const setLocale = (Component) => {
  const C = props => {
    const { locale, ...remainingProps } = props;
    return (
      <LocaleCtx.Provider value={getLocale(locale)}>
        <Component
          {...remainingProps}
        />
      </LocaleCtx.Provider>
    );
  };
  C.displayName = `setLocale(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.defaultProps = {
    locale: 'en',
  };
  return hoistStatics(C, Component);
}