<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Auth::user()->employees()->latest()->paginate(10)->toArray();
        return Inertia::render("employee", [
            "employees" => $employees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("modals/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "firstName" => ["required","string","max:255"],
            "lastName" => ["required","string","max:255"],
            "email" => ["required","string","email"],
            "phoneNumber" => ["required","string","max:255"]
        ]);

        Employee::create([
            'user_id' => auth()->user()->id,
            'first_name' => $request->firstName,
            'last_name'=> $request->lastName,
            'email' => $request->email,
            'phone_number' => $request->phoneNumber,

        ]);

        return to_route('employee.index')->with('success','Employee created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('modals/edit',[
            'employeeData' => $employee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            "firstName" => ["required","string","max:255"],
            "lastName" => ["required","string","max:255"],
            "email" => ["required","string","email"],
            "phoneNumber" => ["required","string","max:255"]
        ]);

        $employee->update([
            "user_id" => auth()->user()->id,
            "first_name" => $request->firstName,
            "last_name" => $request->lastName,
            "email" => $request->email,
            "phone_number" => $request->phoneNumber
        ]);

        return to_route('employee.index')->with('success','Employee updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return to_route('employee.index')->with('success','Employee deleted successfully!');
    }
}
