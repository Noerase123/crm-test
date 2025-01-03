import React, { useEffect } from 'react'
import { TextField, SubmitButton, CancelButton } from './Fields';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TTableList } from './Table';
import { useParams } from 'react-router-dom';
import { getSingleCustomer, updateCustomer } from '../services/RestApi';

const requiredString = (message: string) => {
  return z.string({ required_error: message }).trim().min(1, { message })
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = z.object({
  firstName: requiredString('First name is required'),
  lastName: requiredString('Last name is required'),
  email: requiredString('Email address is required').regex(emailRegex, 'Email address is invalid'),
  contactNumber: requiredString('Contact number is required')
})

type TCallback = {
  cb?: () => void;
}

export function Update({ cb }: TCallback) {
  const params: any = useParams();

  const { control, handleSubmit, setValue } = useForm({
    mode: 'all',
    resolver: zodResolver(formSchema),
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

  const updateSingleDataAPI = async (payload: any, id: string) => {
    try {
      await updateCustomer(id, payload);
      cb?.();
    } catch (error) {
      console.log(error);
      alert('Network error');
    }
  }

  const onSubmit = handleSubmit(data => {
    console.log('data', data);
    updateSingleDataAPI(data, params.id);
  })

  return (
    <div className='flex flex-row justify-center'>
      <div className='w-[500px] bg-slate-200 border rounded-xl'>
        <form className='p-10' onSubmit={onSubmit}>
          <TextField control={control} name='firstName' label='First Name' placeholder='Enter your first name'/>
          <TextField control={control} name='lastName' label='Last Name' placeholder='Enter your last name'/>
          <TextField control={control} name='email' label='Email Address' type='email' placeholder='Enter your email address' />
          <TextField control={control} name='contactNumber' label='Contact number' placeholder='Enter your contact number'/>
          <div className='flex mt-5'>
            <div className='w-[50%]'>
              <CancelButton onClick={cb} />
            </div>
            <div className='w-[50%]'>
              <SubmitButton label='Update' onClick={onSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
  