import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Header} from './components/Header';
import {ModalAddFood} from './components/ModalAddFood';
import { FoodsProvider } from './hooks/useFoods';

import Routes from './routes';

import GlobalStyle from './styles/global';

export function App(){ 

  const [isNewFoodModalOpen, setIsNewFoodModalOpen] = useState(false);

  function handleOpenNewFoodModal(){
    setIsNewFoodModalOpen(!isNewFoodModalOpen);
  }
  
  return (
    <FoodsProvider>
      <GlobalStyle />
      <Header openModal={handleOpenNewFoodModal} />

      <ModalAddFood
        isOpen={isNewFoodModalOpen}
        setIsOpen={handleOpenNewFoodModal}
      />

      <Router>
        <Routes />
      </Router>
    </FoodsProvider>
  )
};

