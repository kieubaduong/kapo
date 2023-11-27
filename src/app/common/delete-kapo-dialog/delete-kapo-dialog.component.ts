import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-kapo-dialog',
  templateUrl: './delete-kapo-dialog.component.html',
  styleUrls: ['./delete-kapo-dialog.component.css']
})
export class DeleteKapoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public typeQuestion: string) { }

}
