import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categorires: Category[] = [];
  busy: Subscription;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.busy = this.categoryService.getAll().subscribe(
      categories => this.categorires = categories,
      error => alert('Error ao carregar a lista')
    );
  }

}
