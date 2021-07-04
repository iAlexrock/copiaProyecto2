const url_pedir= "http://localhost:3000/consultarTodo" //metodo que usen lideres para ver torneos
//var VerTorneo

//var VerFixture
 
//var VerTablaPosicion
var consultarTodo=()=>{
    let promesa= fetch(url_pedir,
        {
            method:"GET"
        })
        promesa.then((response)=>{
            response.json().then((data)=>{
                for(var g of data){
                    let nombre=g.nombre
                    let descripcion=g.descripcion

                    let tr= crearFila(nombre,descripcion,"aún")
                    console.log("linea 19 ")
                    document.getElementById("torneos").appendChild(tr)
                }
            })
        })
        promesa.catch((error)=>{
            console.error(error)
        })
}
var crearFila=(nombre, descripcion,cantidad )=>{
    const tr= document.createElement("tr");
    const tdnombre = document.createElement("td");
    const tddescripcion= document.createElement("td");
    const tdcantidad=document.createElement("td");
    const tdfixt=document.createElement("td");
    const tdtabla=document.createElement("td");

    tdnombre.innerHTML=nombre
    tddescripcion.innerHTML=descripcion
    tdcantidad.innerHTML=cantidad

    const button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.setAttribute("class", "btn btn-danger btn-sm");
    button1.innerHTML = "Ver";
    //button1.addEventListener("click",  VerFixture);

    const button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("class", "btn btn-danger btn-sm");
    button2.innerHTML = "Ver";
    //button2.addEventListener("click",  VerTablaPosiciones);

    tdfixt.appendChild(button1)
    tdtabla.appendChild(button2)

    tr.appendChild(tdnombre)
    tr.appendChild(tddescripcion)
    tr.appendChild(tdcantidad)
    tr.appendChild(tdfixt)
    tr.appendChild(tdtabla)

    return tr;
}
var VarFixture=(event)=>{

}
var main = () => {
    console.log("esto")
    consultarTodo();
    
    //añadir listeners para ver torneos, fixtures y posiciones

}

window.addEventListener("load", main);