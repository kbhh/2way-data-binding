(function () {
    const elts = document.querySelectorAll('[v-model]'); const data = { }

    elts.forEach((elt) => {
        const addProp = (prop) => {
            if (!data.hasOwnProperty(prop)) {
                let value
                Object.defineProperty(data, prop, {
                    set: (newValue) => {
                        value = newValue
                        elts.forEach((elt) => {
                            if (elt.getAttribute('v-model') === prop) {
                                if (elt.type && (elt.type === 'text' || elt.type === 'textarea')) {
                                    elt.value = newValue;
                                } else if (!elt.type) {
                                    elt.innerHTML = newValue
                                }
                            }
                        })
                    },
                    get: () => {
                        return value
                    },
                    enumerable: true,
                })
            }
        }
        if (elt.type === 'text' || elt.type === 'textarea') {
            var prop = elt.getAttribute('v-model')
            addProp(prop)
            elt.onkeyup = () => {
                data[prop] = elt.value
            }
        }
    })
})();
