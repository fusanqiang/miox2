export default function(Component){
    class CellBody extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-cell-body" role="cell:body"><slot></slot></div>`;
        }
    }
    return CellBody;
}
