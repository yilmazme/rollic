import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rollic-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goListPage() {
    this.router.navigate(['/games']);
  }
}
