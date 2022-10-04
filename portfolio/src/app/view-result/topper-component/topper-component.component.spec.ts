import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopperComponentComponent } from './topper-component.component';

describe('TopperComponentComponent', () => {
  let component: TopperComponentComponent;
  let fixture: ComponentFixture<TopperComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopperComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
