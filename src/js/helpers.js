import { TIMEOUT_SECONDS } from "./config.js";

const timeout = function (second) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${second} second`));
		}, second * 1000);
	});
};

export const getJson = async function(url){
	try{
		const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]) ;
		const data = await response.json();

		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		return data
	}catch(error){
		throw error
	}
	
}