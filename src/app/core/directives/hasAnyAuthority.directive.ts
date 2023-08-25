import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../authentication/auth-service.service';

@Directive({
  selector: '[hasAnyAuthority]',
  standalone:true
})

export class HasAnyAuthorityDirective implements OnDestroy {
    
  private readonly destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
     private viewContainerRef: ViewContainerRef,
     private auth:AuthService
    ) {}

  @Input()
  set hasAnyAuthority(authority: string | null) {
    this.updateView(authority);
   
  }

  private updateView(authority:string | null): void {
    console.log(authority);
    
    if(!authority) this.createEmbeddedView();
    else if(authority != this.auth.getAuthority){
        this.viewContainerRef.clear();
    }else{
        this.createEmbeddedView();
    }
  }

  private createEmbeddedView(){
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
