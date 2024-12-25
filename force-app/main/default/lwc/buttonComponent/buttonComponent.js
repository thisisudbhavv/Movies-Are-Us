import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ButtonComponent extends NavigationMixin(LightningElement) {
    handleClick() {
        
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName:'Movie_booking_page' 
            }
        });
    }
}