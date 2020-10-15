import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DevRantService } from 'src/services/devrant.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  @Input() rantId: number;
  

  constructor(
    private service: DevRantService,
    private modalController: ModalController,
    private toastController: ToastController,
  ) {
  }

  ngOnInit() { }
  
  async dismiss() {
    await this.modalController.dismiss();
  }


  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    await toast.present();
  }

}
