import { useEffect, useState } from "react";
import { UserService } from "./api/UserService";

function App() {
   const [users, setUsers] = useState([]);
   const [formInput, setFormInput] = useState({
      name: "",
      email: "",
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setFormInput((prevFormInput) => ({
         ...prevFormInput,
         [name]: value,
      }));
   }

   async function handleSubmit(e) {
      e.preventDefault();
      await UserService.addUser(formInput);
   }

   useEffect(() => {
      async function getAllUsers() {
         const allUsers = await UserService.getAllUsers();
         setUsers(allUsers);
      }

      getAllUsers();
   }, []);

   return (
      <>
         {users.map((user) => (
            <div key={user.id}>
               <div>id: {user.id}</div>
               <div>name: {user.firstName}</div>
               <div>lastname: {user.lastName}</div>
            </div>
         ))}

         <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formInput.name} onChange={handleChange} placeholder="name" />
            <input type="text" name="email" value={formInput.email} onChange={handleChange} placeholder="email" />
            <button type="submit">Submit</button>
         </form>
      </>
   );
}

export default App;
