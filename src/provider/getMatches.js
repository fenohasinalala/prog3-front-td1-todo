import axios from "axios";

export const getMatches = async () => {
  try {
    const client = axios.create({
      baseURL: "http://localhost:8080",
    });

    client.get("/matches").then((response) => {
      console.log(response);
    });
  } catch (error) {}
};
