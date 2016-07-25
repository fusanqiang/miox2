import aspect from './aspect';

export default function(COMPONENT, REGISTER){
    REGISTER('aspect', aspect(COMPONENT));
}
