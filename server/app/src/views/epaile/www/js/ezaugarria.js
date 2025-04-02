import { API_URL } from "./konstanteak.js";
export async function getEzaugarria(idEzaugarria){

    const response = await fetch(API_URL + `/ezaugarria/${idEzaugarria}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const data = await response.json();
    return data[0];
}