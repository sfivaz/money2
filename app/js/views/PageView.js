import {View} from "./View";

export class PageView extends View {

    constructor(props) {
        super(props);
        this.container = null;
        this.eventHandlers();
    }

    eventHandlers() {
        this.container.click(event => {
            if (event.target.id === "btn-create-child")
                this.createChildTemplate();
        });
    }

    showChild(childView) {
        this.elements.main.appendChild(childView.template());
    }

    clearAll() {
        this.elements.main.innerHTML = "";
    }

    //TODO create a header without d-flex to accept a filter
    static pageTemplate(btnNewChildName) {
        return `
            <div class="d-flex justify-content-between">
            </div>
                <main>
                </main>
            </div>
        `;
    }

    createChildTemplate() {
    }

    update() {
    }
}