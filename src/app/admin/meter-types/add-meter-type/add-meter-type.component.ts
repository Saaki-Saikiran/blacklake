import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'add-meter-type',
    templateUrl: 'add-meter-type.component.html'
})
export class AddMeterTypeComponent implements OnInit {
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
            this.formHeader = 'Add Meter Type Details';
            this.buttonType = 'Add';
            this.isEditing = false;

            this.userForm = this.formBuilder.group({
                type: new FormControl('', [Validators.required]),
                isBillable: new FormControl(true, [Validators.required]),
                isCommon: new FormControl(true, [Validators.required]),
                description: new FormControl('', [Validators.required])
            });

        } else {
            this.formHeader = 'Edit Meter Type Details';
            this.buttonType = 'Update';
            this.isEditing = true;

            this.userForm = this.formBuilder.group({
                _id: new FormControl(this.data._id),
                type: new FormControl('', [Validators.required]),
                isBillable: new FormControl(true, [Validators.required]),
                isCommon: new FormControl(true, [Validators.required]),
                description: new FormControl('', [Validators.required])
            });

        }

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
