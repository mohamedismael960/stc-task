import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../authentication/auth-service.service';

@Directive({
  selector: '[hasAnyAuthority]',
  standalone:true
})

export class HasAnyAuthorityDirective  {
    
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

}
