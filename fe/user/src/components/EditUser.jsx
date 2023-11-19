import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    setValue,
    // touchedfields activates when touched the input filed
    // dirtyfield activate when modify input value
    formState: { errors, touchedFields, dirtyFields, isDirty, isValid },
  } = useForm();


  const [people, setPeople] = useState([]);
  const nav = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    try {
      const data = await fetch(`http://localhost:8080/api/user/${_id}`);
      const response = await data.json();
      setPeople(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(people);

  useEffect(() => {
    // if (_id) {
    setValue("username", people.username);
    setValue("email", people.email);
    setValue("password", people.password);
    // }
  }, [_id]);

  const onSubmit = async (data) => {
    try {
      await fetch("http://localhost:8080/api/user", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/3 m-3">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="username"
            value={people.username}
            {...register("username", {
              required: "username required !!!",
            })}
          ></input>
          {errors.username && (
            <p className="mt-1 text-red-500 text-xs">
              *{errors.username.message}
            </p>
          )}

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className=" flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            placeholder="Enter your Email"
            id="email"
            value={people.email}
            {...register("email", {
              required: "email required !!!",
            })}
          ></input>
          {errors.email && (
            <p className="mt-1 text-red-500 text-xs">*{errors.email.message}</p>
          )}

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="passowrd"
          >
            Password
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="password"
            placeholder="Enter your Password"
            id="password"
            value={people.password}
            {...register("password", {
              required: "password required !!!",
            })}
          ></input>
          {errors.password && (
            <p className="mt-1 text-red-500 text-xs">
              *{errors.password.message}
            </p>
          )}

          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="my-3 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
