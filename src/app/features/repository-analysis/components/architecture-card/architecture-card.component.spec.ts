import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchitectureCardComponent } from './architecture-card.component';

describe('ArchitectureCardComponent', () => {
  let component: ArchitectureCardComponent;
  let fixture: ComponentFixture<ArchitectureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
