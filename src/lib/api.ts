import Axios from "axios"

let urls = {
    development: "http://localhost:3000/",
    production: process.env.PROD_URL,
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV as "development" | "production"],
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

export default api
