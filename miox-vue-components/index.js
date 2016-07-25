/**
 * Created by evio on 16/7/25.
 */
'use strict';
import appview from './appview/index';
import navgation from './navgation/index';
import flex from './flex/index';
import aspect from './aspect/index';
import button from './button/index';
import cell from './cell/index';
import checkbox from './checkbox/index';
import container from './container/index';
import middle from './middle/index';
import panel from './panel/index';
import radio from './radio/index';
import toolbar from './toolbar/index';

export default function components(COMPONENT, REGISTER){
    appview(COMPONENT, REGISTER);
    navgation(COMPONENT, REGISTER);
    flex(COMPONENT, REGISTER);
    aspect(COMPONENT, REGISTER);
    button(COMPONENT, REGISTER);
    cell(COMPONENT, REGISTER);
    checkbox(COMPONENT, REGISTER);
    container(COMPONENT, REGISTER);
    middle(COMPONENT, REGISTER);
    panel(COMPONENT, REGISTER);
    radio(COMPONENT, REGISTER);
    toolbar(COMPONENT, REGISTER);
}