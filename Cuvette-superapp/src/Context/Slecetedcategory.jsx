import React, { createContext, useEffect, useState } from 'react';

const Context = createContext();

const SelectedCategory = ({ children }) => {
  const [category, selectCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [newCat, SetnewCat] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCategory = localStorage.getItem('category');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCategory) {
      selectCategory(JSON.parse(storedCategory));
    }
  }, []);

  const handleUserChange = (newUser) => {
    console.log("new user is",newUser.email)
    const storedUser = localStorage.getItem('user');
    const previousUser =  JSON.parse(storedUser);

    if (previousUser.email === newUser.email) {
      console.log("Don't do anything");
    } else {
      localStorage.clear();
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      selectCategory([]);
    }
  };

  const ClickHandler = (idx, name) => {
    if (newCat.includes(name)) {
      return alert("can't select same category");
    }
    const updatedCategories = [...category, name];
    SetnewCat(updatedCategories);
    selectCategory(updatedCategories);
    localStorage.setItem('category', JSON.stringify(updatedCategories));
  };

  return (
    <Context.Provider value={{ category, selectCategory, user, setUser, handleUserChange }}>
      {children}
    </Context.Provider>
  );
};

export { Context };
export default SelectedCategory;
