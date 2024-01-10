import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Redis } from "@upstash/redis";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const redis = new Redis({
  url: "https://eu1-firm-pug-38426.upstash.io",
  token:
    "AZYaASQgZTE3NTI1M2QtYjQyOC00NTcxLTkzOWYtY2E4OTQ1ZTI5NTNhNTViMjI0NDE2ODA2NDBmMTgyOTVkNWU4MzI5MWYxNjE=",
});

export const fetchData = async (url, requestBody) => {
  try {
    // Check if request body data exists
    const shouldFetchFromServer =
      requestBody && Object.keys(requestBody).length > 0;

    const cacheKey = "/electro-products";
    const cachedData = shouldFetchFromServer ? null : await redis.get(cacheKey);

    if (cachedData) {
      // If cachedData is already an object, return it directly
      if (typeof cachedData === "object") {
        return cachedData;
      }

      // Parse the JSON string if it's a string
      return JSON.parse(cachedData);
    }

    const response = await axios.get(url, {
      params: shouldFetchFromServer
        ? requestBody
        : { price: requestBody.price },
    });

    // Only cache the data if request body data doesn't exist
    if (!shouldFetchFromServer) {
      await redis.set(cacheKey, JSON.stringify(response.data));
    }

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
    const { data } = await api.post("/orders", {
      user_id,
      session_id,
    });

    return data.myorder;
  } catch (error) {
    throw error.response;
  }
};

export const delCart = async (id) => {
  try {
    const { data } = await api.get(`/deleteCartItem/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const listCetegory = async () => {
  try {
    const cacheKey = "/electro-categories";
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // If cachedData is already an object, return it directly
      if (typeof cachedData === "object") {
        return cachedData;
      }

      // Parse the JSON string if it's a string
      return JSON.parse(cachedData);
    }

    const { data } = await api.get("/records");

    await redis.set(cacheKey, JSON.stringify(data.data));

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const cetegoryByproducts = async (id) => {
  try {
    const { data } = await api.get(`/category/${id}`);

    return data.products;
  } catch (error) {
    throw error;
  }
};

export const messageUS = async (datas) => {
  try {
    const { data } = await api.post("/message", {
      name: datas.name,
      phone: datas.phone,
      email: datas.email,
      message: datas.message,
    });

    return data.message;
  } catch (error) {
    throw error;
  }
};

export const breadCrumbs = async () => {
  try {
    const cacheKey = "/electro-image";
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // If cachedData is already an object, return it directly
      if (typeof cachedData === "object") {
        return cachedData;
      }

      // Parse the JSON string if it's a string
      return JSON.parse(cachedData);
    }

    const { data } = await api.get("/image");

    // Cache the response in Redis with an expiration time (e.g., 1 hour)
    await redis.set(cacheKey, JSON.stringify(data.image));

    return data.image;
  } catch (e) {
    throw e;
  }
};
