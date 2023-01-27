import Axios from "axios"

let urls = {
    development: "http://localhost:3000/",
    production:"https://main.d34qxtpa1jstt.amplifyapp.com/" ,
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV as "development" | "production"],
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

export default api
