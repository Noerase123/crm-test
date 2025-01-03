import { CreateForm } from '../components';
import { useNavigate } from 'react-router-dom';
import { View } from '../components/View';
import { Update } from '../components/Update';
import { useContext } from 'react';
import { Context, ContextType } from '../context';

export const LIST_ROUTE = '/';

export function CreateFormPage() {
  const navigate = useNavigate();
  const { setPage } = useContext(Context) as ContextType;

  const handleCallback = () => {
    navigate(LIST_ROUTE);
    setPage(1);
  }
  
  return (
    <CreateForm cb={handleCallback} />
  )
}

export function ViewFormPage() {
  const navigate = useNavigate();
  const { setPage } = useContext(Context) as ContextType;

  const handleCallback = () => {
    navigate(LIST_ROUTE);
    setPage(1);
  }
  
  return (
    <View cb={handleCallback} />
  )
}

export function EditFormPage() {
  const navigate = useNavigate();
  const { setPage } = useContext(Context) as ContextType;

  const handleCallback = () => {
    navigate(LIST_ROUTE);
    setPage(1);
  }
  
  return (
    <Update cb={handleCallback} />
  )
}