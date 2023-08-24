import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
  standalone:true,
  imports :[MatFormFieldModule , MatInputModule]
})
export class SearchTextComponent implements AfterViewInit , OnDestroy{

  @ViewChild('input') input!: ElementRef;

  subscription:Subscription = new Subscription();


  @Output() textValue = new EventEmitter();


  ngAfterViewInit() {
    const sub = fromEvent(this.input.nativeElement,'keyup')
       .pipe(
         filter(Boolean),
         debounceTime(500),
         distinctUntilChanged(),
         tap(() => {
          this.textValue.emit(this.input.nativeElement.value);
         })
      )
     .subscribe();
     this.subscription.add(sub);
 }

 ngOnDestroy(): void {
     this.subscription.unsubscribe();
 }

}
