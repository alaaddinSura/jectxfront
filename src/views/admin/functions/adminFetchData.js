import axios from "@axios";
import * as configs from "@/views/admin/functions/adminConfig";
import { store } from "@/store/index";
import * as dates from "@/views/dashboards/functions/dates";

export const getGoal = (isLocal) =>{
    store.commit("changeGoalsLoader", 0)
    axios.request(configs.getGoals()).then((r)=>{
        if(isLocal){
        localStorage.setItem("getGoals", JSON.stringify(r.data))
        store.commit("changeGoalsLoader", 1)
        }
        else{
        store.commit("changeGetGoals", r.data)
        localStorage.setItem("getGoals", JSON.stringify(r.data))
        store.commit("changeGoalsLoader", 1)
        }
        
    }).catch((error)=>{
        console.log("Get Goals Error ==> ", error)
    })
}

export const deleteGoals = (id) =>{
    
    axios.request(configs.deleteGoals(id)).then((r)=>{
        getGoal()
    }).catch((error)=>{
        console.log("Delete Goals ==> ", error)
    })
}

export const addGoals = (value,date,hotelId) =>{
    axios.request(configs.addGoals(value,date,hotelId)).then((r)=>{
        getGoal()
    }).catch((error)=>{
        console.log("Add Goals Error ==> ", error)
    })
}

export const updateGoals = (id,value,date,hotelId) => {
    
    axios.request(configs.updateGoals(id,value,date,hotelId)).then((r)=>{
        getGoal()
    }).catch((error)=>{
        console.log("Update Goals Error ==> ", error)
    })
}