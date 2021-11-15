import { func } from "prop-types";

export function isAuthenticated() {
    const access = sessionStorage.getItem('access', null);
    console.log(`access >> ${access}`);
    
    if(access) {
        return true
    }
    
    return false
}

export default isAuthenticated;

export function saveUser(result) {
    sessionStorage.setItem('refresh', result.refresh)
    sessionStorage.setItem('access',result.access)
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
}

export function logout() {
    
    sessionStorage.setItem('refresh', "")
    sessionStorage.setItem('access', "")
    sessionStorage.setItem('first_name', "")
    sessionStorage.setItem('last_name', "")
    sessionStorage.setItem('mobile', "")
    sessionStorage.setItem('email', "")
    console.log(`clear storage:`)

}

export function getUser(){
    return {
        
    }
}