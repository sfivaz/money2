export class PageBuilder {

    static build(object, Model, View, Controller) {
        const model = Object.assign(new Model(), object);

        const view = new View(model);

        const controller = new Controller(model, view);

        controller.start();
    }
}
