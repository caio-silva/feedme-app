export function errorHandler(ex, functionName){
    console.log(`Error. Printed from errorHandler. Erro func: ${functionName}`);
    console.log(ex.message, ex.stack);
}