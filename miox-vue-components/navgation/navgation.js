
export default function(Component){
    class Navgation extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-navgation"><flex align-items="center" justify="center"><slot></slot></flex></div>`;
        }
    }
    return Navgation
}
