import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterService {
    constructor(private router: Router, private dialog: MatDialog) {}

    navigateUrl(url: string) {
        this.dialog.closeAll();
        this.router.navigateByUrl(url);
    }
}
