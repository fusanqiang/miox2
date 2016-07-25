import navgation from './navgation';
import navgation_item from './navgation-item';

export default function(COMPONENT, REGISTER){
    REGISTER('navgation', navgation(COMPONENT));
    REGISTER('navgation-item', navgation_item(COMPONENT));
}