import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'ngx-angular8-sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userCreateForm: FormGroup;
  logTag = `Create_Component`

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
  ) {
    this.initForm()
  }

  initForm() {
    try {
      console.log(`${this.logTag} | initForm `)
      this.userCreateForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      });
    } catch (error) {
      console.log(`${this.logTag} | initForm | catch error => ${error}`)
    }
  }

  ngOnInit(): void {
    console.log(`${this.logTag} | ngOnInit `)
  }

  async submitCreateForm() {
    try {
      console.log(`${this.logTag} | submitCreateForm `)
      if (this.userCreateForm.invalid) { return; }
      else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'To create new user!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, create it!',
          cancelButtonText: 'No, Cancel it'
        }).then(async (result) => {
          if (result.value) {
            debugger
            const userInfo = {
              firstName: this.userCreateForm.value.firstName,
              lastName: this.userCreateForm.value.lastName,
              email: this.userCreateForm.value.email,
              phone: this.userCreateForm.value.mobile,
            }
            await this.userService.postData(`user`, userInfo).subscribe(
              response => {
                // console.log(response);
                let resp: any = response['body'];
                if (resp.status) {
                  this.toastr.success(`${resp.success.message}`, `Success | Code : ${resp.success.code}`);
                  this.userCreateForm.reset();
                  this.router.navigate(['/user/list']);
                }
              }, error => { console.log(error); }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'User not create:)',
              'error'
            )
          }
        })
      }

    } catch (error) {
      console.log(`${this.logTag} | getUserList | catch error => ${error}`)
    }

  }

  get f() { return this.userCreateForm.controls; };

}
