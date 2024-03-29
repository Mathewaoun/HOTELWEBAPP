import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinEmployeeComponent } from './loggedin-employee.component';

describe('LoggedinEmployeeComponent', () => {
  let component: LoggedinEmployeeComponent;
  let fixture: ComponentFixture<LoggedinEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedinEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoggedinEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
