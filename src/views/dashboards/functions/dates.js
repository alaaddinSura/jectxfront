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

export const compareDates = (a, b) => {
  return a.DATE.localeCompare(b.DATE);
  };

export function getLastDatesFromDate(startDate, dayCount){
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - 1); // Başlangıç tarihini bir önceki güne ayarlayın
  let lastDates = [];

  for (let i = 0; i < dayCount; i++) {
    lastDates.unshift(formatDate(currentDate)); // Biçimlendirilmiş tarihleri dizinin başına ekleyin
    currentDate.setDate(currentDate.getDate() - 1); // Mevcut tarihi bir önceki güne ayarlayın
  }

  return lastDates;
}

export function getNextDatesFromDate(startDate, dayCount){
  let currentDate = new Date(startDate)
  let lastDates = []

  for(let i = 0; i < dayCount; i++){
    currentDate.setDate(currentDate.getDate() + 1)
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

export function findPreviousWeeks(inputDate) {
  // Verilen tarihin yıl, ay ve hafta bilgisini ayrıştırma
  const [year, month, week] = inputDate.split('-').map(Number);
  
  // Önceki son 7 haftayı tutacak olan dizi
  const previousWeeks = [];

  // inputDate'den önceki son 7 haftayı hesaplama
  let currentYear = year;
  let currentMonth = month;
  let currentWeek = week;

  for (let i = 0; i < 12; i++) {
    // Hafta sayısını azaltma
    currentWeek--;

    // Eğer hafta sayısı 0'a düşerse bir önceki aya geç
    if (currentWeek === 0) {
      currentMonth--;

      // Eğer ay 0'a düşerse bir önceki yıla geç
      if (currentMonth === 0) {
        currentYear--;
        currentMonth = 12; // Aralık
      }

      // Geçilen ayın toplam hafta sayısını bulma
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      const weeksInMonth = Math.ceil((daysInMonth + new Date(currentYear, currentMonth - 1, 1).getDay()) / 7);

      // Hafta sayısını ayın toplam hafta sayısına ayarlama
      currentWeek = 4;
    }

    // Yıl, ay ve hafta bilgisini diziye ekleme
    previousWeeks.unshift(`${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentWeek).padStart(2, '0')}`);
  }

  return previousWeeks;
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
  
  months.push(currentDate.split('-')[0] + "-" + currentDate.split('-')[1])

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

export function findLastMonthArray(currentDateArray){
  if (!Array.isArray(currentDateArray)) {
    console.error('currentDateArray is not an array!');
    return [];
  }

  const lastMonthArray = currentDateArray.map(currentDate => {
    const [year, month, day] = currentDate.split('-');
  
    let previousYear = year;
    let previousMonth = Number(month) - 1;
  
    if (previousMonth === 0) {
      previousYear--;
      previousMonth = 12;
    }

    return `${previousYear}-${String(previousMonth).padStart(2, '0')}-${day}`;
  });

  return lastMonthArray;
}

export function findBetweenDates(startDate, endDate){
    let tarih1 = startDate
    let tarih2 = endDate

    // Eğer tarih değerleri eksikse veya aynı değerdeyse boş bir dizi döndürelim
    if (!tarih1 || !tarih2 || tarih1 === tarih2) {
      return [tarih1];;
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

export function getNextYearDates(startDate) {
  const dates = [];
  const currentDate = new Date(startDate); // Başlangıç tarihini oluştur

  // 1 yıl boyunca her gün için döngü
  for (let i = 0; i < 365; i++) {
      // Ay, gün ve yıl bilgisini al
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden 1 ekliyoruz
      const day = currentDate.getDate();

      // Tarih bilgisini YYYY-MM-DD formatına dönüştür ve diziye ekle
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      dates.push(formattedDate);

      // Bir sonraki gün için tarihi güncelle
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function subtractYearFromDate(inputDateString) {
  // Split the input date string based on "-"
  const dateParts = inputDateString.split('-');

  // Subtract one from the year part
  dateParts[0] = String(Number(dateParts[0]) - 1);

  // Join the parts back into a string
  const resultDateString = dateParts.join('-');

  return resultDateString;
}

export function generatePreviousMonths(startMonth, numberOfMonths) {
  const result = [];

  for (let i = 0; i < numberOfMonths; i++) {
    const date = new Date(startMonth + '-01'); // Assuming day is always '01'
    date.setMonth(date.getMonth() - i);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    result.push(`${year}-${month}`);
  }
  return result;
}

export function getDaysOfMonth(monthYears) {
  function getAllDaysInMonth(year, month) {
    const numDays = new Date(year, month, 0).getDate(); // Ayın gün sayısını al
    const days = [];
    for (let i = 1; i <= numDays; i++) {
        days.push(`${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
    }
    return days;
}

// Verilen tarih dizisindeki her bir tarih için tüm günleri hesapla
const result = monthYears.map(monthYear => {
    const [year, month] = monthYear.split('-');
    return getAllDaysInMonth(parseInt(year), parseInt(month));
});

return result.flat();
}

export function oneDayIncrease(date) {
  // Gelen tarihi alır ve bir gün ekler
  var incomingDate = new Date(date);
  incomingDate.setDate(incomingDate.getDate() + 1);

  // Yeni tarihi string formatına dönüştürerek döndür
  var yeniTarih = incomingDate.toISOString().slice(0,10);
  return yeniTarih;
}

export function getAllDaysOfMonth(yearMonth) {
  const [year, month] = yearMonth.split('-');
  const numDays = new Date(year, month, 0).getDate(); // Ayın gün sayısını al
  const days = [];
  
  for (let i = 1; i <= numDays; i++) {
    days.push(`${year}-${month.padStart(2, '0')}-${String(i).padStart(2, '0')}`);
  }
  
  return days;
}

export function findNextDay(currentDate) {
  // Verilen tarih bilgisini 'YYYY-MM-DD' formatında alın
  let [year, month, day] = currentDate.split('-').map(Number);
  
  // Yeni bir Date nesnesi oluşturun
  let date = new Date(year, month - 1, day);

  // Bir gün ekleyerek bir sonraki günü bulun
  date.setDate(date.getDate() + 1);


  // Sonraki günün tarihini 'YYYY-MM-DD' formatında döndürün
  let nextDay = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return nextDay;
}
