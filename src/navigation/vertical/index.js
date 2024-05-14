import dashboard from './dashboard'
import admin from './admin'
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { store } from "@/store/index";
import { watch } from 'vue';

export default [...dashboard,...admin]
