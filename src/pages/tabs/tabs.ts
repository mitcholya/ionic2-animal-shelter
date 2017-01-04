import {Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Events, Tabs } from 'ionic-angular';

import {ThreadsPage} from '../threads/threads';
import {ProfilePage} from '../profile/profile';
import {AboutPage} from '../about/about';
import { PetsPage } from '../pets/pets';
import { PaymentPage } from '../payment/payment';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('forumTabs') tabRef: Tabs;

    public threadsPage: any;
    public profilePage: any;
    public aboutPage: any;
    public petsPage: any;
    public paymentPage: any;

    public newThreads: string = '';
    public selectedTab: number = -1;

    constructor(public navCtrl: NavController,
        public authService: AuthService,
        public events: Events) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.threadsPage = ThreadsPage;
        this.profilePage = ProfilePage;
        this.aboutPage = AboutPage;
        this.petsPage = PetsPage;
        this.paymentPage = PaymentPage;
    }

    // ngOnInit() {
    //     this.startListening();
    // }

    ionViewDidLoad() {
        this.startListening();
    }

    startListening() {
        //var self = this;

        this.events.subscribe('thread:created', (threadData) => {
            if (this.newThreads === '') {
                this.newThreads = '1';
            } else {
                this.newThreads = (+this.newThreads + 1).toString();
            }
        });

        this.events.subscribe('threads:viewed', (threadData) => {
            this.newThreads = '';
        });
    }

    clicked() {
        //var self = this;      

        if (this.newThreads !== '') {
            this.events.publish('threads:add');
            this.newThreads = '';
        }
    }
}