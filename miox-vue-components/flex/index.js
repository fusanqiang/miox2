import flex from './flex';
import flex_item from './flex-item';

export default function(COMPONENT, REGISTER){
    REGISTER('flex', flex(COMPONENT));
    REGISTER('flex-item', flex_item(COMPONENT));
}
