"use strict";
export default function(Component){
    class Container extends Component {
        constructor(){
            super();
        }

        computed(options){
            options.style = function(){
                const cls = [];
                if ( this.border && this.borderColor ){
                    cls.push('border-color:' + this.borderColor);
                }
                return cls.join(' ');
            }
        }

        template(){
            return `<div class="mx-container" role="container" :class="{'mx-container-border': this.border}" :style="style"><slot></slot></div>`;
        }

        props(props){
            props.border = Boolean;
            props.borderColor = String;
        }
    }
    return Container;
}