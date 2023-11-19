import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function View() {
  const [people, setPeople] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getAllPeople();
  }, []);

  const getAllPeople = async () => {
    try {
      const data = await fetch("http://localhost:8080/api/user");
      const response = await data.json();
      setPeople(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      await fetch(`http://localhost:8080/api/user/${_id}`, {
        method: "DELETE",
      });
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Users</h2>
          </div>
          <div>
            <Link to={"/add"}>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new employee
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Employee Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Password
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person._id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            {person.username}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            {person.email}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            {person.password}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                          <Link
                            to={`/edit/${person._id}`}
                            className="text-gray-700 mx-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteUser(person._id)}
                            className="text-gray-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
