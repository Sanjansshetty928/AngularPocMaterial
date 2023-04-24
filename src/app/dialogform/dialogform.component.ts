import { FocusKeyManager, FocusMonitor, ListKeyManager } from '@angular/cdk/a11y';
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
constructor(private fb:FormBuilder,public tableService:TableService,private focusMonitor:FocusMonitor){}


ngAfterViewInit(){
  this.keyManager=new ListKeyManager(this.elementChild);
  console.log(this.keyManager);
  this.keyManager.withHorizontalOrientation('ltr');
  this.keyManager.withWrap();
}



keyFunc(event:any){
 
  if(event.code!=='Tab'){
    // console.log('entered if loop');
      this.keyManager.onKeydown(event);
    this.focusMonitor.focusVia(this.keyManager.activeItem.nativeElement,"keyboard");
  }

  else{
    
    this.keyManager.onKeydown(event)
    console.log(event);
    this.keyManager.setNextItemActive();
  }
}







  ngOnInit(){
    console.log('entered ngOninit')
    this.productForm=this.fb.group({
      Product:['',Validators.required],
      productId: ['',Validators.required],
      Module:['',Validators.required], 
      ModuleId: ['',Validators.required],
      Modulename:['',Validators.required], 
      Learnersaccessed:['',Validators.required], 
      Avgtimespent:['',Validators.required], 
      AvgModuleactivitiescompleted:['',Validators.required], 
      Avgofquizattempts:['',Validators.required],
      AvgLastquizscore:['',Validators.required],
      Avgquizscore:['',Validators.required],
      Lowquizscore:['',Validators.required], 
      Highquizscore:['',Validators.required], 

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
