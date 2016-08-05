import {Aurelia, autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ApplicationService} from './services/application';

@autoinject
export class App {
    ea: EventAggregator;
    appService: ApplicationService;
    router: Router;

    private showHat: boolean = false;

    constructor(appService: ApplicationService, ea: EventAggregator) {
        this.appService = appService;
        this.ea = ea;

        this.ea.subscribe('router:navigation:success', payload => {
            //this.send('pageview', payload.instruction.fragment, payload.instruction.title || document.title);
        });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Built With Aurelia';

        config.map([
            { 
                route: 'page/:page', 
                moduleId: './home',
                name: 'home',        
                nav: false, 
                title: 'Home'
            },
            {
                route: '', 
                moduleId: './home',
                name: 'home_nopagination',        
                nav: true, 
                title: 'Home'
            },
            { 
                route: 'view/:slug',
                moduleId: './view', 
                name: 'view',          
                nav: false, 
                title: 'View'
            },
            { 
                route: 'about',
                moduleId: './about', 
                name: 'about',    
                nav: true, 
                title: 'About'
            },
            { 
                route: 'submission',
                moduleId: './submission', 
                name: 'submission',    
                nav: true, 
                title: 'Submission'
            }
        ]);

        this.router = router;
    }
}
