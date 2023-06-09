import { AfterViewInit, Component, ElementRef, OnChanges, OnInit,ViewChild } from '@angular/core';
import { TableService } from '../table.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogformComponent } from '../dialogform/dialogform.component';

export interface detailedData {
  Product: string;
  productId: string;
  Module: string;
  ModuleId: string;
  Modulename: string;
  Learnersaccessed: string;
  Avgtimespent: string;
  AvgModuleactivitiescompleted: string;
  Avgofquizattempts: string;
  AvgLastquizscore: string;
  Avgquizscore: string;
  Lowquizscore: string;
  Highquizscore: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  //decorator used to obtain a refernce to a child component or directive within a parent component
  @ViewChild(MatPaginator) paginator!:MatPaginator//reference the MatPaginator component from angular material
  @ViewChild(MatSort, { static: true }) sort!:MatSort
  students:detailedData[]=[];
  order:boolean=false;
  filterString:string='';
  // @ViewChild('keywordsInput') keywordsInput: any;
  // @ViewChild('keywordsInput') keywordsInput!:ElementRef<HTMLInputElement>;

  displayedColumns:string[]=['Product', 'productId',
  'Module',
  'ModuleId',
  'Modulename',
  'Learnersaccessed',
  'Avgtimespent',
  'AvgModuleactivitiescompleted',
  'Avgofquizattempts',
  'AvgLastquizscore',
  'Avgquizscore',
  'Lowquizscore',
  'Highquizscore',
  'action'
]
  // dataSource = this.students;
  dataSource!:MatTableDataSource<any>
   
  sortedData!:detailedData[];
//   @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

// ngAfterViewInit(): void {
//     this.userNameInput.nativeElement.focus();
// }

constructor(private http:HttpClient,public dialog:MatDialog, public tableService: TableService) {}

  // this.sortedData=this.students.slice();
 

openDialog(){
  const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
  let dialogRef=this.dialog.open(DialogformComponent,{
    disableClose:true,
  });
  dialogRef.afterClosed().subscribe(result=>{
    // if(result){
    //   this.dataSource.data.push(result);
    console.log(typeof( result))
    if(result == 'true'){
    // }
    console.log(this.tableService.newDataEvent);
    //  this.students.push(this.tableService.newDataEvent);
     this.dataSource.filteredData.push(this.tableService.newDataEvent);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    console.log(this.students);
    console.log(`Dialog result :${result}`);}
  })
}




deleteRow(data: any) {
  var rowid = this.students.indexOf(data)
  
    if (rowid > -1) {
      
    if (confirm("Are you sure you want to delete this item?")) {
     
    this.students.splice(rowid, 1);

    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }else {
    console.log('failed')
  }
}
}

  // private base_url:string='assets/data.json';
  getData(){
    console.log('entered getData')
    this.tableService.getDataV1().subscribe(data=>{
      console.log("hiu",data.rowdata);
      this.dataSource = new MatTableDataSource(data.rowdata);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      this.students=data.rowdata;
      
    })
  }



  

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getData();
      // console.log(data);
      // this.posts=data;
      // this.dataSource=new MatTableDataSource(this.posts)
    
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterString=filterValue;
    //trim removes the extra white space and does not make changes in original string
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //as unknown means variable type is not known and can have any value
    this.students=this.dataSource as unknown as detailedData[];
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

sortData(sort: Sort) {
  const data = this.students.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'Modulename': return compareModulename(a.Modulename, b.Modulename, isAsc);
      case 'ModuleId':return compare(a.ModuleId,b.ModuleId,isAsc);
      case 'Product':return compare(a.Product,b.Product,isAsc);
      case 'productId':return compare(a.productId,b.productId,isAsc);
      case 'Module':return compare(a.Module,b.Module,isAsc);
      // case 'age': return compare(a.age, b.age, isAsc);
      default: return 0;
    }
  });
  this.dataSource=new MatTableDataSource(this.sortedData);
}


}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareModulename(a: string, b: string, isAsc: boolean) {


  if (isAsc) {
    a = a.substring(a.indexOf(' ') + 1, a.indexOf('-'))
    b = b.substring(b.indexOf(' ') + 1, b.indexOf('-'))
   

    return +a - (+b);
  }
  else {
    a = a.substring(a.indexOf(' ') + 1, a.indexOf('-'))
    b = b.substring(b.indexOf(' ') + 1, b.indexOf('-'))
    

    return +b - (+a);
  }
}


