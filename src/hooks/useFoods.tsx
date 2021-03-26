import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { FoodProps } from "../types";


interface FoodsProviderProps {
  children: ReactNode;
}

type createFoodProps = Omit<FoodProps, 'id'>;

interface FoodsContextData {
  foods: FoodProps[];
  createFood: (food: createFoodProps) => Promise<void>;
  updateFood: (food: FoodProps) => Promise<void>;
  deleteFood: (id: number) => Promise<void>;
}

const FoodsContext = createContext<FoodsContextData> (
  {} as FoodsContextData
);

export function FoodsProvider({children}: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    api.get('/foods')
    .then(response => setFoods(response.data))
  }, []);

  async function createFood(food: createFoodProps) {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFood(editingFood: FoodProps) {
    const food = foods.find(f => f.id === editingFood.id);

    try {
      const updatedFood = await api.put(
        `/foods/${editingFood.id}`,
        {...food, ...editingFood},
      );
  
      const updatedFoods = foods.map(food => 
        food.id !== updatedFood.data.id ? food : updatedFood.data,
      );
      
      setFoods(updatedFoods)
    } catch (err) {
      console.log(err);
      
    }
  }

  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }


  return (
    <FoodsContext.Provider value={{foods, createFood, updateFood, deleteFood}}>
      {children}
    </FoodsContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}