var formSrc = {
    model: 'region',
    name: 'Район',
    field: [{
        model: "ID",
        title: "",
        type: "hidden"
    }, {
        model: "Description",
        title: "Название",
        type: "text",
        required: true
    }, {
        model: "Region",
        title: "Район",
        required: true,
        type: "select",
        // поля для селекта на форме
        list: [],
        callback: function() {
            this.list = [{
                name: 'Название',
                item: Obj
            }];
        }
    }, {
        model: "DisabledParking",
        title: "Неактивное место",
        type: "checkbox"
    }]
};