import { FocusMonitor, ListKeyManager } from '@angular/cdk/a11y';
import { Component, ElementRef, HostListener, QueryList, ViewChild,AfterViewInit,OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from '../table.service';

@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.css']
})
export class DialogformComponent implements OnInit,AfterViewInit {
  keyManager:any;
  @ViewChild('formElement') element!:ElementRef;
  @ViewChildren('formElementChild') elementChild!:QueryList<any>
@HostListener('window:keyup',['$event'])
productForm!:FormGroup;
constructor(private formBuilder:FormBuilder,public tableService:TableService,private focusMonitor:FocusMonitor){}

keyFunc(event:any){
  if(event.code!=='Tab'){
    const activeItem=this.keyManager.activeItem;

    
    if(activeItem){
      this.keyManager.onKeydown(event);
    this.focusMonitor.focusVia(activeItem.nativeElement,"keyboard");
    }
  }
  else{
    this.keyManager.onKeydown(event)
    this.keyManager.setNextItemActive();
  }
}


ngAfterViewInit(){
  this.keyManager=new ListKeyManager(this.elementChild);
  this.keyManager.withHorizontalOrientation('ltr');
  this.keyManager.withWrap();
}


  ngOnInit(){
    this.productForm=this.formBuilder.group({
      Product: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      productId: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      Module:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 
      ModuleId: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      Modulename:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 
      Learnersaccessed:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 
      Avgtimespent:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 
      AvgModuleactivitiescompleted:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 
      Avgofquizattempts:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      AvgLastquizscore:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      Avgquizscore:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      Lowquizscore:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 
      Highquizscore:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]), 

    })
  }

  get frmdata() { return this.productForm.controls};

  onAddDetails(){
    if(this.productForm.valid){
      console.log('called add det')
      console.log(this.frmdata)
      this.tableService.addData({
        "Product": this.frmdata['Product'].value,
        "productId": this.frmdata['productId'].value,
        "Module": this.frmdata['Module'].value,
        "ModuleId": this.frmdata['ModuleId'].value,
        "Modulename": this.frmdata['Modulename'].value,
        "Learnersaccessed": this.frmdata['Learnersaccessed'].value,
        "Avgtimespent": this.frmdata['Avgtimespent'].value,
        "AvgModuleactivitiescompleted": this.frmdata['AvgModuleactivitiescompleted'].value,
        "Avgofquizattempts": this.frmdata['Avgofquizattempts'].value,
        "AvgLastquizscore":this.frmdata['AvgLastquizscore'].value,
        "Avgquizscore": this.frmdata['Avgquizscore'].value,
        "Lowquizscore": this.frmdata['Lowquizscore'].value,
        "Highquizscore": this.frmdata['Highquizscore'].value
      })
    }
  }
 

 
}
