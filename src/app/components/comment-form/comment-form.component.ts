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
  private commentString: string = '';

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

  getText($event) {
    this.commentString = $event.target.value;
  }

  /**
   * Submit the comment with the API
   */
  submit() {
    // length checks on text area
    if (this.commentString.length < 1) {
      console.log('Comment length has to be greater than 1');
      this.showToast('Empty Comment - Type more things!!');
      return;
    } else if (this.commentString.length >= 1000) {
      console.log('Comment characters cannot exceed 1000');
      this.showToast('Comment length cannot exceed 1000 characters');
      return;
    }

    const token = this.service.token;
    const response = this.service.postComment(this.rantId, this.commentString, token);
    console.log("comment response: ", response);
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    await toast.present();
  }

}
