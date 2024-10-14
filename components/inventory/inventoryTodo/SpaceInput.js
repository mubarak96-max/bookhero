import React, { useState, Fragment, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar.js";
import uniqid from "uniqid";
import TodosMap from "./TodosMap.js";
import Swal from "sweetalert2";
import { setAllSpaces } from "../../../utils/redux/slices/inventorySlice.js";

const KEY = "todoApp.todos";

export default function SpaceInput({ setSpaces }) {
  const [todo, setTodo] = React.useState(null);
  const [spacesList, setSpacesList] = React.useState([]);
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [boleanTodo, setBoleanTodo] = React.useState(false);
  const [todoId, setTodoId] = React.useState("");

  // React.useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(KEY));
  //   if (storedTodos) {
  //     setSpacesList(storedTodos);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   localStorage.setItem(KEY, JSON.stringify(spacesList));
  //   setSpaces(spacesList);
  // }, [spacesList]);

  const dispatch = useDispatch();

  const todoRegex = /^\s*([^,]+),\s*([^,]+)\s*$/;

  const addTodo = (e) => {
    e.preventDefault();

    if (!location) {
      Swal.fire({
        icon: "error",
        title: "Missing Value!",
        text: "Shelf location cannot be empty",
        footer: "<span>Provide value and try again</span>",
      });

      return;
    }

    if (!amount) {
      Swal.fire({
        icon: "error",
        title: "Missing Value!",
        text: "The number of book spaces to be matched is required",
        footer: "<span>Provide value and try again</span>",
      });

      return;
    }

    dispatch(
      setAllSpaces([
        ...spacesList,
        { id: uniqid(), location, amount, tc: false },
      ])
    );

    setSpacesList([
      ...spacesList,
      { id: uniqid(), location, amount, tc: false },
    ]);

    setTodo("");
    setLocation("");
    setAmount("");
  };

  const dellTodo = (id) => {
    const newTodos = spacesList.filter((item) => item.id !== id);

    setSpacesList(newTodos);

    dispatch(setAllSpaces(newTodos));
  };

  const btnEditTodo = (item) => {
    setBoleanTodo(true);
    setTodoId(item.id);

    setTodo(item.todo);
  };

  const editTodo = (e) => {
    e.preventDefault();

    if (!location || !amount) {
      return;
    }

    if (!todoRegex.test(todo)) {
      Swal.fire({
        icon: "error",
        title: "Wrong format!",
        text: "The format should be: 'location, spaces'. Separated by a comma",
        footer: "<span>Enter the correct format</span>",
      });

      return;
    }

    const newTodos = spacesList.map((item) =>
      item.id === todoId ? { ...item, location, amount } : item
    );

    dispatch(setAllSpaces(newTodos));

    setSpacesList(newTodos);
    setBoleanTodo(false);
    setTodoId("");
    setTodo("");
    setLocation("");
    setAmount("");
  };

  const cheked = (id, tc, location, amount) => {
    const newTodos = spacesList.map((item) =>
      item.id === id ? { ...item, location, amount, tc } : item
    );
    dispatch(setAllSpaces(newTodos));

    setSpacesList(newTodos);
  };

  let totalAmount = 0;
  const uniqueLocations = new Set(); // Use a Set to store unique locations

  spacesList?.forEach((item) => {
    totalAmount += parseInt(item.amount, 10); // Convert string to integer and add to total
    uniqueLocations.add(item.location);
  });

  return (
    <Fragment>
      <NavBar
        add={addTodo}
        todo={todo} // setTodo
        input={setTodo}
        bolean={boleanTodo}
        setBtnToEdit={editTodo}
        location={location}
        amount={amount}
        setAmount={(props) => setAmount(props)}
        setLocation={(props) => setLocation(props)}
      />
      {spacesList?.length ? (
        <>
          <p
            style={{ fontSize: "19px", fontWeight: "600", color: "coral" }}
            className="d-flex justify-content-center mt-1"
          >
            {uniqueLocations.size} locations available -- {totalAmount} spaces
            provided
          </p>
        </>
      ) : null}
      <TodosMap
        list={spacesList}
        editBtn={btnEditTodo}
        dell={dellTodo}
        chek={cheked}
      />
    </Fragment>
  );
}
