import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;
  let httpClientSpy: any;
  const res = [{
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

  }]

  const newDataMock = {
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

  beforeEach(() => {
    httpClientSpy = {
      //this will create a mock for get file
      get: jest.fn()
    }
    service = new TableService(httpClientSpy)
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getData', () => {
    
    const base_url = 'assets/data.json';
    //mock any function here mocking http.get
    // spyOn method is used to spy on a method call on an object
    //mockReturnValue-To mock a function's return value in Jest
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getDataV1();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(base_url);
  })

  it('should test adding new data',()=>{
    service.addData(newDataMock);
    expect(service.newDataEvent).toEqual(newDataMock);
    
  })
});
