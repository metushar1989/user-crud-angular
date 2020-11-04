import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'ngx-angular8-sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userData;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUserList()
    //Swal.fire('Oops...', 'Something went wrong!', 'error')
    // alert(' In Side ==> List Component')
    // console.log(' In Side ==> List Component')

  }

  async getUserList() {
    await this.userService.getData('user').subscribe(
      response => {
        // console.log(response);
        let resp: any = response;
        if (resp.status) {
          this.toastr.success(`${resp.success.message}`, `Success | Code : ${resp.success.code}`);
          this.userData = resp.success.data
        }
      }, error => {

        console.log(error);
      }
    );
  }

  async deleteUser(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'To delete this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, Cancel it'
    }).then(async (result) => {
      if (result.value) {
        const userData = { id: userId }
        await this.userService.putData('user/delete', userData).subscribe(
          response => {
            // console.log(response);
            let resp: any = response['body'];
            if (resp.status) {
              this.toastr.success(`${resp.success.message}`, `Success | Code : ${resp.success.code}`);
              this.ngOnInit()
            }
          }, error => {
            console.log(error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'User not delete :)',
          'error'
        )
      }
    })



  }

}
