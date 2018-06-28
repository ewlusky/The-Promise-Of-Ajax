

class handler {
    makeEmployee(name, department, computer) {
        let depID = -1;
        let comID = -1;
        $.ajax(`http://localhost:3000/departments?name=${department}`)
            .then(result => {
                depID = result[0].id;
                return $.ajax(`http://localhost:3000/computers?name=${computer}`)
            })
            .then(result => {
                comID = result[0].id
                $.ajax({
                    url: "http://localhost:3000/employees",
                    method: "POST",
                    data: {
                        name: name,
                        department: depID,
                        computer: comID
                    }
                })
            })

    }

    fixEmployee(name, department, computer) {
        let depID = -1;
        let comID = -1;
        let nameID = -1;
        $.ajax(`http://localhost:3000/departments?name=${department}`)
            .then(result => {
                depID = result[0].id;
                return $.ajax(`http://localhost:3000/computers?name=${computer}`)
            })
            .then(result => {
                comID = result[0].id;
                return $.ajax(`http://localhost:3000/employees?name=${name}`)


            })
            .then(result => {
                nameID = result[0].id;
                $.ajax({
                    url: `http://localhost:3000/employees/${nameID}`,
                    method: "PUT",
                    data: {
                        name: name,
                        department: depID,
                        computer: comID
                    }
                })
            })

    }



    makeDepartment(name) {

        $.ajax(`http://localhost:3000/departments?name=${name}`)
            .then(result => {
                if (result.length > 0) {
                    console.log(`${name} already in database.`)
                } else {
                    $.ajax({
                        url: "http://localhost:3000/departments",
                        method: "POST",
                        data: {
                            name: name
                        }
                    })
                }
            })

    }

    makeComputer(name) {

        $.ajax(`http://localhost:3000/computers?name=${name}`)
            .then(result => {
                if (result.length > 0) {
                    console.log(`${name} already in database.`)
                } else {
                    $.ajax({
                        url: "http://localhost:3000/computers",
                        method: "POST",
                        data: {
                            name: name
                        }
                    })
                }
            })

    }


    // getID(resource, name) {
    //     return $.ajax(`http://localhost:3000/${resource}?name=${name}`)

    //     // return ID;
    // }

    

    postIt() {
        const main = $('#main-div');
        console.log(main);
        $.ajax('http://localhost:3000/employees')
            .then(response => {
                response.forEach(employee => {
                    let depart = "";
                    let compy = "";
                    $.ajax(`http://localhost:3000/departments/${employee.department}`)
                        .then(result => {
                            depart = result.name;
                            return $.ajax(`http://localhost:3000/computers/${employee.computer}`)
                        })
                        .then(result => {
                            compy = result.name;
                            main.append(
                                `<article class="employee">
                                <header class="employee__name">
                                <h1>${employee.name}</h1>
                                </header>
                                <section class="employee__department">
                                Works in the ${depart} department
                                </section>
                                <section class="employee__computer">
                                Currently using ${compy}
                                </section>
                            </article>`
                            )
                        })
                })
            })

    }



}

const handy = new handler;