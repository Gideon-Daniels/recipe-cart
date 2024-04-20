import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RecipeService} from "../recipe.service";

fdescribe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  class FakeRecipeService{
    constructor() {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeEditComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: RecipeService, useClass: FakeRecipeService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
