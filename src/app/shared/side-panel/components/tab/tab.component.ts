import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TabInfo } from '@shared/side-panel/models/tab-info';

@Component({
  selector: 'side-panel-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() data: TabInfo | null = null;

  @ViewChild('contentHost', { static: true, read: ViewContainerRef }) contentHost: ViewContainerRef | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    if (this.data === null) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    this.contentHost?.clear();
    const componentRef = this.contentHost?.createComponent(componentFactory);
  }

}
