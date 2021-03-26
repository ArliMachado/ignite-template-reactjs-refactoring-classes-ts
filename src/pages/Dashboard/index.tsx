import { useState } from 'react';

import {Food} from '../../components/Food';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

import { useFoods } from "../../hooks/useFoods";
import { FoodProps } from '../../types';


export function Dashboard() {

  const { foods, deleteFood } = useFoods();

  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [editModalOpen, setEditModalOpen] = useState(false);



  async function handleDeleteFood (id: number) {
    await deleteFood(id);
  }

  function toggleEditModal(){
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodProps){
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

