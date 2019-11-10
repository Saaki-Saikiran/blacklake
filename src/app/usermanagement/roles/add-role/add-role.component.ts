import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { RolesService } from '../roles.service';
import { Role } from '../roles';

@Component({
    selector: 'add-role',
    templateUrl: 'add-role.component.html'
})
export class AddRoleComponent implements OnInit {
    @Input() public data;

    userForm: FormGroup;
    formHeader: string;
    buttonType: string;
    role: Role;
    isEditing: boolean;
    submitted = false;
    menus: any;
    menuNameItems: any[];
    loading: boolean;

    constructor(public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private roleService: RolesService) {
    }

    ngOnInit() {
        console.log(this.data, 'role-edit');
        this.menus = [
            "User Entry",
            "Meter Types",
            "Dept Meters",
            "Meters",
            "Tenants",
            "Floors",
            "DGs",
            "Map Meters Tenants"
        ];
        this.menuNameItems = [];

        if (this.menus) {
            var arrkeys = Object.values(this.menus);
            arrkeys.map((key, value) => {
                this.menuNameItems.push({
                    "slug": key,
                    "link": true,
                    "add": true,
                    "edit": true,
                    "delete": true
                });
            });
            // this.menus.map((key, value) => {
            //     console.log(key, value);
            //     this.menuNameItems.push({
            //             "slug": key,
            //             "link": false,
            //             "add": false,
            //             "edit": false,
            //             "delete": false
            //     });
            // });
        }

        if (this.data.data._id === undefined) {
            this.formHeader = 'Add Role Details';
            this.buttonType = 'Add';
            this.isEditing = false;

            this.userForm = this.formBuilder.group({
                name: new FormControl('', [Validators.required, Validators.minLength(3)]),
                isActive: new FormControl(true, [Validators.required]),
                menus: this.formBuilder.group({
                    options: this.formBuilder.array([]) // create empty form array   
                }),
                //     // email: new FormControl('', [Validators.required, Validators.email]),
                //     // phone: new FormControl('', [Validators.required]),
                //     // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                //     // confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
                //     // username: new FormControl('', [Validators.required]),
                //     // address: new FormControl('', [Validators.required]),
            });
            console.log(this.userForm.value);
            this.patch();
        } else {
            this.formHeader = 'Edit Role Details';
            this.buttonType = 'Update';
            this.isEditing = true;

            this.userForm = this.formBuilder.group({
                _id: new FormControl(this.data.data._id),
                name: new FormControl(this.data.data.name, [Validators.required, Validators.minLength(3)]),
                isActive: new FormControl(this.data.data.isActive, [Validators.required]),
                menus: this.formBuilder.group({
                    options: this.formBuilder.array([]) // create empty form array   
                }),
                //     // email: new FormControl(this.data.data.email, [Validators.required, Validators.email]),
                //     // phone: new FormControl(this.data.phone, [Validators.required]),
                //     // password: new FormControl(this.data.password, [Validators.required, Validators.minLength(6)]),
                //     // confirmPassword: new FormControl(this.data.confirmPassword, [Validators.required, Validators.minLength(6)]),
                //     // username: new FormControl(this.data.username, [Validators.required]),
                //     // address: new FormControl(this.data.address, [Validators.required]),
            });
            this.editPatch();
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
        const user = { ...this.role, ...this.userForm.value };

        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        if (this.data.data._id === undefined) {
            user.role = 'Admin';
            this.roleService.createRole(user).subscribe(
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

            this.roleService.updateRole(user).subscribe(
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


    patch() {
        const control = <FormArray>this.userForm.get('menus.options');
        this.menuNameItems.forEach(x => {
            control.push(
                this.formBuilder.group({
                    add: x.add,
                    delete: x.delete,
                    link: x.link,
                    update: x.edit,
                    slug: x.slug
                })
            )
        });
    }


    editPatch() {
        console.log(this.data.data.menus.options);
        let data = this.data.data.menus.options;
        // let data = [
        //     { 0: { add: true, delete: false, link: false, update: false, slug: "User Entry" } },
        //     {
        //         1: { add: false, delete: false, link: true, update: false, slug: "Meter Types" }
        //     }, {
        //         2: { add: false, delete: false, link: false, update: true, slug: "Dept Meters" }
        //     }, {
        //         3: { add: false, delete: true, link: false, update: false, slug: "Meters" }
        //     }, {
        //         4: { add: true, delete: false, link: false, update: false, slug: "Tenants" }
        //     }, {
        //         5: { add: false, delete: false, link: true, update: false, slug: "Floors" }
        //     }, {
        //         6: { add: false, delete: false, link: false, update: true, slug: "DGs" }
        //     }, {
        //         7: { add: false, delete: true, link: false, update: false, slug: "Map Meters Tenants" }
        //     }];
        const control = <FormArray>this.userForm.get('menus.options');
        data.forEach((x, value) => {
            console.log(x.add, value);
            control.push(
                this.formBuilder.group({
                    add: x.add,
                    delete: x.delete,
                    link: x.link,
                    update: x.update,
                    slug: x.slug
                })
            )
        });

    }

    onReset() {
        this.submitted = false;
        this.userForm.reset();
    }

    hideModal(): void {
        this.activeModal.close();
    }

    submit() {
        console.log(this.menuNameItems, this.userForm.value);
    }

}
