import { Component } from '@angular/core';
import { DeferComponent } from '../defer/defer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DeferComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

}
