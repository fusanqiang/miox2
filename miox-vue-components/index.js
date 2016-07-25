/**
 * Created by evio on 16/7/25.
 */
'use strict';
import appview from './appview/index';
import navgation from './navgation/index';
import flex from './flex/index';

export default function components(COMPONENT, REGISTER){
    appview(COMPONENT, REGISTER);
    navgation(COMPONENT, REGISTER);
    flex(COMPONENT, REGISTER);
}