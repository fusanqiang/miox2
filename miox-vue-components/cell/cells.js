export default function(Component){
    class Cells extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-cells" role="cells" :style="{'border-color':borderColor}"><slot></slot></div>`;
        }

        props(props){
            props.borderColor = String;
        }
    }
    return Cells;
}
