import { NgModule } from '@angular/core';
import { JourneySliderComponent } from './journey-slider/journey-slider';
import { FooterMenuComponent } from './footer-menu/footer-menu';
@NgModule({
	declarations: [JourneySliderComponent,
    FooterMenuComponent],
	imports: [],
	exports: [JourneySliderComponent,
    FooterMenuComponent]
})
export class ComponentsModule {}
