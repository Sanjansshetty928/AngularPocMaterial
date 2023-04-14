import { FocusMonitor } from '@angular/cdk/a11y';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../table.service';

import { DialogformComponent } from './dialogform.component';

describe('DialogformComponent', () => {
  let formBuilderMock:FormBuilder;
  let component: DialogformComponent;
  let fixture: ComponentFixture<DialogformComponent>;
  let tableServiceSpy:TableService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule],
      // providers:[
      //   FormBuilder,{
      //     provide:TableService,useValue:tableServiceSpy
      //   },
      // ],
      declarations: [ DialogformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogformComponent);
    component = fixture.componentInstance;
    // component=new DialogformComponent(new FormBuilder())

    tableServiceSpy = TestBed.inject(TableService);
    fixture.detectChanges();
  });
  // beforeEach(()=>{
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form with 13 controls',()=>{
    expect(component.productForm.contains('Product')).toBeTruthy();
    expect(component.productForm.contains('productId')).toBeTruthy();
    expect(component.productForm.contains('Module')).toBeTruthy();
    expect(component.productForm.contains('ModuleId')).toBeTruthy();
    expect(component.productForm.contains('Modulename')).toBeTruthy();
    expect(component.productForm.contains('Learnersaccessed')).toBeTruthy();
    expect(component.productForm.contains('Avgtimespent')).toBeTruthy();
    expect(component.productForm.contains('AvgModuleactivitiescompleted')).toBeTruthy();
    expect(component.productForm.contains('Avgofquizattempts')).toBeTruthy();
    expect(component.productForm.contains('AvgLastquizscore')).toBeTruthy();
    expect(component.productForm.contains('Avgquizscore')).toBeTruthy();
    expect(component.productForm.contains('Lowquizscore')).toBeTruthy();
    expect(component.productForm.contains('Highquizscore')).toBeTruthy();


    
  });
  it('should make the name control required',()=>{
    let control=component.productForm.get('Product');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  })


  it('should add data when form is valid', () => {
    // arrange
    jest.spyOn(component.tableService, 'addData');
    component.productForm.setValue({
      Product: "GT",
            productId: "7442",
            Module: "07",
            ModuleId: "25474",
            Modulename: "Module 7-Body Systems: Nervous and Mental Health",
            Learnersaccessed: "0 of 3",
            Avgtimespent: "0 hr 0 min",
            AvgModuleactivitiescompleted: "Not accessed",
            Avgofquizattempts: "Not accessed",
            AvgLastquizscore: "Not accessed", 
            Avgquizscore: "Not accessed",
            Lowquizscore: "Not accessed",
            Highquizscore: "Not accessed"
   
    });
  
    
    component.onAddDetails();
  
    
    expect(component.productForm.valid).toBe(true);
    expect(component.tableService.addData).toHaveBeenCalled();
  });



});
