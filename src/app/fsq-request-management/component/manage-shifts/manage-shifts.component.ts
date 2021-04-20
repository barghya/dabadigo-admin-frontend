import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FSQDetails, createShiftService, FsqShift, FSQShiftManagementId, FsqShifts, Breakpoint } from 'src/app/models/fsqManagement';
import { take } from 'rxjs/operators';
import { RegionItem } from 'src/app/models/regionManagement';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { SearchFsqComponent } from '../../container/search-fsq/search-fsq.component';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { GetRp } from 'src/app/models/rentalPoint';
import { rentalPoint } from 'src/app/models/tripManagementModel';
import { RentalPoints } from 'src/app/store/actions/rental_point.action';
import { BreakPoint } from '@angular/flex-layout';
// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3'
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF'
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA'
//   }
// };

@Component({
  selector: 'app-manage-shifts',
  templateUrl: './manage-shifts.component.html',
  styleUrls: ['./manage-shifts.component.scss']
})

export class ManageShiftsComponent implements OnInit {
  SiftManagement: FormGroup;
  dateFilter: FormGroup;
  pastdateFilter: FormGroup;
  start_min: Date;
  end_min: Date;
  createShiftService: createShiftService;
  @Input() fsqDetail$: Observable<FSQDetails[]>;
  @Input() fsqRegion$: Observable<RegionItem[]>; 
  @Output() AddShiftEvent = new EventEmitter<createShiftService>();
  @Output() FsqShiftDelete = new EventEmitter<FsqShift>();
  @Input() AllShift$ : Observable<FsqShifts>;
  @Input() breakPoint$ : Observable<Breakpoint>;
  @Output() ShiftEdit = new EventEmitter();
  @Output() StartShiftEvent = new EventEmitter<FsqShift>();
  @Output() PauseShiftEvent = new EventEmitter<FsqShift>();
  @Output() ResumeShiftEvent = new EventEmitter<FsqShift>();
  @Output() EndShiftEvent = new EventEmitter<FsqShift>();
  @Output() getRegionEvent = new EventEmitter<number>();
  @Output() AssignVehicleEvent = new EventEmitter<any>();
  // @Input() rentalPointList$
  @Input() rentalPointList$?: Observable<GetRp[]>;
  FilterRentalPoint: GetRp[]=[];
  RentalPoint: GetRp[]=[];
  AllFsqShift: FsqShift[];
  defaultBreakPoint:number;
  PastAllFsqShift: FsqShift[];
  displayedColumns: string[] = ['fsq_name','shift_as_name','region_name','rentalpoint_name','fsq_phone','shift_start_datetime','shift_end_datetime','fsq_level_name', 'created_by_name', 'shift_status_name', 'action'];
  PastdisplayedColumns: string[] = ['fsq_name','shift_as_name','region_name','rentalpoint_name','fsq_phone', 'shift_start_datetime','shift_end_datetime','duration','fsq_level_name', 'created_by_name', 'shift_status_name' , 'action'];
  dataSource: MatTableDataSource<FsqShift>;
  dataSource2: MatTableDataSource<FsqShift>;
  @ViewChild("sort",{ static: true }) sort: MatSort;
  @ViewChild("pastsort", { static: true }) pastsort: MatSort;
  @ViewChild("paginator", { static: true }) paginator: MatPaginator;
  @ViewChild("Pastpaginator", { static: true }) Pastpaginator: MatPaginator;
  private subs = new SubSink();
  selectedFsq: FSQDetails;
  Rentalpointmanager:number
  @Output() regionSelected = new EventEmitter<number>();
  show: boolean =false;
  constructor(private fb: FormBuilder,public languageService: LanguageService,public dialog: MatDialog) { }

  ngOnInit() {
    this.start_min= new Date();
    this.SiftManagement = this.fb.group({
      region: ['', [Validators.required]],
      fsq_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      break_time:['',[Ms3Validators.integer]],
      rentalpoint_id: ['',[Validators.required]],
    });

    this.dateFilter = this.fb.group({
      filterStartTime: [null],
      filterEndTime:[null]
    })
    this.pastdateFilter = this.fb.group({
      PastfilterStarttime: [null],
      PastfilterEndTime:[null]
    })
    
    this.subs.add(this.AllShift$.subscribe(
      data=>{
        if(!!data){
          console.log(data);
          this.AllFsqShift= data.current;
          this.PastAllFsqShift= data.past;
          this.dataSource =  new MatTableDataSource(this.AllFsqShift);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource2=  new MatTableDataSource(this.PastAllFsqShift);
          this.dataSource2.sort = this.pastsort;
          this.dataSource2.paginator = this.Pastpaginator;
        }
      }
    ))
    this.subs.add(this.breakPoint$.subscribe(
      data=>{
        if(!!data){
          console.log(data);
          this.defaultBreakPoint = +data.parameter_value;
          console.log(this.defaultBreakPoint);
          this.SiftManagement.controls.break_time.patchValue(+data.parameter_value);
         
      }
    }
    ))
    this.SiftManagement.controls.fsq_id.disable();
    this.SiftManagement.controls.rentalpoint_id.disable();
    this.SiftManagement.controls.break_time.patchValue(this.defaultBreakPoint);

    this.subs.add(this.rentalPointList$.subscribe(
      (data)=>{
        this.RentalPoint= data;
        this.FilterRentalPoint= data;
        console.log("rental point",this.RentalPoint);
      }
    ))

    

  }
  ShowHideUnchecked(checked: boolean){
    if(checked) {
     this.Rentalpointmanager=1;
     this.show = true;
     this.SiftManagement.controls.rentalpoint_id.enable();
    }
    else {
      this.Rentalpointmanager=0;
      this.show = false;
      this.SiftManagement.controls.rentalpoint_id.disable();
    }
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }

  // view: CalendarView = CalendarView.Week;

  // CalendarView = CalendarView;

  // viewDate: Date = new Date();

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     }
  //   },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     }
  //   }
  // ];

  // refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  // activeDayIsOpen: boolean = true;

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map(iEvent => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   // this.modalData = { event, action };
  //   // this.modal.open(this.modalContent, { size: 'lg' });
  //   console.log("click");
    
  // }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter(event => event !== eventToDelete);
  // }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay() {
  //   this.activeDayIsOpen = false;
  // }
  
  // displayFsq(fsqId?: number): string | undefined {
  //   var fsq: FSQDetails = !!fsqId && !!this.fsqDetail$ ? this.showFsq(fsqId) : undefined;
  //   return fsq ? fsq.firstname + " " + fsq.lastname + " (" + fsq.contact_phone + ")" : undefined;
  // }
  // showFsq(fsqId?: number): FSQDetails {
  //   var fsq: FSQDetails = {}
  //   this.fsqDetail$.pipe(take(1)).subscribe(
  //     data => {
  //       fsq = data.find(m => m.admn_user_id == fsqId)
  //     }
  //   );

  //   return fsq;
  // }


  displayRegion(data?: number): string | undefined{
    var region: RegionItem = !!data && this.fsqRegion$ ? this.showRegion(data) : undefined;
    return region ? region.region_name : undefined;
  }
  showRegion(data?: number){
    var region: RegionItem = {}
    this.fsqRegion$.pipe(take(1)).subscribe(
      reg=>{
        region = reg.find(m=> m.region_id == data)
      }
    );
    console.log(region);
    return region;
  }
  displayRentalPoint(data?: number): string | undefined{
    var rentalpoint: GetRp = !!data && this.rentalPointList$ ? this.showRentalPoint(data) : undefined;
    return rentalpoint ? rentalpoint.rentalpoint_name : undefined;
  }
  showRentalPoint(data:number){
    var rentalpoint: GetRp = {}
    this.rentalPointList$.pipe(take(1)).subscribe(
      reg=>{
        rentalpoint = reg.find(m=> m.rentalpoint_id == data)
      }
    );
    console.log(rentalpoint);
    return rentalpoint;
  }
  
  Search() {
    var dialogRef = this.dialog.open(
      SearchFsqComponent,
      {
        width: '90%',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(
      result=> {
        if (result) {
          console.log('selected', result);
          this.selectedFsq = result;
          this.SiftManagement.controls.fsq_id.patchValue(
            this.selectedFsq.firstname + ' ' +
            this.selectedFsq.lastname + ' (' +
            this.selectedFsq.contact_phone + ')'
          )
          this.getRegion(this.selectedFsq.admn_user_id);
        }
        
      }
    )
  }


  AddShift(){
    this.createShiftService={
      shift_start_datetime: this.SiftManagement.controls['start_date'].value,
      region_id: this.SiftManagement.controls['region'].value,
      shift_end_datetime: this.SiftManagement.controls['end_date'].value,
      fsq_id: this.selectedFsq.admn_user_id,
      rentalpoint_id: this.SiftManagement.controls['rentalpoint_id'].value  ? this.SiftManagement.controls.rentalpoint_id.value: null,
      break_time: this.SiftManagement.controls['break_time'].value ? this.SiftManagement.controls.break_time.value: this.defaultBreakPoint,
    }
    this.AddShiftEvent.emit(this.createShiftService);
    this.SiftManagement.patchValue({
      region: ' ',
      fsq_name: ' ',
      start_date: ' ',
      end_date: ' ',
      rentalpoint_id:' ',
    })
    }
  ClearButton(){
    this.SiftManagement.patchValue({
      region: ' ',
      fsq_name: ' ',
      start_date: ' ',
      end_date: ' ',
      rentalpoint_id: ' ',
    })
  }
  
  DateAdjustment(){
    this.start_min= new Date();
    if(!!this.SiftManagement.controls['start_date'].value){
      this.end_min=  new Date (new Date(this.SiftManagement.controls['start_date'].value).getTime() + 60000)
    }else{
      this.end_min=new Date(new Date().getTime() + 60000);
    }
    if(this.SiftManagement.controls['start_date'].value > this.SiftManagement.controls['start_date'].value){
      this.SiftManagement.patchValue({end_date: ''});
    }

    
  }
  filterDate(){
    if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value == null){
      this.dataSource.data=this.AllFsqShift.filter(m=> (new Date(m.shift_start_datetime).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value == null && this.dateFilter.controls['filterEndTime'].value != null){
      this.dataSource.data= this.AllFsqShift.filter(m=>(new Date(m.shift_start_datetime).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime()));
    }else if(this.dateFilter.controls['filterStartTime'].value != null && this.dateFilter.controls['filterEndTime'].value != null){
      this.dataSource.data= this.AllFsqShift.filter(m=> ((new Date(m.shift_start_datetime).getTime()) >= (new Date(this.dateFilter.controls['filterStartTime'].value).getTime()))
     && ((new Date(m.shift_start_datetime).getTime()) <= (new Date(this.dateFilter.controls['filterEndTime'].value).getTime())))
    }else{
      this.dataSource.data= this.AllFsqShift;
    }
  }
  PastfilterDate(){
    console.log('filter');
    console.log(this.pastdateFilter);
    if(this.pastdateFilter.controls['PastfilterStarttime'].value != null && this.pastdateFilter.controls['PastfilterEndTime'].value == null){
      this.dataSource2.data=this.PastAllFsqShift.filter(m=> (new Date(m.shift_start_datetime).getTime()) >= (new Date(this.pastdateFilter.controls['PastfilterStarttime'].value).getTime()));
    }else if(this.pastdateFilter.controls['PastfilterStarttime'].value == null && this.pastdateFilter.controls['PastfilterEndTime'].value != null){
      this.dataSource2.data= this.PastAllFsqShift.filter(m=>(new Date(m.shift_start_datetime).getTime()) <= (new Date(this.pastdateFilter.controls['PastfilterEndTime'].value).getTime()));
    }else if(this.pastdateFilter.controls['PastfilterStarttime'].value != null && this.pastdateFilter.controls['PastfilterEndTime'].value != null){
      this.dataSource2.data= this.PastAllFsqShift.filter(m=> ((new Date(m.shift_start_datetime).getTime()) >= (new Date(this.pastdateFilter.controls['PastfilterStarttime'].value).getTime()))
     && ((new Date(m.shift_start_datetime).getTime()) <= (new Date(this.pastdateFilter.controls['PastfilterEndTime'].value).getTime())))
    }else{
      this.dataSource2.data= this.PastAllFsqShift;
    }
  }
  shiftDelete(FSQ_shift_management_id: number){
    var data: FSQShiftManagementId = {
      fsq_shift_management_id: FSQ_shift_management_id
    }
    this.FsqShiftDelete.emit(data)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  shiftEdit(fsq_shift_management_id: number){
    console.log(fsq_shift_management_id);
    this.ShiftEdit.emit(fsq_shift_management_id)
  }
  AssignVehicle(fsq_shift_management_id: number, path: number){
    var data ={
      id: fsq_shift_management_id,
      path: path
    }
    this.AssignVehicleEvent.emit(data)
  }
  PastapplyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
    console.log("Fired", filterValue);
  }
  getRegion(value: number){
    this.SiftManagement.patchValue({
      region: ' '
    })
   
    this.getRegionEvent.emit(value);
  }
  RegionSelection(region_id: number) {
    this.SiftManagement.controls.rentalpoint_id.patchValue(null);
    if(!!region_id) {
      this.regionSelected.emit(region_id);
     
    }
  
    console.log(region_id);
  }

  // RegionSelection(data){
  //   this.FilterRentalPoint=this.RentalPoint.filter(element => element.region_id==data.value)
  //   console.log(data);
  // }
 
  StartShift(element : FsqShift){
    this.StartShiftEvent.emit(element);
  }
  PauseShift(element : FsqShift){
    this.PauseShiftEvent.emit(element);
  }
  ResumeShift(element : FsqShift){
    this.ResumeShiftEvent.emit(element);
  }
  EndShift(element: FsqShift){
    this.EndShiftEvent.emit(element);  
  }

  
}
