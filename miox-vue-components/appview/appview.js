/**
 * appview
 * @param Component
 * @returns {AppView}
 */
export default function(Component){
    class AppView extends Component {
        constructor(){
            super();
        }

        computed(computed){
            computed.style = function(){
                if ( this.blank ){
                    return {
                        'padding-top': 20
                    }
                }
            };
        }

        template(){
            return `<div class="mx-appview" role="appview" :class="{'mx-appview-horizontal': horizontal}" :style="style"><slot></slot></div>`;
        }

        props(props){
            props.blank = Boolean;
            props.horizontal = Boolean;
        }
    }
    return AppView;
}
