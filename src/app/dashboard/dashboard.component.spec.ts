import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TableService } from '../table.service';

import { DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: TableService;
  let httpMock:HttpClient;
  let fakeServiceMock:any;
  // let dataSource:any;
  // let paginator:any;
  // let sort:any;
  // let data:any;

  const res = {rowdata:[{
    "Product": "GT",
    "productId": "7442",
    "Module": "07",
    "ModuleId": "25474",
    "Modulename": "Module 7-Body Systems: Nervous and Mental Health",
    "Learnersaccessed": "0 of 3",
    "Avgtimespent": "0 hr 0 min",
    "AvgModuleactivitiescompleted": "Not accessed",
    "Avgofquizattempts": "Not accessed",
    "AvgLastquizscore": "Not accessed",
    "Avgquizscore": "Not accessed",
    "Lowquizscore": "Not accessed",
    "Highquizscore": "Not accessed"

  }, {
    "Product": "MT",
    "productId": "7441",
    "Module": "08",
    "ModuleId": "25475",
    "Modulename": "Module 8-Special Senses: Ears and Eyes",
    "Learnersaccessed": "0 of 3",
    "Avgtimespent": "0 hr 0 min",
    "AvgModuleactivitiescompleted": "Not accessed",
    "Avgofquizattempts": "Not accessed",
    "AvgLastquizscore": "Not accessed",
    "Avgquizscore": "Not accessed",
    "Lowquizscore": "Not accessed",
    "Highquizscore": "Not accessed"

  }]};
  const newData={
    "Product": "MT",
    "productId": "7441",
    "Module": "08",
    "ModuleId": "25475",
    "Modulename": "Module 8-Special Senses: Ears and Eyes",
    "Learnersaccessed": "0 of 3",
    "Avgtimespent": "0 hr 0 min",
    "AvgModuleactivitiescompleted": "Not accessed",
    "Avgofquizattempts": "Not accessed",
    "AvgLastquizscore": "Not accessed",
    "Avgquizscore": "Not accessed",
    "Lowquizscore": "Not accessed",
    "Highquizscore": "Not accessed"

  }

  beforeEach(async () => {
    // fakeServiceMock={
     
    // }

    // dataSource = {
    //   filteredData: [1, 2, 3],
    //   _updateChangeSubscription: jest.fn(),
    // };
    // paginator = jest.fn();
    // sort = jest.fn();
    // data = 2;
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,NoopAnimationsModule],
      declarations: [ DashboardComponent ],
      providers:[
        {
          provide:HttpClient
        }
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // to get the service from the root injector
    service = TestBed.inject(TableService);
    //  fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getServiceData set servicedata',()=>{
    
    jest.spyOn(service,'getDataV1').mockReturnValue(of(res));
     fixture.detectChanges();
    component.getData();
     expect(service.getDataV1).toHaveBeenCalled();
    expect(component.dataSource.filteredData).toEqual(res.rowdata);

  })

  it('should pass filtering input to the typescript file', () => {
   
    const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#filterinput');
    element.value = "MT";
    element.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.filterString).toEqual("MT");
  });

  it('should fetch students data from JSON file', () => {
    const dataSpy = jest.spyOn(service, 'getDataV1').mockReturnValue(of(res));
    component.ngOnInit();
    expect(component.students).toEqual(res.rowdata);
    expect(component.dataSource.filteredData.length).toEqual(res.rowdata.length);
    
  });

  it('should create the datasource and set paginator and sort', () => {
    // httpMock = TestBed.inject(HttpClient);
    jest.spyOn(service, 'getDataV1').mockReturnValue(of(res));
    component.getData();
    // fixture.detectChanges();
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.data).toEqual(res.rowdata);
    expect(component.paginator).toBeTruthy();
    expect(component.sort).toBeTruthy();
  });

  // it('should check if filter is working as expected or not ', () => {
  //   component.dataSource = res;
  //   component.datasource = new MatTableDataSource(studentsMock);
  //   fixture.detectChanges();
  //   const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#filterinput')
  //   element.value = "Alice";
  //   element.dispatchEvent(new Event('keyup'));
  //   expect(component.filterString).toEqual("Alice");
  //   expect(component.students.filteredData.length).toEqual(1);
  // });

  it('should get product data on Init', () => {
    
    fixture.detectChanges();
    const getDataSpy = jest.spyOn(component, 'getData');
    component.ngOnInit();
    expect(getDataSpy).toHaveBeenCalled();
    
    
  });

  it('should deleteData from the row',()=>{
    jest.spyOn(service,'getDataV1').mockReturnValue(of(res));
    component.getData();
    component.deleteRow(newData);
    expect(component.dataSource.filteredData).toEqual(res.rowdata);
    
  })
 
 
});

