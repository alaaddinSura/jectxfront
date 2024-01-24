import * as dates from "@/views/dashboards/functions/dates"
import { createStore } from "vuex"

export const store = createStore({
  state: {
    dateRange: dates.findYesterdayDate() + "to" + dates.findtodayDate(),
    selectedHotels: ['22964', '22966'],
    guestTypes: {},
    guestNations: [],
    rawData: [],
  },
  getters: {},
  mutations: {
    changeDateRange(state, payload){
      state.dateRange = payload
    },
    changeSelectedHotels(state, payload){
      state.selectedHotels = payload
    },
    changeGuestTypes(state, payload){
      state.guestTypes = payload
    },
    changeGuestNations(state, payload){
      state.guestNations = payload
    },
    changeRawData(state, payload){
      state.rawData = payload
    },
  },
  actions: {},
})