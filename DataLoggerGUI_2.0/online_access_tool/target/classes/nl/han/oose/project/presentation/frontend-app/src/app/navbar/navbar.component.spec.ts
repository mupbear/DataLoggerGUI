import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RoutingService } from '../services/routing.service';
import {ActivatedRoute, convertToParamMap, RouterModule} from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {CarpickerComponent} from "../carpicker/carpicker.component";
import {HttpClientModule} from "@angular/common/http";


describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let routingServiceSpy: jasmine.SpyObj<RoutingService>;
    let activatedRouteStub: Partial<ActivatedRoute>;


    beforeEach(() => {
        routingServiceSpy = jasmine.createSpyObj('RoutingService', ['navigate', 'navigateToLoginPage']);
        activatedRouteStub = {
            params: of({}),
            snapshot: {
                paramMap: convertToParamMap({}),
                url: [{ path: 'some-path' }],
                queryParams: {},
                fragment: '',
                data: {},
                routeConfig: { path: 'some-path' },
                root: {} as ActivatedRoute, // Recursive type reference
            } as any, // Using 'any' to bypass strict typing for some properties
        };

        TestBed.configureTestingModule({
            declarations: [NavbarComponent, CarpickerComponent],
            imports: [RouterModule, HttpClientModule], // Include HttpClientModule here
            providers: [
                { provide: RoutingService, useValue: routingServiceSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub as ActivatedRoute },
            ],
        });

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call navigate method with correct sensorId when a navbar item is clicked', () => {
        spyOn(component, 'navigate');

        const navbarItem = fixture.debugElement.query(By.css('.navbar-item.custom-button'));
        navbarItem.triggerEventHandler('click', null);

        expect(component.navigate).toHaveBeenCalledWith('');
    });

    it('should call logOut method when "Log out" button is clicked', () => {
        spyOn(component, 'logOut');

        const logoutButton = fixture.debugElement.query(By.css('.button.has-text-custom.button-has-shadow'));
        const mockEvent = {
            preventDefault: () => {}
        };
        logoutButton.triggerEventHandler('click', mockEvent);

        // Assert
        expect(component.logOut).toHaveBeenCalled();
    });


    it('should log out user and navigate to login page', fakeAsync(() => {
        spyOn(localStorage, 'removeItem');

        component.logOut();
        tick();

        expect(localStorage.removeItem).toHaveBeenCalledWith('user_id');
        expect(routingServiceSpy.navigateToLoginPage).toHaveBeenCalled();
    }));




});
