import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/features/Auth/models/user.model';
import { AuthService } from 'src/app/features/Auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user?: user;

  constructor(private authService: AuthService,
    private router:Router){

  }

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) =>{
        this.user= response;
      }
    });

    this.user =this.authService.getuser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
