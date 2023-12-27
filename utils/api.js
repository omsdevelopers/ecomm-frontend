import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const api = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_BASE_URL,
});

export const fetchData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // You can handle errors as needed
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data.user_details));

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addToCart = async ({
  product_id,
  name,
  size,
  quantity,
  price,
  total,
  user_id,
  session_id,
}) => {
  try {
    const { data } = await api.post("/addtocart", {
      product_id,
      name,
      size,
      quantity,
      price,
      total,
      user_id,
      session_id,
    });

    console.log("cart", data);
  } catch (error) {
    throw error.response.data.error;
  }
};

export const cartList = async (userId, sessionId) => {
  try {
    const { data } = await api.post("/cartlist", {
      user_id: userId,
      session_id: sessionId,
    });

    return data; // Returning the data for further use if needed
  } catch (error) {
    throw error.response.data.error;
  }
};


export const myOrder = async (user_id, session_id) => {
  try {

    console.log("dadadadadadadaad", user_id);
    const { data } = await api.post("/orders", {
      user_id,
      session_id,
    });


    return data.myorder;
  } catch (error) {
    throw error.response;
  }
};
