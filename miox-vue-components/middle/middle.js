export default function(Component){
    class Middle extends Component {
        constructor(){
            super();
        }

        computed(options){
            options.class = function(){
                const cls = [];
                if ( this.align ){
                    cls.push('mx-text-' + this.align);
                }
                return cls.join(' ');
            }
        }

        template(){
            return `<div class="mx-middle-outter" role="middle" :style="{'height':height}" :class="class"><div class="mx-middle-inner"><slot></slot></div></div>`;
        }

        props(props){
            ['height', 'align'].forEach(prop => {
                props[prop] = String;
            });
        }
    }
    return Middle;
}
