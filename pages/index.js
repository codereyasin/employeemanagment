import Head from "next/head";
import React, { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import Table from "../components/table";
import Form from "../components/form";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
const Home = () => {

   const visible = useSelector((state)=> state.app.client.toggleForm)
   const dispatch = useDispatch()
   const handler = () => {
    dispatch(toggleChangeAction())
   }

   

  return (
    <section>
      <Head>
        <title>CRUD Application</title>
        <meta name="desciption" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Employee Managment
        </h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button onClick={handler} className="flex bg-indigo-500 text-white px-2 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
              Add Employee{" "}
              <span className="px-1">
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
        </div>
        {/* Cpllapsable form */}
        {visible ? <Form/> : <></>}
        {/* table */}
       <div className="container mx-auto">
       <Table />
       </div>
      </main>
    </section>
  );
};

export default Home;
