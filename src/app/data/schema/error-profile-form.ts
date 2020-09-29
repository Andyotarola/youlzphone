import { FormControl } from '@angular/forms'

export interface ErrorProfileForm {
    
    formControl:FormControl;
    required?:{
        message:String
    },
    maxLength?:{
        message:String
    },
    minLength?:{
        message:String
    }
}
