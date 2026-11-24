export function validateForm(data) {
    console.log("Validating...");
    console.log(data);

    //store error messages in an array
const errors = [];

//validate method ([ickup or delivery)
const validMethods = ['pickup', 'delivery'];
if(!validMethods.includes(data.method)) {
    errors.push("Method must be pickup or delivery.");
}

const validSize = ['small', 'medium', 'large'];
if(!validSize.includes(data.size)) {
    errors.push("size must be small medium or large");
}

//return result
console.log(errors);
return {
    isValid: errors.length === 0,
    errors
    };
}