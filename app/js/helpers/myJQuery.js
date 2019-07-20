/**
 * This function performs the same that $ in jQuery, witch means, it creates a new Node if the parameter is a <tag>
 *     or it searches for one Node if the parameter is a CSS selector
 */
export const $$ = (text) => {
    if (text.charAt(0) === '<' && text.charAt(text.length - 1) === '>')
        return document.createElement(text.substring(1, text.length - 1));
    else {
        if (document.querySelectorAll(text).length === 1) {
            let node = document.querySelector(text);
            node.show = () => node.style.display = "block";
            node.hide = () => node.style.display = "none";
            return node;
        } else
            return document.querySelectorAll(text);
    }
};
