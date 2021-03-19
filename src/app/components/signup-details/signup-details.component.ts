import { Component, OnInit } from '@angular/core';

import { SignupData } from '../../models/signup-data.model';

@Component({
    selector: 'signup-details',
    templateUrl: './signup-details.component.html'
})
export class SignupDetailsComponent implements OnInit {
    signupData: SignupData;

    constructor() {

    }

    ngOnInit() {
        
    }
}
