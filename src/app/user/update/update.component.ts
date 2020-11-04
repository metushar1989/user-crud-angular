import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'ngx-angular8-sweetalert2'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  userId;
  userData;
  userEditForm: FormGroup;
  logTag = `Update_Component`

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
  ) {

  }



  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParamMap.get('id')
    if (this.userId) {
      this.getUserList(this.userId)
    } else {
      this.toastr.error('Id not found.', 'Error | 404')
    }
  }

  async getUserList(userId: string) {
    try {
      console.log(`${this.logTag} | getUserList | userId => ${userId}`)
      await this.userService.getData(`user?_id=${userId}`).subscribe(
        response => {
          // console.log(response);
          let resp: any = response;
          if (resp.status) {
            this.toastr.success(`${resp.success.message}`, `Success | Code : ${resp.success.code}`);
            this.userData = resp.success.data[0];
            this.createUserForm(this.userData);
          }
        }, error => {

          console.log(error);
        }
      );
    } catch (error) {
      console.log(`${this.logTag} | getUserList | catch error => ${error}`)
    }

  }

  public createUserForm(userInfo): void {
    try {
      console.log(`${this.logTag} | createUserForm | userInfo => ${JSON.stringify(userInfo)}`)
      this.userEditForm = this.fb.group({
        firstName: [userInfo.firstName, [Validators.required]],
        lastName: [userInfo.lastName, [Validators.required]],
        email: [userInfo.email, [Validators.required, Validators.email]],
        mobile: [userInfo.phone, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      });
    } catch (error) {
      console.log(`${this.logTag} | createUserForm | catch error => ${error}`)
    }
  }

  async submitEditForm() {
    try {
      console.log(`${this.logTag} | submitEditForm `)
      if (this.userEditForm.invalid) { return; }
      else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'To Update this user!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, update it!',
          cancelButtonText: 'No, Cancel it'
        }).then(async (result) => {
          if (result.value) {
            const userUpdateInfo = {
              firstName: this.userEditForm.value.firstName,
              lastName: this.userEditForm.value.lastName,
              email: this.userEditForm.value.email,
              phone: this.userEditForm.value.mobile,
              id: this.userId
            }
            await this.userService.putData(`user`, userUpdateInfo).subscribe(
              response => {
                // console.log(response);
                let resp: any = response['body'];
                if (resp.status) {
                  this.toastr.success(`${resp.success.message}`, `Success | Code : ${resp.success.code}`);
                  this.userEditForm.reset();
                  this.router.navigate(['/user/list']);
                }
              }, error => {

                console.log(error);
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'User not update.',
              'error'
            )
          }
        })




      }

    } catch (error) {
      console.log(`${this.logTag} | getUserList | catch error => ${error}`)
    }

  }

  get f() { return this.userEditForm.controls; };

}
