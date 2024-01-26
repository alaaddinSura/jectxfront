export const findYesterdayDate = () =>{
  const currentDate = new Date()

  const yesterdayDate = new Date(currentDate)

  yesterdayDate.setDate(currentDate.getDate() - 1)

  const year = yesterdayDate.getFullYear()
  const month = String(yesterdayDate.getMonth() + 1).padStart(2, '0')
  const day = String(yesterdayDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const findTomorrowDate = () =>{
  const currentDate = new Date()

  const yesterdayDate = new Date(currentDate)

  yesterdayDate.setDate(currentDate.getDate() + 1)

  const year = yesterdayDate.getFullYear()
  const month = String(yesterdayDate.getMonth() + 1).padStart(2, '0')
  const day = String(yesterdayDate.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

export const findAfterDate = date =>{
  const currentDate = new Date(date)

  const afterDate = new Date(currentDate)

  afterDate.setDate(currentDate.getDate() + 1)

  const year = afterDate.getFullYear()
  const month = String(afterDate.getMonth() + 1).padStart(2, '0')
  const day = String(afterDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const findtodayDate = () =>{
  const currentDate = new Date()

  const yesterdayDate = new Date(currentDate)

  yesterdayDate.setDate(currentDate.getDate())

  const year = yesterdayDate.getFullYear()
  const month = String(yesterdayDate.getMonth() + 1).padStart(2, '0')
  const day = String(yesterdayDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function filterDatesByRange(dateList, startDate, endDate){
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  return dateList.filter(dateStr =>{
    const dateObj = new Date(dateStr)

    return dateObj >= startDateObj && dateObj <= endDateObj
  })
}

function formatDate(date){
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getLastDatesFromDate(startDate, dayCount){
  let currentDate = new Date(startDate)
  let lastDates = []

  for(let i = 0; i < dayCount; i++){
    currentDate.setDate(currentDate.getDate() - 1)
    lastDates.push(formatDate(currentDate))
  }

  return lastDates
}

export function findWeek(day){
  let lastDigit = day.split('-')[2]
  lastDigit = Number(lastDigit)
  if(lastDigit<=7){
    return day.split('-')[0]+'-'+day.split('-')[1]+'-01'
  }
  else if(lastDigit>7 && lastDigit<=14){
    return day.split('-')[0]+'-'+day.split('-')[1]+'-02'
  }
  else if(lastDigit>14 && lastDigit <=21){
    return day.split('-')[0] + '-' +day.split('-')[1] + '-03'
  }
  else if(lastDigit>21){
    return day.split('-')[0]+'-'+day.split('-')[1]+'-04'
  }

  return 'no week'
}

export function finLast7months(currentDate){
  let currentYear = Number(currentDate.split('-')[0])
  let currentMonth = Number(currentDate.split('-')[1])
  let months = []

  //last 3 month
  for(let i=0; i<7;i++){
    if(currentMonth === 1){
      // yıl bir azalır ay 12 olur
      currentMonth = 12
      currentYear -= 1
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)

      months.push(String(currentYear) + n)
    }
    else{
      // yıl sabit ay bir azalır
      currentMonth -= 1
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)

      months.push(String(currentYear) + n)
    }
  }

  months.push(currentDate)

  return months
}

export function findNext12months(currentDate){
  let months = []
  let currentYear = Number(currentDate.split('-')[0])
  let currentMonth = Number(currentDate.split('-')[1])
  
  for(let i=0; i<12;i++){
    if(currentMonth === 12){
      // yıl bir artar ay 01 olur
      currentMonth = 1
      currentYear += 1
  
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)
  
      months.push(String(currentYear) + n)
    }
    else{
      // yıl sabit ay bir artar
      currentMonth += 1
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)
  
      months.push(String(currentYear) + n)
    }
  }
  
  return months.sort()
  
}

export function find7MonthsWithOrigin(currentDate){
  let currentYear = Number(currentDate.split('-')[0])
  let currentMonth = Number(currentDate.split('-')[1])
  let months = []
  
  //last 3 month
  for(let i=0; i<3;i++){
    if(currentMonth === 1){
      // yıl bir azalır ay 12 olur
      currentMonth = 12
      currentYear -= 1
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)
  
      months.push(String(currentYear) + n)
    }
    else{
      // yıl sabit ay bir azalır
      currentMonth -= 1
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)
  
      months.push(String(currentYear) + n)
    }
  }
  currentYear = Number(currentDate.split('-')[0])
  currentMonth = Number(currentDate.split('-')[1])
  
  //next 3 month
  for(let i=0; i<3;i++){
    if(currentMonth === 12){
      // yıl bir artar ay 01 olur
      currentMonth = 1
      currentYear += 1
  
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)
  
      months.push(String(currentYear) + n)
    }
    else{
      // yıl sabit ay bir artar
      currentMonth += 1
      let n = currentMonth < 10 ? '-0' + String(currentMonth) : '-' + String(currentMonth)
  
      months.push(String(currentYear) + n)
    }
  }
  
  months.push(currentDate)
  
  return months.sort()
}

export function findMidDate(dateStr1, dateStr2) {
  // Parse the date strings into Date objects
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)
  
  // Calculate the average timestamp
  const avgTimestamp = (date1.getTime() + date2.getTime()) / 2
  
  // Create a new Date object from the average timestamp
  const midDate = new Date(avgTimestamp)
  
  // Format the midDate as a string (e.g., "YYYY-MM-DD")
  return `${midDate.getFullYear()}-${String(midDate.getMonth() + 1).padStart(2, '0')}-${String(midDate.getDate()).padStart(2, '0')}`
}

export function findCurrentMonth(){
  const currentDate = new Date()
  const year = String(currentDate.getFullYear())
  const month = currentDate.getMonth() + 1 > 9 ? String(currentDate.getMonth() + 1) : '0' + String(currentDate.getMonth() + 1)
    
  return year + '-' + month
}
  
export function findLastMonth(currentDate){
  const year = currentDate.split('-')[0]
  let month = Number(currentDate.split('-')[1]) - 1
    
  if(month == 0){
    month = String(12)
  }
  else if(month > 0 && month < 10){
    month = '0' + String(month)
  }
  else{
    month = String(month)
  }
  return year + '-' + month
}

export function findBetweenDates(startDate, endDate){
    let tarih1 = startDate
    let tarih2 = endDate

    // Eğer tarih değerleri eksikse veya aynı değerdeyse boş bir dizi döndürelim
    if (!tarih1 || !tarih2 || tarih1 === tarih2) {
        return [];
    }

    // Tarih değerlerini Date nesnelerine çevirelim
    let date1 = new Date(tarih1);
    let date2 = new Date(tarih2);

    let tarihDizisi = [];

    // Döngü ile her günün tarihini ekleyelim
    for (var currentDate = date1; currentDate <= date2; currentDate.setDate(currentDate.getDate() + 1)) {
        tarihDizisi.push(currentDate.toISOString().split('T')[0]);
    }

    return tarihDizisi;
}