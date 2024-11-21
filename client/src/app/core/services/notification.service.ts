import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastrService = inject(ToastrService);

  showToast(msg: string, status: boolean) {
    status ? this.toastrService.success(msg) : this.toastrService.error(msg);
  }
}
