import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'
import { store } from "@/store/index";

// 👉 Required Validator
export const requiredValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'Lütfen boş bırakmayınız !!'
  
  return !!String(value).trim().length || 'Lütfen boş bırakmayınız !!'
}

export const dateValidator = (value) => {
  const regex = /^[0-9\-/]*$/; // Sadece rakamlar, tire ve eğik çizgi kabul edilir
  if (!regex.test(value)) {
    return "Lütfen sadece rakamlar, tire ve eğik çizgi kullanın.";
  }
  return true;
};

// 👉 Email Validator
export const emailValidator = value => {
  if (isEmpty(value))
    return true
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || 'Doğru Mail Adresini girer misiniz ?'
  
  return re.test(String(value)) || 'Doğru Mail Adresini girer misiniz ?'
}

// 👉 Password Validator
export const passwordValidator = password => {
  const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!?@#$%&*()]).{8,}/
  const validPassword = regExp.test(password)
  //console.log("ValidePassword ==> ", validPassword)
  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
        'Alana en az bir büyük harf, küçük harf, özel karakter ve en az 8 karakterden oluşan rakam içermelidir')
}

export const customPasswordValidator = password => {
  // Şifre, en az bir rakam, bir küçük harf, bir büyük harf ve bir özel karakter içermelidir.
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[-_!?@#$%&*()]/.test(password);

  // Tüm koşulların sağlanıp sağlanmadığı kontrol edilir.
  const isValid = hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && password.length >= 8;

  // isValid true ise şifre uyumludur, değilse uyumsuzdur.
  return isValid || 'Field must contain at least one uppercase, lowercase, special character, and digit with min 8 chars';
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) => value === target || 'Parolanız Eşleşmiyor'

// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value)
  
  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `Enter number between ${min} and ${max}`
}

// 👉 Integer Validator
export const integerValidator = value => {
  if (isEmpty(value))
    return true
  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || 'This field must be an integer'
  
  return /^-?[0-9]+$/.test(String(value)) || 'This field must be an integer'
}

// 👉 Regex Validator
export const regexValidator = (value, regex) => {
  if (isEmpty(value))
    return true
  let regeX = regex
  if (typeof regeX === 'string')
    regeX = new RegExp(regeX)
  if (Array.isArray(value))
    return value.every(val => regexValidator(val, regeX))
  
  return regeX.test(String(value)) || 'The Regex field format is invalid'
}

// 👉 Alpha Validator
export const alphaValidator = value => {
  if (isEmpty(value))
    return true
  
  return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
}

// 👉 URL Validator
export const urlValidator = value => {
  if (isEmpty(value))
    return true
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  
  return re.test(String(value)) || 'URL is invalid'
}

// 👉 Length Validator
export const lengthValidator = (value, length) => {
  if (isEmpty(value))
    return true
  
  return String(value).length === length || `The Min Character field must be at least ${length} characters`
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = value => {
  if (isEmpty(value))
    return true
  const valueAsString = String(value)
  
  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'All Character are not valid'
}


// User Validator
export const userValidator = (value) => {
  const allUserData = store.state.userRole.length == 0 ? JSON.parse(localStorage.getItem("userRoles")) : store.state.userRole
  const isUser = allUserData.map(item=> item.email)
  if(!isUser.includes(value)){
    return true
  }
  return "Bu Mail Kayıtlı, Lütfen kayıtlı olmayan bir mail deneyiniz."
}