import container from './container';

export default function(COMPONENT, REGISTER){
    REGISTER('container', container(COMPONENT));
}
