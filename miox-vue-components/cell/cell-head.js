export default function(Component){
    class CellHead extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-cell-head" role="cell:head"><slot></slot></div>`;
        }
    }
    return CellHead;
}
