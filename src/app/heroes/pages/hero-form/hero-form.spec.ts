import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form';
import { HeroService } from '../../services/hero';
import { LoadingService } from '../../../core/services/loading';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fakeAsync, tick } from '@angular/core/testing';

describe('HeroFormComponent (create mode)', () => {
  let fixture: ComponentFixture<HeroFormComponent>;
  let component: HeroFormComponent;
  let heroServiceMock: jasmine.SpyObj<HeroService>;
  let routerMock: jasmine.SpyObj<Router>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    heroServiceMock = jasmine.createSpyObj('HeroService', ['getById', 'add', 'update']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HeroFormComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        {
          provide: LoadingService,
          useValue: { show: () => { }, hide: () => { } }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark name as required', () => {
    const control = component.form.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('BATMAN');
    expect(control?.valid).toBeTrue();
  });

  it('should navigate to /heroes when cancel is clicked', () => {
    component.onCancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should call add() and navigate when submitting a valid new hero', fakeAsync(() => {
    component.form.setValue({ name: 'Flash', description: 'Velocidad' });

    component.onSubmit();
    fixture.detectChanges();
    tick();

    expect(heroServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'Flash', description: 'Velocidad' })
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  }));

  it('should not submit if form is invalid', () => {
    component.form.setValue({ name: '', description: 'Sin nombre' });

    component.onSubmit();

    expect(heroServiceMock.add).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(snackBarMock.open).not.toHaveBeenCalled();
  });
});

describe('HeroFormComponent (id inválido)', () => {
  let fixture: ComponentFixture<HeroFormComponent>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const heroServiceMock = jasmine.createSpyObj('HeroService', ['getById']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HeroFormComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: { open: () => { } } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '999'
              }
            }
          }
        }
      ]
    });

    heroServiceMock.getById.and.returnValue(undefined);

    fixture = TestBed.createComponent(HeroFormComponent);
    fixture.detectChanges();
  });

  it('should redirect to /heroes if hero not found', () => {
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});

describe('HeroFormComponent (edit mode)', () => {
  let fixture: ComponentFixture<HeroFormComponent>;
  let component: HeroFormComponent;
  let heroServiceMock: jasmine.SpyObj<HeroService>;
  let routerMock: jasmine.SpyObj<Router>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    heroServiceMock = jasmine.createSpyObj('HeroService', ['getById', 'add', 'update']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HeroFormComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        {
          provide: LoadingService,
          useValue: { show: () => { }, hide: () => { } }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '2'
              }
            }
          }
        }
      ]
    });

    heroServiceMock.getById.and.returnValue({
      id: 2,
      name: 'Green Lantern',
      description: 'Portador del anillo'
    });

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load hero and switch to edit mode if id is present', () => {
    expect(component.editMode()).toBeTrue();
    expect(component.form.value.name).toBe('Green Lantern');
    expect(component.form.value.description).toBe('Portador del anillo');
  });

  it('should call update() if in edit mode', fakeAsync(() => {
    component.form.setValue({ name: 'Green Lantern', description: 'Portador del anillo' });
    component.onSubmit();

    fixture.detectChanges();
    tick();

    expect(heroServiceMock.update).toHaveBeenCalledWith(
      jasmine.objectContaining({ id: 2, name: 'Green Lantern' })
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  }));
});
