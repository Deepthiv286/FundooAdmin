/****************************************************************************
 * 
 * Purpose : To create services that will send the incoming data to server and save that data to database.
 * 
 * @description
 * @file : service.js
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 10/04/2019
 * 
 ****************************************************************************/
import axios from 'axios';
import constants from '../config/constants';
/**
 * import required files
 */
// const encodeDataHeader = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': localStorage.getItem('token')
// }
const jsonDataHeader = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
}
/**
 * encoder function
 */
export function encode(data) {
    const formBody = [];
    for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}
/**
 * creating services for admin login
 */
export function adminLogin(data) {
    return axios({
        method: 'POST',
        url: `${constants.baseUrl}${constants.adminLogin}`,
        data: data
    }).then(response => {
        console.log("In admin login services");
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('token', response.data.id);
        return response;
    })
}
/**
 * service to get admin list
 */
export function adminList() {
    return axios({
        method: 'GET',
        url: `${constants.baseUrl}${constants.adminList}`,
        headers: jsonDataHeader
    }).then(res => {
        return res;
    })
}
/**
 * to get unapproved question and answers
 */
export function unapprovedQA() {
    return axios({
        method: 'GET',
        url: `${constants.baseUrl}${constants.unapprovedQA}`,
        headers: jsonDataHeader
    }).then(res => {
        return res;
    })
}
/**
 * to approve the answer
 */
export function approveAnswer(id) {
    return axios({
        method: 'POST',
        url: `${constants.baseUrl}${constants.approveAnswer}${id}`,
        headers: jsonDataHeader,
    }).then(res => {
        return res;
    })
}
