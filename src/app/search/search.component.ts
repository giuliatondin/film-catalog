import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  searchFormControl = new FormControl();
  value: any;
  // msg = '';
  isDone = false;

  logo = {
    img: './assets/imgs/imdb-logo.png',
    img_alt: 'Logo IMDB'
  }
  input = {
    placeholder: 'Digite o nome do filme',
    type: 'text',
    autocomplete: 'off'
  }
  welcome = {
    img: './assets/imgs/welcome-img.svg',
    img_alt: 'Imagem de boas vindas'
  }

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.searchFormControl.valueChanges
      //.pipe(debounceTime(200))
      .subscribe(newValue => {
      this.isDone = false;
      this.value = newValue;
      // this.refresh();
    }
    );
  }

  refresh() {
    this.appService.getMovies(this.value).subscribe(data => {
      if(data.Response !== 'False'){
        const items = [];
        for(const key in data){
          if(data.hasOwnProperty(key)){
            items.push(data[key]);
          }
        }
        // this.msg = `Mostrando resultados para ${this.value}...`;
        this.movies = items[0];
        this.isDone = true;
      } else {
        this.isDone = true;
        this.movies.length = null;
        // if(this.value === ''){
        //   this.msg = `Por favor, insira o nome de algum filme`;
        // } else {
        //   this.msg = `Nenhum filme relacionado foi encontrado`;
        // }
      }
    })
  }

}
