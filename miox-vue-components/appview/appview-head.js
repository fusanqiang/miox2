/**
 * appview head
 * @param Component
 * @returns {AppViewHead}
 */
export default function(Component){
    class AppViewHead extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-appview-head" role="appview-head"><slot></slot></div>`;
        }
    }
    return AppViewHead;
}
