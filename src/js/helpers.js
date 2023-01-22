import { TIMEOUT_SECONDS } from "./config.js";

const timeout = function (second) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${second} second`));
		}, second * 1000);
	});
};

export const AJAX = async function (url, uploadData = undefined) {
	try {
		const fetchData = uploadData ? fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(uploadData)
		}) : fetch(url)

		const response = await Promise.race([fetchData, timeout(TIMEOUT_SECONDS)]);
		const data = await response.json();

		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		return data
	} catch (error) {
		throw error
	}
}

// export const getJson = async function (url) {
// 	try {
// 		const fetchData = fetch(url)
// 		const response = await Promise.race([fetchData, timeout(TIMEOUT_SECONDS)]);
// 		const data = await response.json();

// 		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

// 		return data
// 	} catch (error) {
// 		throw error
// 	}
// }

// export const sendJson = async function (url, uploadData) {
// 	try {
// 		const fetchData = fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(uploadData)
// 		})
// 		const response = await Promise.race([fetchData, timeout(TIMEOUT_SECONDS)]);
// 		const data = await response.json();

// 		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

// 		return data
// 	} catch (error) {
// 		throw error
// 	}

// }

