import { Component, OnInit } from '@angular/core';
import { IonApp, IonMenu, IonSplitPane, IonList, IonContent, IonListHeader, IonItem, IonLabel } from "@ionic/angular/standalone";
import { IonRouterOutlet } from "../../../../node_modules/@ionic/angular/standalone/navigation/router-outlet";
import {  } from 'src/app/app.routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonApp, IonMenu, IonSplitPane, IonList, IonContent, IonListHeader, IonItem, IonLabel, IonRouterOutlet],
})
export class HomePage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
