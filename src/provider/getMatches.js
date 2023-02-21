import Axios from "axios";

function AxiosInstance() {
  return Axios.create({
    baseURL: "http://localhost:8080",
  });
}

export const getMatches = async () => {
  try {
    const client = AxiosInstance();
    return client.get("/matches");
  } catch (error) {}
};

export const getMatchesById = async (id) => {
  try {
    const client = AxiosInstance();
    return client.get(`matches/${id}`);
  } catch (error) {}
};
