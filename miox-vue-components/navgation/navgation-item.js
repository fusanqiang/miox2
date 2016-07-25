
export default function(Component){
    class NavgationItem extends Component {
        constructor(){
            super();
        }

        computed(computed){
            computed.grid = function(){
                return (this.center ? 1 : 0 ) + ' 0 ' + (this.width || "auto");
            };
        }

        template(){
            return `<flex-item :flex.sync="grid" :class="{'mx-text-center': center, 'mx-text-left': left, 'mx-text-right': right}"><slot></slot></flex-item>`;
        }

        props(props){
            props.width = String;
            props.center = Boolean;
            props.left = Boolean;
            props.right = Boolean;
        }
    }
    return NavgationItem;
}
