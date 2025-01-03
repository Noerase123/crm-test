import React, { useEffect } from 'react'
import { TextField, ViewButtons } from './Fields';
import { useForm } from 'react-hook-form';
import { TTableList } from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCustomer, getSingleCustomer } from '../services/RestApi';

type TCallback = {
  cb?: () => void;
}

export function View({ cb }: TCallback) {
  const params: any = useParams();
  const navigate = useNavigate();

  const { control, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: ''
    }
  })

  const fetchSingleDataAPI = async (id: string) => {
    try {
      const { data } = await getSingleCustomer<TTableList>(id);
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('email', data.email);
      setValue('contactNumber', data.contactNumber);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSingleDataAPI(params.id);
  }, []);

  const navigateEdit = () => {
    navigate('/edit/' + params.id);
  }

  const deleteData = async () => {
    await deleteCustomer(params.id);
    cb?.();
  }

  return (
    <div className='flex flex-row justify-center'>
      <div className='w-[500px] bg-slate-200 border rounded-xl'>
        <form className='p-10'>
          <ViewButtons
            onBackClick={cb}
            onEditClick={navigateEdit}
            onDeleteClick={deleteData}
          />
          <TextField control={control} name='firstName' label='First Name' placeholder='Enter your first name' readOnly />
          <TextField control={control} name='lastName' label='Last Name' placeholder='Enter your last name' readOnly />
          <TextField control={control} name='email' label='Email Address' type='email' placeholder='Enter your email address' readOnly />
          <TextField control={control} name='contactNumber' label='Contact number' placeholder='Enter your contact number' readOnly />
        </form>
      </div>
    </div>
  );
}
  