import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'add-rile',
    templateUrl: 'add-role.component.html'
})
export class AddRoleComponent implements OnInit {
    @Input() public data;
    header: any;

    @Input() dialogClass: string;
    @Input() hideHeader = false;
    @Input() hideFooter = false;
    @Input() containerClick = true;
    public visible = false;
    public visibleAnimate = false;

    constructor(public activeModal: NgbActiveModal) {
    }

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
        document.querySelector('body').classList.add('modal-open');
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        document.querySelector('body').classList.remove('modal-open');
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('modal') && this.containerClick === true) {
            this.hide();
        }
    }

    ngOnInit() {
        console.log(this.data, '============');
        this.header = this.data.header;
        this.visible = true;
        this.visibleAnimate = true;
        document.querySelector('body').classList.add('modal-open');
    }

    hideModal(): void {
        this.hide();
        this.activeModal.close();
    }
}
