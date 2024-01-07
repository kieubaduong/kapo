import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import SettingData from 'src/models/setting.data';

@Component({
  selector: 'app-finalize-kapo-dialog',
  templateUrl: './finalize-kapo-dialog.component.html',
  styleUrls: ['./finalize-kapo-dialog.component.css']
})
export class FinalizeKapoDialogComponent {
  title = '';
  description = '';

  constructor(
    public dialogRef: MatDialogRef<FinalizeKapoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingData
    ) {
      this.title = data.title;
      this.description = data.description;
    }

    onConfirm(): void {
      let settingData = new SettingData();
      settingData.title = this.title;
      settingData.description = this.description;
      settingData.cover = "hehe";
      this.dialogRef.close(settingData);
    }
}
