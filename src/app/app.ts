import { loadRemoteModule } from '@angular-architects/native-federation';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal, viewChild, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App implements OnInit, AfterViewInit {
  
    protected readonly title = signal('movieHost');
   @ViewChild('containerOne', { read: ViewContainerRef }) container1!: ViewContainerRef;
  @ViewChild('containerTwo', { read: ViewContainerRef }) container2!: ViewContainerRef;


  constructor(private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
  }

    async ngAfterViewInit() {
    try {
      // Load MFE 1
      const module1 = await loadRemoteModule({
        remoteEntry: 'http://localhost:4200/remoteEntry.json',
        exposedModule: './Component4200'
      });
      this.container1.createComponent(module1.App);

      // Load MFE 2
      const module2 = await loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.json',
        exposedModule: './Component4202'
      });
      this.container2.createComponent(module2.App);

      // CRITICAL: Trigger change detection manually because 
      // async loading happens outside the standard cycle
      this.cdr.detectChanges();

    } catch (err: any) {
      console.error('Federation Error:', err);
    }
  }
  }

  

  


  // async ngOnInit() {

  //   try {
  //       const module = await loadRemoteModule({
  //     remoteEntry:'http://localhost:4200/remoteEntry.json',
  //     exposedModule:'./Component4200'
  //   })

  //     const componentRef = this.container1.createComponent(module.App);

  //   const module2 = await loadRemoteModule({
  //     remoteEntry:'http://localhost:4202/remoteEntry.json',
  //     exposedModule:'./Component4202'
  //   })  

  //     const componentReftwo = this.container2.createComponent(module2.App);

  //   }
  //   catch(err:any) {

  //     console.log('error from catch',err)

  //   }
  // }
