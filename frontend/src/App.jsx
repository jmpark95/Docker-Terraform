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
         const response = await UserService.getAllUsers();
         setUsers(response.data);
      }

      getAllUsers();
   }, []);

   return (
      <>
         {users.map((user) => (
            <div key={user.id}>
               <div>name: {user.name}</div>
               <div>email: {user.email}</div>
            </div>
         ))}

         <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formInput.name} onChange={handleChange} placeholder="name" />
            <input type="text" name="email" value={formInput.email} onChange={handleChange} placeholder="email" />
            <button type="submit">Submit</button>
         </form>

         <h1>docker testing</h1>
      </>
   );
}

export default App;
