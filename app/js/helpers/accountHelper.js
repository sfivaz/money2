/**
 * Get the id of the current account
 * @returns {string} the id of the current account
 */
export function getCurrentAccount() {
    const url = window.location.pathname;
    //will get sourceDirectory/account/999
    const pathParams = url.split("/");
    //convert to ["sourceDirectory", "account", "999"]
    return pathParams[pathParams.length - 1];
    //get the last element of the array and return it
}