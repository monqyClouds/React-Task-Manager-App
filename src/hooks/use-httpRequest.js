import { useCallback, useState } from "react";

const useHttpRequest = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (requestConfig, applyData) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(requestConfig.url, {
					method: requestConfig.method || "GET",
					headers: requestConfig.headers || {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				});

				if (!response.ok) {
					throw new Error("Request failed!");
				}

				const data = await response.json();
				applyData(data);
			} catch (err) {
				setError(err.message || "Something went wrong!");
			}
			setIsLoading(false);
		}, []
	);

	return {
		isLoading,
		error,
		sendRequest
	}
}

// const useHttpRequest = async (method, body = null, headers = null) => {
// 	const [error, setError] = useState(null);
// 	const response = { error, data: null };

// 	try {
// 		const response = await fetch(
// 			"https://react-http-61584-default-rtdb.firebaseio.com/tasks.json",
// 			{
// 				method,
// 				body: JSON.stringify(body),
// 				headers: headers,
// 			}
// 		);

// 		if (!response.ok) throw new Error("Request failed!");

// 		const data = await response.json();

// 		response.data = data;
// 	} catch (err) {
// 		setError(err.message || "Something went wrong!");
// 		response.error = error;
// 	}
// 	return response;
// };

export default useHttpRequest;
