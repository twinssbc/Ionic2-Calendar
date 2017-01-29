import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app/app.component';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';
import { TabsPage } from './pages/tabs';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage
    ],
    imports: [
        NgCalendarModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage
    ],
    providers: [
        { provide: LOCALE_ID, useValue: undefined }
    ]
})
export class AppModule {}
