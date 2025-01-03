<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required',
            'contactNumber' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'firstName.required' => 'First name is required',
            'lastName.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'contactNumber.required' => 'Contact number is required',
        ];
    }
}
