import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  value: string;
  data: any;
  logo = {
    img: './assets/imgs/imdb-logo.png',
    img_alt: 'Logo IMDB'
  }
  link = {
    alt: 'Click to back to home',
    title: 'Home'
  }


  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.value = params.get('value');
      this.refresh();
    });
  }

  refresh() {
    this.appService.getDetails(this.value).subscribe(data => {
      this.data = data;
    })
  }

}
