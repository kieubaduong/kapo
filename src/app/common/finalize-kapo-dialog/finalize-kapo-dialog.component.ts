import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-finalize-kapo-dialog',
  templateUrl: './finalize-kapo-dialog.component.html',
  styleUrls: ['./finalize-kapo-dialog.component.css']
})
export class FinalizeKapoDialogComponent {
  title = '';
  description = '';

  constructor(public dialogRef: MatDialogRef<FinalizeKapoDialogComponent>) {}
}
