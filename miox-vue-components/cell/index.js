import cells from './cells';
import cell from './cell';
import cell_head from './cell-head';
import cell_body from './cell-body';
import cell_foot from './cell-foot';

export default function(COMPONENT, REGISTER){
    REGISTER('cells', cells(COMPONENT));
    REGISTER('cell', cell(COMPONENT));
    REGISTER('cell-head', cell_head(COMPONENT));
    REGISTER('cell-body', cell_body(COMPONENT));
    REGISTER('cell-foot', cell_foot(COMPONENT));
}
