import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, filter, fromEvent, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
  standalone:true,
  imports :[MatFormFieldModule , MatInputModule]
})
export class SearchTextComponent implements AfterViewInit , OnDestroy{

  @ViewChild('input') input!: ElementRef;

  private readonly destroy$ = new Subject<void>();


  @Output() textValue = new EventEmitter();


  ngAfterViewInit() {
    fromEvent(this.input.nativeElement,'keyup')
       .pipe(
        takeUntil(this.destroy$),
         filter(Boolean),
         debounceTime(500),
         distinctUntilChanged(),
         tap(() => {
          this.textValue.emit(this.input.nativeElement.value);
         })
      )
     .subscribe();
 }

 ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

}
