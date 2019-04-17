/****************************************************************************
 * 
 * Purpose : To export all the error messages
 * 
 * @description
 * @file : error.js
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 10/04/2019
 * 
 ****************************************************************************/

 /**
  * exports all error messages
  */
module.exports={
    loginFailed:"Login unsuccessfull",
    registrationFailed:"Registration unsuccessfull",
    emptyEmail:"Email field cannot be empty",
    validEmail:"Enter a valid email",
    validPassword:"Password must contain atleast a small case,capital case and a number with minimum 8 characters",
    mailError:"Failed to send the link to the email",
    emptyPassword:"Password field cannot be empty",
    passwordLength:"Password must contain atleast 8 characters",
    emptyFirstName:"First name cannot be empty",
    emptyLastName:"Last name cannot be empty",
    passwordMatch:"Password and Confirm Password must match",
    resetPasswordFailed:"Failed to reset the password..Try again"
}