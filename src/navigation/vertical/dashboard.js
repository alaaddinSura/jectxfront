import axios from "axios"

// let userRoles 
//  axios.get("https://jectxbackend-672789bf3678.herokuapp.com/findUser").then((r)=>{
//   console.log("Orijinal Data ==> ", r.data)
//   localStorage.setItem("userRole", JSON.stringify(r.data))
//   JSON.parse(localStorage.getItem("userRole"))
//  })
 
//  let user = JSON.parse(localStorage.getItem("userData"))
//  let userEmail =  user.email
//  let userDataRoles = userRoles.filter(item => userEmail.includes(item.email))
//  let rolePage = userDataRoles.flatMap(role => role.pages);

//  console.log("Son çekilen Data ==> ", userRoles)
//  console.log("Dataaasss ==> ", rolePage)

const children = [
  {
    title: "Misafir Dağılım",
    to: "dashboards-misafir-dagilim",
  },
  {
    title: "Doluluk Dağılım",
    to: "dashboards-doluluk-dagilim",
  },
  {
    title: "Rezervasyon Gelir",
    to: "dashboards-rezervasyon-gelir",
  },
  {
    title: "Rezervasyon Analiz",
    to: "dashboards-rezervasyon-analiz",
  },
  {
    title: "Geçmiş Karşılaştırma",
    to: "dashboards-rezervasyon-gecmis"
  },
]//.filter(item => rolePage.includes(item.title))


const getRoles = async () => {
  try{
    const res = await axios.get("https://jectxbackend-672789bf3678.herokuapp.com/findUser")
    let user = JSON.parse(localStorage.getItem("userData")).email
    const data = res.data
    //console.log(data)
    //console.log(user)
  }catch(error){
    //console.log(error)
  }
}


export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: children,
    badgeContent: children.length,
    badgeClass: 'bg-primary',
    rows: getRoles(),
  },
]