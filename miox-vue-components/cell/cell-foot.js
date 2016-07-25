export default function(Component){
    class CellFoot extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-cell-foot" role="cell-foot"><slot></slot></div>`;
        }
    }
    return CellFoot;
}
