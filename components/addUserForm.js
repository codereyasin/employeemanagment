import React from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";
const formReducer =(state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}
const AddUserForm = ({formData, setFormData}) => {

     const queryClient = useQueryClient()
     const addMutation = useMutation(addUser, {
      onSuccess: () =>{
        queryClient.prefetchQuery('users', getUsers)
      }
     })

     const handleSubmit = (e) =>{
        e.preventDefault()
        if(Object.keys(formData).length === 0) return <Bug message={'Please Type Something'}/>
        let { firstname, lastname, email, salary, date, status } = formData

        const model = {
          name: `${firstname} ${lastname}`,
          avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random () * 10)}.jpg`,
          email,salary,date,status : status ?? "Active"
        }

        addMutation.mutate(model)

     }

     if(addMutation.isLoading) return <div>Loading</div>
     if(addMutation.isError) return <Bug message={addMutation.error.message}/>
     if(addMutation.isSuccess) return <Success message={"Added Successfully"}/>
  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FristName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          onChange={setFormData}
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
        />
      </div>
      <div className="input-type">
        <input
          type="email"
          onChange={setFormData}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          name="date"
          onChange={setFormData}
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            name="status"
            value="Active"
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition-all duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">Active</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            name="status"
            value="Inactive"
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition-all duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">Inctive</label>
        </div>

        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add <span className="px-1"><BiPlus size={24}/></span></button>
      </div>
    </form>
  );
};

export default AddUserForm;
