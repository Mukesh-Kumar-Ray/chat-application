import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const UseGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        //console.log("token ", token);
        const response = await axios.get(import.meta.env.VITE_SEVER_API + "/api/user/alluser", {
          credentials: "include",
          headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
};

export default UseGetAllUsers;