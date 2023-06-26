'use client'
import { Actions } from 'ahooks/lib/useToggle';
import React, { useState, ReactNode, useContext } from 'react';
import { useToggle } from 'ahooks';

interface Toggle {
  value: boolean;
  actions: Actions<boolean>;
}
interface Children {
  childrens: ReactNode;
  setChildrens: (data: ReactNode) => void;
}
interface Content {
  content: string;
  setContent: (data: string) => void;
}

type UIContextProps = {
  toggleSlideOversCarts: Toggle;
  toggleMenu: Toggle;
  toggleModal: Toggle;
  toggleSearch: Toggle;
  toggleSlideOversForm: Toggle;
  toggleSlideOversFormArticle: Toggle;
  toggleSlideOversFormComponent: Toggle;
  childrenDashboard: Children;
  contentArticle: Content
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
  const [childrens, setChildrens] = useState<ReactNode>();
  const [content, setContent] = useState<any>();
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
        childrenDashboard: { childrens, setChildrens },
        contentArticle: {content, setContent}
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const {
    toggleSlideOversCarts,
    toggleMenu,
    toggleModal,
    toggleSearch,
    toggleSlideOversForm,
    toggleSlideOversFormArticle,
    toggleSlideOversFormComponent,
    childrenDashboard,
    contentArticle
  } = useContext(UIContext);
  return {
    toggleSlideOversCarts,
    toggleMenu,
    toggleModal,
    toggleSearch,
    toggleSlideOversForm,
    toggleSlideOversFormArticle,
    toggleSlideOversFormComponent,
    childrenDashboard,
    contentArticle
  };
};