import axios from "axios"

export const dataRezMiktari = () =>{
    axios.post('https://jectxbackend-672789bf3678.herokuapp.com/rezmiktari').then(r=>{
        localStorage.setItem("rezMiktarı", JSON.stringify(r.data))
    })
}
