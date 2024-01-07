import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import SettingData from 'src/models/setting.data';
import { TemplateService } from 'src/service/template.service';
import { NotificationService } from '../services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.css'],
})
export class SettingDialogComponent {
  @Output() settingDataUpdated = new EventEmitter<SettingData>();
  data: SettingData = new SettingData();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: SettingData,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SettingDialogComponent>
  ) {
    this.data = Object.assign({}, data);
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.data.cover = e.target.result as string;
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onDone() {
    let cover = this.data.cover;
    this.data.cover = 'string';

    if (this.data.templateId === -1) {
      // Call create API
      TemplateService.createTemplate(this.data).subscribe(
        (response) => {
          if (response.success) {
            this.data.templateId = response.data?.id ?? 0;
            this.notificationService.showSuccess('Template created successfully');
            this.dialogRef.close(this.data);
          } else {
            this.notificationService.showError(
              'Error occurred while creating template'
            );
          }
        }
      );
    } else {
      // Call update API
      TemplateService.updateTemplate(this.data.templateId.toString(), this.data).subscribe(
        (response) => {
          if (response.success) {
            this.notificationService.showSuccess('Template updated successfully');
            this.dialogRef.close(this.data);
          } else {
            this.notificationService.showError(
              'Error occurred while updating template'
            );
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          this.notificationService.showError(
            'Error occurred while updating template'
          );
        }
      );
    }

    this.data.cover = cover;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
