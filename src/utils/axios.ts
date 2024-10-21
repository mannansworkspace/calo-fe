import axios from "axios";
import { backendApiUrl } from "../config";

export const axiosInstance = axios.create({
  baseURL: backendApiUrl,
});
