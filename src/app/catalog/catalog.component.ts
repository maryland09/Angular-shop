import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../types/product";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

export enum CategoryEnum {
  all = 'all',
  laptop = 'laptop',
  smartphone = 'smartphone',
  smartspeaker = 'smartspeaker',
  smartwatch = 'smartwatch',
  tablet = 'tablet'
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnChanges, DoCheck {

  // public allProducts!: Array<Product>
  public products!: Array<Product>
  public category: CategoryEnum = CategoryEnum.all
  public categoryEnum = CategoryEnum

  constructor(private productService: ProductService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {

    console.log('constructor')
    // productService.getAllProducts().subscribe(data => this.allProducts = data.items)

    // this.products = this.productService.getProductsByCategory('all')

    // if(!this.route.snapshot.queryParams['category']){
    //   this.setQueryParamCategory(CategoryEnum.all)
    // }




  }

  ngOnChanges(changes: SimpleChanges) {
    // this.products = this.productService.getProductsByCategory(this.category)

  }

  ngDoCheck() {

    this.products = this.productService.getProductsByCategory(this.category)

    if (this.route.snapshot.queryParams['category']) {
      console.log('yes')
      this.category = this.route.snapshot.queryParams['category']
      this.products = this.productService.getProductsByCategory(this.category)
      // console.log(productService.getProductsByCategory(this.category))
      console.log(this.route.snapshot.queryParams['category'])
    } else {
      console.log('no')
      this.setQueryParamCategory(CategoryEnum.all)
      this.products = this.productService.getProductsByCategory(this.category)

    }

  }

  ngOnInit(): void {


  }

  changeCategory(category: CategoryEnum) {
    this.category = category
    this.setQueryParamCategory(category)
    console.log(this.route.snapshot.queryParams['category'])
    console.log(this.productService.getProductsByCategory(category))
    this.products = this.productService.getProductsByCategory(category)
  }


  setQueryParamCategory(categoryParam: string) {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {category: categoryParam}
    })
  }


}
