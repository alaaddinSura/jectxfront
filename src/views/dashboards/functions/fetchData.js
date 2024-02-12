import axios from "@axios";
import * as configs from "@/views/dashboards/functions/config"
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import _ from 'lodash'



export const callYatakDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeYatakDagilimLoader",0)
    axios.request(configs.yatakDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("yatakDagilim", JSON.stringify(r.data))//bedScatter
            store.commit("changeYatakDagilimLoader",1)
        }
        else {
            store.commit('changeYatakDagilim', r.data)
            store.commit("changeYatakDagilimLoader",1)
        }

    }).catch(d => console.log(d))
    }

export const callGecelemeDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeGecelemeDagilimLoader",0)
    axios.request(configs.gecelemeDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilim", JSON.stringify(r.data))
            store.commit("changeGecelemeDagilimLoader",1)
        }
        else {
            store.commit('changeGecelemeDagilim', r.data)
            store.commit("changeGecelemeDagilimLoader",1)
        }
    }).catch(d => console.log(d))
}

export const callRezervMiktari = (dateRange, hotelids, isLocal) => {
    axios.request(configs.rezervMiktariConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("rezMiktar", JSON.stringify(r.data))//rezCount
        }
        else {
            store.commit('changeRezervMiktar', r.data);
        }
    }).catch(d => console.log(d));
}

export const callKanalRezDagilim = (dateRange, hotelids, isLocal) => {
    axios.request(configs.kanallaraRezDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("kanalRezDagilim", JSON.stringify(r.data))//canalRez
        }
        else {
            store.commit("changeKanalRezDagilim", r.data)
        }
    }).catch(d => console.log(d));
}

export const callOnlineRezMiktari = (dateRange, hotelids, isLocal) => {
    axios.request(configs.onlineRezervMiktariConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("onlineRez", JSON.stringify(r.data))//onlineRez
        }
        else {
            store.commit("changeOnlineRezMiktari", r.data)
        }
    }).catch(d => console.log(d));
}

export const callGecelemeMiktari = (dateRange, hotelids, isLocal) => {

    axios.request(configs.gecelemeMiktariConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("nightAmount", JSON.stringify(r.data))
        }
        else {
            store.commit("changeDoluluk", r.data)
        }
    }).catch(d => console.log(d));
}

export const callAyDoluluk = (endDate, hotelids, isLocal) => {
    const dayCount = 30
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]

    axios.request(configs.ayDolulukConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilimSonAy", JSON.stringify(r.data))
        }
        else {
            store.commit("changeAyDoluluk", r.data)
        }
    })
}

export const callHaftaDoluluk = (endDate, hotelids, isLocal) => {
    const dayCount = 7
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]

    axios.request(configs.haftaDolulukConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilimSonHafta", JSON.stringify(r.data))
        }
        else {
            store.commit("changeHaftaDoluluk", r.data)
        }
    })
}

export const callSonYediAyDoluluk = (endDate, hotelids, isLocal) => {
    const dayCount = 210
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]

    axios.request(configs.sonYediAyDolulukConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilimSon7Ay", JSON.stringify(r.data))
        }
        else {
            store.commit("changesonYediAyDoluluk", r.data)
        }
    })
}

export const callUlkeDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeUlkeDagilimLoader",0)
    axios.request(configs.ulkeDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("countryDist", JSON.stringify(r.data))
            store.commit("changeUlkeDagilimLoader",1)
        } else {
            store.commit("changeUlkeDagilim", r.data)
            store.commit("changeUlkeDagilimLoader",1)
        }
    }).catch(d => console.log(d));
}

export const callGecmisRez = (endDate, dayCount, hotelids, isLocal) => {
    let dateRange

    if (dayCount <= 7) {
        dateRange = dates.getLastDatesFromDate(endDate, 7)
    }
    else if (dayCount > 7 && dayCount <= 49) {
        dateRange = dates.getLastDatesFromDate(endDate, 49)
    }
    else {
        dateRange = dates.getLastDatesFromDate(endDate, 365)
    }

    axios.request(configs.callGecmisRezConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecmisRezervs", JSON.stringify(r.data))

        } else {
            let rData = r.data
            if (rData.length == 28) {
                console.log(rData)
                store.commit("changeGecmisRezervasyonlar", rData)
            }
            else if (rData.length == 196) {
                rData.forEach(item => {
                    item['DATE'] = dates.findWeek(item.DATE)
                    store.commit("changeGecmisRezervasyonlar", rData)
                })
            } else {
                rData.forEach(item => {
                    item['DATE'] = item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1]
                    store.commit("changeGecmisRezervasyonlar", rData)
                })
            }
            //store.commit("changeGecmisRezervasyonlar", r.data)
        }
    }).catch(d => console.log(d));
}

export const callRezAnaliz = (dateRange, hotelids, isLocal) => {
    store.commit("changeRezAnalizLoader", 0)
    axios.request(configs.rezAnalizConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("rezAnaliz", JSON.stringify(r.data))
            store.commit("changeRezAnalizLoader", 1)
        }else {
            store.commit("changeRezAnaliz", r.data)
            store.commit("changeRezAnalizLoader", 1)
        }
    })
}

export const callIptalAnaliz = (dateRange, hotelids, isLocal) => {
    store.commit("changeIptalAnalizLoader", 0)
    axios.request(configs.iptalAnalizConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("iptalAnaliz", JSON.stringify(r.data))
            store.commit("changeIptalAnalizLoader",1)
        } else {
            store.commit("changeIptalAnaliz", r.data)
            store.commit("changeIptalAnalizLoader", 1)
        }
    })
}

export const callIptalEdebilirAnaliz = (dateRange, hotelids, isLocal) => {
    let dRange = dates.find7MonthsWithOrigin(dates.findMidDate(dateRange.sort()[0], dateRange.sort()[dateRange.length - 1]))
    axios.request(configs.iptalEdebilirAnalizConfig(dRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("iptalEdilebilirAnaliz", JSON.stringify(r.data));
        } else {
            store.commit("changeiptalEdebilirAnaliz", r.data);
        }
    })
}

export const callIptalEdebilirAnalizGunluk = (dateRange, hotelids, isLocal) => {
    axios.request(configs.iptalEdebilirAnalizConfigGunluk(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("iptalEdilebilirAnalizGunluk", JSON.stringify(r.data));
        } else {
            store.commit("changeiptalEdebilirAnalizGunluk", r.data);
        }
    })
}

export const callGecmisRezervasyonDagilim = (endDate, dayCount, hotelids, isLocal) => {

    let dateRange

    if (dayCount <= 7) {
        dateRange = dates.getLastDatesFromDate(endDate, 7)
        console.log("Day Count 7'de")
    }
    else if (dayCount > 7 && dayCount <= 49) {
        dateRange = dates.getLastDatesFromDate(endDate, 49)
        console.log("Day Count 7 ve 49 arası")
    }
    else {
        dateRange = dates.getLastDatesFromDate(endDate, 365)
        console.log("49 üzeri")
    }
    axios.request(configs.gecmisRezervasyonDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecmisRezervasyonDagilim", JSON.stringify(r.data));
        } else {
            let rData = r.data
            if (rData.length == 28) {
                store.commit("changeGecmisRezervasyonDagilim", rData)
            }
            else if (rData.length == 196) {
                rData.forEach(item => {
                    item['DATE'] = dates.findWeek(item.DATE)
                    store.commit("changeGecmisRezervasyonDagilim", rData)
                })
            } else {
                rData.forEach(item => {
                    item['DATE'] = item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1]
                    store.commit("changeGecmisRezervasyonDagilim", rData)
                })

            }
        }
    })
}

export const callDolulukGelecekRez = (startDate, hotelids, isLocal) => {


    let dateRange = dates.findNext12months(startDate)
    axios.request(configs.dolulukGelecekRezConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            // let rData = r.data
            // rData.forEach(item => {
            //     item['DATE'] = item['DATE'].split('-')[0] + '-' + item['DATE'].split('-')[1]
            // })
            localStorage.setItem("dolulukGelecekRez", JSON.stringify(r.data))
        } else {
            // let rData = r.data
            // rData.forEach(item => {
            //     item['DATE'] = item['DATE'].split('-')[0] + '-' + item['DATE'].split('-')[1]
            // })
            store.commit("changeGelecekDoluluk", r.data)
        }
    })
}

export const callOdatipiDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeodaTipiDagilimLoader", 0)
    axios.request(configs.odaTipiDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("odaTipiDagilim", JSON.stringify(r.data))
            store.commit("changeodaTipiDagilimLoader",1)
        } else {
            store.commit("changeOdaTipiDagilim", r.data)
            store.commit("changeodaTipiDagilimLoader",1)
        }
    })
}

export const callRezervasyonGecmisGunluk = (hotelids, isLocal) => {
    let dateRange = dates.getLastDatesFromDate(dates.findtodayDate(), 7)
    dateRange.forEach(item => {
        dateRange.push(dates.subtractYearFromDate(item))
    })
    axios.request(configs.callRezervasyonGecmisGunluk(dateRange, hotelids))
        .then(r => {
            let currentDates = dateRange.sort().slice(7, 14)
            let previousDates = dateRange.sort().slice(0, 7)

            let rData = r.data
            let desiredData = {
                cats: currentDates,
                data: [
                    {
                        name: "current",
                        data: rData.filter(item => currentDates.includes(item.DATE))
                    },
                    {
                        name: "previous",
                        data: rData.filter(item => previousDates.includes(item.DATE))
                    },
                ]
            }
            localStorage.setItem('rezervasyonGecmisGunluk', JSON.stringify(desiredData))
        })
        .catch(e => console.log('callRezervasyonGecmisGunluk fonksiyonu hata verdi. hata --> ', e))
}

export const callRezervasyonGecmisAylik = (hotelids, isLocal) => {
    let dateRange = dates.generatePreviousMonths(dates.findCurrentMonth(), 7)
    dateRange.forEach(item => {
        dateRange.push(dates.subtractYearFromDate(item))
    })
    axios.request(configs.callRezervasyonGecmisAylik(dateRange, hotelids))
        .then(r => {
            let currentDates = dateRange.sort().slice(7, 14)
            let previousDates = dateRange.sort().slice(0, 7)

            let rData = r.data
            let desiredData = {
                cats: currentDates,
                data: [
                    {
                        name: "current",
                        data: rData.filter(item => currentDates.includes(item.DATE))
                    },
                    {
                        name: "previous",
                        data: rData.filter(item => previousDates.includes(item.DATE))
                    },
                ]
            }
            localStorage.setItem('rezervasyonGecmisAylik', JSON.stringify(desiredData))
        })
        .catch(e => console.log('callRezervasyonGecmisGunluk fonksiyonu hata verdi. hata --> ', e))
}

export const callChannelTable = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callChannelTable(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("channelTable", JSON.stringify(r.data))
        } else {
            store.commit("changeChannelTable", r.data)
        }
    })
}

export const callRawData = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callRawData(dateRange, hotelids))
        .then((r) => {
            if (isLocal) {
                localStorage.setItem("rawData", JSON.stringify(r.data))
            } else {
                store.commit("changeRawData", r.data)
            }
        })
        .catch(e => console.log('error in callRawData --> ', e))
}

export const callKanalDagilimGelir = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callKanalDagilimGelir(dateRange, hotelids))
        .then((r) => {
            let rData = r.data
            const groupedAndSummed = _.mapValues(
                _.groupBy(rData, obj => [obj.ANAKANAL, obj.BASARILI, obj.DATE, obj.HOTELID].join()),
                group => _.sumBy(group, 'ADR')
            );
            //let mapData = 
            if (isLocal) {
                localStorage.setItem("kanalDagilimGelir", JSON.stringify(rData))
            } else {
                store.commit("changeKanalDagilimGelir", r.data)
            }
        })
        .catch(e => console.log('error in kanalDagilimGelir --> ', e))
}

export const callGunlukTakip = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callKazancTakip(dateRange, hotelids))
        .then((r) => {
            let data = r.data
            let geceleme = data.map(item => item.RESID).length
            let gelir = data.filter(item => item.BASARILI == 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let kayip = data.filter(item => item.BASARILI != 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let adr = gelir / geceleme
            localStorage.setItem('gunlukTakip', JSON.stringify({
                gelir, kayip, adr
            }))
        })
        .catch(e => {
            console.log('error in callGunlukTakip --> ', e)
        })
}

export const callAylikTakip = (dateRange, hotelids, isLocal) => {
    dateRange = dates.findBetweenDates(dateRange[0].split('-')[0] + '-' + dateRange[0].split('-')[1] + '-01', dateRange[0]) 
    axios.request(configs.callKazancTakip(dateRange, hotelids))
        .then((r) => {
            let data = r.data
            let geceleme = data.map(item => item.RESID).length
            let gelir = data.filter(item => item.BASARILI == 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let kayip = data.filter(item => item.BASARILI != 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let adr = gelir / geceleme
            localStorage.setItem('aylikTakip', JSON.stringify({
                gelir, kayip, adr
            }))
        })
        .catch(e => {
            console.log('error in callGunlukTakip --> ', e)
        })
}

export const callKazancDurumuRezMiktari = (dateRange, hotelids)=>{
    dateRange = dates.findBetweenDates(dateRange[0].split('-')[0] + '-' + dateRange[0].split('-')[1] + '-01', dateRange[0])  
    axios.request(configs.rezervMiktariConfig(dateRange,hotelids)).then((r)=>{
        localStorage.setItem("kazancDurumuRezMiktar", JSON.stringify(r.data))
    }).catch(error =>{
        console.log("Kazanç Durumu Rezervasyon Miktarı error ==> ", e)
    })
}

export const callKazancDurumu7AyGrafik = (dateRange, hotelids)=>{
    dateRange = dates.find7MonthsWithOrigin(dateRange[0])
    axios.request(configs.callKazancTakipAylik(dateRange,hotelids)).then((r)=>{
        let rData = r.data.filter(item => item.BASARILI == 'success')
        localStorage.setItem('kazancDurumu7AyGrafik', JSON.stringify(rData))
    }).catch(error =>{
        console.log("Kazanç Durumu 7'li Grafik Error ==> ", error)
    })
}

export const callKanalDagilimGelirler = (dateRange, hotelids)=>{
    dateRange = dates.find7MonthsWithOrigin(dateRange[0])
    console.log(dateRange)
    axios.request(configs.kanalDagilimGelirlerconfig(dateRange,hotelids)).then((r)=>{
        localStorage.setItem("kanalDagilimGelirler", JSON.stringify(r.data))
    }).catch(error =>{
        console.log("Kanal Dağılım Gelirler Dağılım", error)
    })
}