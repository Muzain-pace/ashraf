import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopperComponentComponent } from './subtopper-component.component';

describe('SubtopperComponentComponent', () => {
  let component: SubtopperComponentComponent;
  let fixture: ComponentFixture<SubtopperComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtopperComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtopperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
