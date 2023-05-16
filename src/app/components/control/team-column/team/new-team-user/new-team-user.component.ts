import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'new-team-user-component',
    templateUrl: './new-team-user.component.html',
    styleUrls: ['./new-team-user.component.scss'],
})
export class NewTeamUserComponent {
    myControl = new FormControl('');
    filteredObjects!: Observable<string[]>;
    newUsername: string = '';

    @Input() users: string[] = [];

    @Output() deleteNewEvent: EventEmitter<void> = new EventEmitter();
    @Output() addNewEvent: EventEmitter<string> = new EventEmitter();

    ngOnInit() {
        this.filteredObjects = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.users.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }

    addNew() {
        this.addNewEvent.emit(this.newUsername);
    }

    deleteNew() {
        this.deleteNewEvent.emit();
    }
}
