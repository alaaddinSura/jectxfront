import dashboard from './dashboard'
import admin from './admin'
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";
import { watch } from 'vue';

 const userDataa = localStorage.getItem("userRole") ? store.state.userRole == 0 ? JSON.parse(localStorage.getItem("userRole")) : store.state.userRole : []
  const loginUser = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : []
 const userRole = userDataa.filter(item => loginUser.email.includes(item.email))

 //userRole[0].role == "user" ? [...dashboard] : [...dashboard,...admin]
export default [...dashboard,...admin]
