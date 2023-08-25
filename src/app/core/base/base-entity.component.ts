import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IEntity } from './base-entity.model';

@Component({
  selector: 'app-base-entity',
  template: '',
})
export class BaseEntityComponent<T extends IEntity>  {

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addItem(item:T){
    this.dataSource.data.push(item);
    this.assignDataSource([item , ...this.dataSource.data]);
    this._applyPagination();
  }

  editItem(item:T){
    const ref = this.dataSource.data.map(x => {
      if(x.id == item.id) return item;
      else return x;
    });
    this.assignDataSource(ref);
    this._applyPagination();
  }

  removeIndex(itemId:number){
    this.assignDataSource(this.dataSource.data.filter(x => x.id != itemId));
    this._applyPagination();
  }

  assignDataSource(items:T[]){
    this.dataSource = new MatTableDataSource(items);
    this._applyPagination();
  }


  //=================================================
  // Private Methods
  //=================================================
  
  private _applyPagination(){
    this.dataSource.paginator = this.paginator;
  }

}