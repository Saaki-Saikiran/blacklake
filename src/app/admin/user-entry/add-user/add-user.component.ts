import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../user-entry.service';
import { User } from '../user';

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html'
})
export class AddUserComponent implements OnInit {
    @Input() public data;
    

    userForm: FormGroup;
    formHeader: string;
    buttonType: string;
    user: User;
    isEditing: boolean;
    submitted = false;
    loading: boolean;

    constructor(public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private userService: UsersService) {
    }

    ngOnInit() {
        console.log(this.data, '============');

        if (this.data.data._id === undefined) {
            this.formHeader = 'Add User Details';
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
            this.formHeader = 'Edit User Details';
            this.buttonType = 'Update';
            this.isEditing = true;

            this.userForm = this.formBuilder.group({
                _id: new FormControl(this.data.data._id),
                name: new FormControl(this.data.data.name, [Validators.required, Validators.minLength(3)]),
                email: new FormControl(this.data.data.email, [Validators.required, Validators.email]),
                phone: new FormControl(this.data.data.phone, [Validators.required]),
                password: new FormControl(this.data.data.password, [Validators.required, Validators.minLength(6)]),
                confirmPassword: new FormControl(this.data.data.confirmPassword, [Validators.required, Validators.minLength(6)]),
                username: new FormControl(this.data.data.username, [Validators.required]),
                address: new FormControl(this.data.data.address, [Validators.required]),
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
        const user = { ...this.user, ...this.userForm.value };

        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        if (this.data.data._id === undefined) {
            user.role = 'Admin';
            this.userService.createUser(user).subscribe(
                data => {
                    if (data['success'] === true) {
                        this.activeModal.close();
                        // this.router.navigate(['/dashboard/analytics']);
                    } else {
                        alert('Invalid User Creation');
                        this.loading = false;
                    }
                },
                error => {
                    alert(error);
                    this.loading = false;
                });
        } else {

            this.userService.updateUser(user).subscribe(
                data => {
                    if (data['success'] === true) {
                        this.activeModal.close();
                        // this.router.navigate(['/dashboard/analytics']);
                    } else {
                        alert('Invalid User Creation');
                        this.loading = false;
                    }
                },
                error => {
                    alert(error);
                    this.loading = false;
                });

        }
    }

    onReset() {
        this.submitted = false;
        this.userForm.reset();
    }

    hideModal(): void {
        this.activeModal.close();
    }

}
