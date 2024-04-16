import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IStatistics } from 'src/app/api/models/i-statistics';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statistics: IStatistics[];
  listStatistics: IStatistics[];

  constructor(
    public authService: AuthService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.statistics = data['statistics'];
    });

    this.listStatistics = this.statistics;
  }
}
