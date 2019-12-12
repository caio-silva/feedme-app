export function errorHandler(ex, functionName){
    /*  
    * print error to console
    */
    console.log();
    console.log(`Error. Printed from errorHandler. Erro func: ${functionName}`);
    console.log();
    console.log(ex.message);
    console.log();
    console.log(ex.stack);
    console.log();
}