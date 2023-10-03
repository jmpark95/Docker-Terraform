import axios from "axios";

export const UserService = {
   getAllUsers: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
      return response.data;
   },

   addUser: async (formInput) => {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formInput);
   },
};
