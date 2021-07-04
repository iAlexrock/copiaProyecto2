const url_pedir= "http://localhost:3000/consultarTodo" //metodo que usen lideres para ver torneos
//var VerTorneo

//var VerFixture
 
//var VerTablaPosicion
var consultarTodo=()=>{
    let promesa= fetch(url_pedir,
        {
            method="GET"
        })
        promesa.then((response)=>{
            response.json().then((data)=>{
                for(var g of data){
                    let nombre=g.nombre
                    let descripcion=g.descripcion

                    let tr= crearFila(nombre,descripcion,"aún")
                    document.getElementById('torneos').appendChild(tr)
                }
            })
        })
        promesa.catch((error)=>{
            console.error(error)
        })
}
var crearFila=(nombre, descripcion,cantidad )=>{
    
}
var main = () => {
    consultarTodo();
    
    //añadir listeners para ver torneos, fixtures y posiciones

}

window.addEventListener("load", main);