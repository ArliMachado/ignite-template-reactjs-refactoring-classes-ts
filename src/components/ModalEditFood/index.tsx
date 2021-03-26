import { useRef }  from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import Input from '../Input';
import {FoodProps} from '../../types'
import { FormHandles } from '@unform/core';
import { useFoods } from '../../hooks/useFoods'

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodProps;
}

export function ModalEditFood({isOpen, setIsOpen, editingFood}: ModalEditFoodProps){
  const formRef = useRef<FormHandles>(null);
  const {updateFood} = useFoods();

  async function handleSubmit(data: FoodProps) {
    await updateFood({...data, id: editingFood.id });
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
