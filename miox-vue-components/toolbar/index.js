import toolbar from './toolbar';
import toolbar_item from './toolbar-item';

export default function(COMPONENT, REGISTER){
    REGISTER('toolbar', toolbar(COMPONENT));
    REGISTER('toolbar-item', toolbar_item(COMPONENT));
}
