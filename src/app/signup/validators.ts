import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';


export const confirmPasswordValidator : ValidatorFn = (control: FormGroup) : ValidationErrors | null => {

    const password = control.get('newPass');
    const confirmation = control.get('newPassCon');

    return password && confirmation && password.value !== confirmation.value ? 
                { 'confirmationFailed' : true } : null;


    // return (fg: FormGroup): {[key: string]: any} => {
    //     const pass = fg.controls[passKey];
    //     const passRep = fg.controls[passRepeatedKey];

    //     if (pass.touched && passRep.touched) {
    //         const isMatch = pass.value === passRep.value;
    //         if (!isMatch && pass.valid && passRep.valid) {
    //             passRep.setErrors({equalValue: passKey});
    //             const message = 'Lozinka i ponovljena lozinka se ne podudaraju';
    //             return { equalValue: message };
    //         }
    //         if (isMatch && passRep.hasError('equalValue')) {
    //             passRep.setErrors(null);
    //         }
    //     }

    //     return null;
    // };
}