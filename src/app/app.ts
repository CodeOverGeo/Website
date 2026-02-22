import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTabsComponent } from './components/shell/nav-tabs/nav-tabs.component';
import { StatusBarComponent } from './components/shell/status-bar/status-bar.component';
import { CommandPaletteComponent } from './components/shell/command-palette/command-palette.component';
import { SpecPanelComponent } from './components/shell/spec-panel/spec-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavTabsComponent, StatusBarComponent, CommandPaletteComponent, SpecPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
