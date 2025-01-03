<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Customer::paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $validated = $request->validated();

        $customer = new Customer;
        $customer->firstName = $request->firstName;
        $customer->lastName = $request->lastName;
        $customer->email = $request->email;
        $customer->contactNumber = $request->contactNumber;

        if (!$validated) {
            return response()->json([
                'message' => 'validation error'
            ], 400);
        }

        $customer->save();

        return response()->json([
            'message' => 'customer created'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $customer = Customer::where('id', $id)->first();

        if (is_null($customer)) {
            return response()->json([
                'message' => 'Not Found'
            ],404);
        }

        return response()->json($customer,200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCustomerRequest $request, $id)
    {
        $customers = Customer::find($id);

        if (is_null($customers)) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }
        
        $customers->update($request->all());

        return response()->json([
            'message' => 'customer updated'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $customer = Customer::find($id);
        $customer->delete();

        return response()->json([
            'message' => 'customer deleted'
        ], 200);
    }
}
