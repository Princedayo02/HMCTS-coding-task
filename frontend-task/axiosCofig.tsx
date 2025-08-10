import axios from "axios";

export const axiosClientConfig = () => {
	let token = null;
	const axiosClient = axios.create({
		baseURL: "http://localhost:4000",
		headers: { "Content-Type": "application/json" },
	});
	return axiosClient;
};
