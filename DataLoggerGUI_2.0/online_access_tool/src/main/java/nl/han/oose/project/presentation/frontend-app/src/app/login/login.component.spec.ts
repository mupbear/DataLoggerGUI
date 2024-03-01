import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Login } from "./login.component";
import { DataServicesService } from '../services/data-services.service';
import { RoutingService } from '../services/routing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import {of, throwError} from "rxjs";

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let dataServicesSpy: jasmine.SpyObj<DataServicesService>;
  let routingServiceSpy: jasmine.SpyObj<RoutingService>;

  beforeEach(() => {
    const dataServicesSpyObj = jasmine.createSpyObj('DataServicesService', ['postData']);
    const routingServiceSpyObj = jasmine.createSpyObj('RoutingService', ['navigateToDefaultUrl']);

    TestBed.configureTestingModule({
      declarations: [Login],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: DataServicesService, useValue: dataServicesSpyObj },
        { provide: RoutingService, useValue: routingServiceSpyObj },
        HttpClient,
      ],
    });

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    dataServicesSpy = TestBed.inject(DataServicesService) as jasmine.SpyObj<DataServicesService>;
    routingServiceSpy = TestBed.inject(RoutingService) as jasmine.SpyObj<RoutingService>;

    // Ensure that postData returns an observable
    dataServicesSpy.postData.and.returnValue(of('mockedUserId'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make API call when loginUser is called', fakeAsync(() => {
    // Arrange
    const username = 'testUser';
    const password = 'testPassword';
    component.userLoginData = { username, password };

    // Act
    component.loginUser();
    tick(); // Simulate the passage of time until all pending asynchronous activities complete.

    // Assert
    expect(dataServicesSpy.postData).toHaveBeenCalledWith(component.userLoginData, 'login');
  }));

  it('should update localStorage and navigate on successful login', fakeAsync(() => {
    // Arrange
    const username = 'testUser';
    const password = 'testPassword';
    component.userLoginData = { username, password };

    // Act
    component.loginUser();
    tick();

    // Assert
    expect(dataServicesSpy.postData).toHaveBeenCalledWith(component.userLoginData, 'login');
    expect(localStorage.getItem('user_id')).toEqual('mockedUserId');
    expect(routingServiceSpy.navigateToDefaultUrl).toHaveBeenCalled();
  }));

  it('should handle unauthorized login', fakeAsync(() => {
    // Arrange
    const username = 'testUser';
    const password = 'testPassword';
    component.userLoginData = { username, password };
    dataServicesSpy.postData.and.returnValue(throwError({ status: 401 }));

    // Act
    component.loginUser();
    tick();

    // Assert
    expect(dataServicesSpy.postData).toHaveBeenCalledWith(component.userLoginData, 'login');
    expect(component.isUnauthorized).toBe(true);
    expect(component.errorMsg).toEqual('The provided username and password combination is invalid.');
  }));

  it('should handle user not found', fakeAsync(() => {
    // Arrange
    const username = 'testUser';
    const password = 'testPassword';
    component.userLoginData = { username, password };
    dataServicesSpy.postData.and.returnValue(throwError({ status: 404 }));

    // Act
    component.loginUser();
    tick();

    // Assert
    expect(dataServicesSpy.postData).toHaveBeenCalledWith(component.userLoginData, 'login');
    expect(component.isUnauthorized).toBe(true);
    expect(component.errorMsg).toEqual('No user found with the provided username.');
  }));

  


  // Additional test cases go here
});
