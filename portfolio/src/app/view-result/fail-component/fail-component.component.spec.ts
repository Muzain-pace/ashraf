import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailComponentComponent } from './fail-component.component';

describe('FailComponentComponent', () => {
  let component: FailComponentComponent;
  let fixture: ComponentFixture<FailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
