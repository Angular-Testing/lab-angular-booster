import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../core/space.service';
import { Launch } from '../models/launch';
import { QueryParams } from '../models/query-params';

@Component({
  selector: 'ab-search',
  template: `
    <section>
      <form>
        <legend>
          Searching {{ queryParams.limit }} launches related to
          {{ queryParams.searchTerm }}
        </legend>

        <fieldset>
          <div>
            <label for="searchTerm">Search term</label>
            <input
              id="searchTerm"
              name="searchTerm"
              type="text"
              [(ngModel)]="queryParams.searchTerm"
            />
          </div>
          <div>
            <label for="numberOfLaunches">Number of launches</label>
            <input
              id="numberOfLaunches"
              name="numberOfLaunches"
              type="number"
              [(ngModel)]="queryParams.limit"
            />
          </div>
        </fieldset>
        <button type="submit" (click)="getSpaceData()">🚀 Go !</button>
      </form>
    </section>
    <section *ngIf="launches.length > 0">
      <header>
        <h2>Found {{ launches.length }} launches</h2>
      </header>
      <ab-launch-card *ngFor="let launch of launches" [launch]="launch"> </ab-launch-card>
    </section>
    <ab-waiting-card [launches]="launches"> </ab-waiting-card>
    <ab-problem-card [theProblem]="theProblem"> </ab-problem-card>
  `,
  styles: [],
})
export class SearchComponent implements OnInit {
  queryParams: QueryParams = {
    limit: 10,
    searchTerm: 'Challenger',
  };
  launches: Launch[] = [];
  theProblem = '';

  constructor(private srv: SpaceService) {}

  getSpaceData(): void {
    this.srv.getSearchedLaunches$(this.queryParams).subscribe({
      next: data => (this.launches = data),
      error: err => (this.theProblem = err.error.detail),
    });
  }

  ngOnInit(): void {
    this.getSpaceData();
  }
}
