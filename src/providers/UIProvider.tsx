'use client'
import { Actions } from 'ahooks/lib/useToggle';
import React, { useState, ReactNode, useContext } from 'react';
import { useToggle } from 'ahooks';
import { Product } from '../interfaces/product';

interface Toggle {
  value: boolean;
  actions: Actions<boolean>;
}

interface ProductView {
  product: Product;
  setProduct: (data: Product) => void;
}

interface Children {
  childrens: ReactNode;
  setChildrens: (data: ReactNode) => void;
}

type UIContextProps = {
  toggleSlideOversCarts: Toggle;
  toggleMenu: Toggle;
  toggleModal: Toggle;
  toggleSearch: Toggle;
  toggleSlideOversForm: Toggle;
  toggleSlideOversFormArticle: Toggle;
  toggleSlideOversFormComponent: Toggle;
  toggleProductQuickviews: Toggle;
  childrenDashboard: Children;
  productView: ProductView;
};

export const UIContext = React.createContext<UIContextProps>(
  {} as UIContextProps,
);

interface UIProvider {
  children: React.ReactNode;
}

export const UIProvider = ({ children }: UIProvider) => {
  const [valueCarts, actionsCarts] = useToggle();
  const [valueMenu, actionsMenu] = useToggle();
  const [valueModal, actionsModal] = useToggle();
  const [valueSearch, actionsSearch] = useToggle();
  const [valueSlideOversForm, actionsSlideOversForm] = useToggle();
  const [valueSlideOversArticle, actionsSlideOversArticle] = useToggle();
  const [valueSlideOversComponent, actionsSlideOversComponent] = useToggle();
  const [valueProductQuickviews, actionsProductQuickviews] = useToggle();
  const [childrens, setChildrens] = useState<ReactNode>();
  const [product, setProduct] = useState<any>();
  return (
    <UIContext.Provider
      value={{
        toggleSlideOversCarts: { value: valueCarts, actions: actionsCarts },
        toggleMenu: { value: valueMenu, actions: actionsMenu },
        toggleModal: { value: valueModal, actions: actionsModal },
        toggleSearch: { value: valueSearch, actions: actionsSearch },
        toggleSlideOversForm: {
          value: valueSlideOversForm,
          actions: actionsSlideOversForm,
        },
        toggleSlideOversFormArticle: {
          value: valueSlideOversArticle,
          actions: actionsSlideOversArticle,
        },
        toggleSlideOversFormComponent: {
          value: valueSlideOversComponent,
          actions: actionsSlideOversComponent,
        },
        toggleProductQuickviews: {
          value: valueProductQuickviews,
          actions: actionsProductQuickviews,
        },
        childrenDashboard: { childrens, setChildrens },
        productView: {product, setProduct}
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UIContext);
};
