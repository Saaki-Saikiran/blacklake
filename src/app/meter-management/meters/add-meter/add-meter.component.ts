import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'add-meter',
    templateUrl: 'add-meter.component.html'
})
export class AddMeterComponent implements OnInit {
    @Input() public data;

    userForm: FormGroup;
    formHeader: string;
    buttonType: string;
    // user: User;
    isEditing: boolean;
    submitted = false;

    constructor(public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        console.log(this.data, '============');

        if (this.data._id === undefined) {
            this.formHeader = 'Add Meter Details';
            this.buttonType = 'Add';
            this.isEditing = false;

            this.userForm = this.formBuilder.group({
                name: new FormControl('', [Validators.required, Validators.minLength(3)]),
                email: new FormControl('', [Validators.required, Validators.email]),
                phone: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
                username: new FormControl('', [Validators.required]),
                address: new FormControl('', [Validators.required]),
                // isActive: new FormControl(true, [Validators.required])
            });

        } else {
            this.formHeader = 'Edit Meter Details';
            this.buttonType = 'Update';
            this.isEditing = true;

            this.userForm = this.formBuilder.group({
                _id: new FormControl(this.data._id),
                name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3)]),
                email: new FormControl(this.data.email, [Validators.required, Validators.email]),
                phone: new FormControl(this.data.phone, [Validators.required]),
                password: new FormControl(this.data.password, [Validators.required, Validators.minLength(6)]),
                confirmPassword: new FormControl(this.data.confirmPassword, [Validators.required, Validators.minLength(6)]),
                username: new FormControl(this.data.username, [Validators.required]),
                address: new FormControl(this.data.address, [Validators.required]),
                // isActive: new FormControl(this.data.isActive, [Validators.required])
            });

        }

        // this.registerForm = this.formBuilder.group({
        //     firstName: ['', Validators.required],
        //     lastName: ['', Validators.required],
        //     email: ['', [Validators.required, Validators.email]],
        //     password: ['', [Validators.required, Validators.minLength(6)]],
        //     confirmPassword: ['', Validators.required],
        //     acceptTerms: [false, Validators.requiredTrue]
        // }, {
        //     // validator: MustMatch('password', 'confirmPassword')
        // });
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.userForm.reset();
    }

    hideModal(): void {
        this.activeModal.close();
    }

}
