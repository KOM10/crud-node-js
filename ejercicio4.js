const express = require('express');
const app= express()
const fs = require ('fs');
const data=fs.readFileSync('productos.json')
const {...objData}=[JSON.parse(data).productos]
let productos =[]

app.use(express.json())

//consultando productos
app.get('/producto',(request,response)=>{
  response.json(productos);
});

//agregar producto
app.post('/producto',(request,response)=>{
  const newproducto = {id:productos.length + 1, ...request.body}
  productos.push(newproducto);
  console.log ("El producto se subio correctamente");
  response.send(newproducto)
});

//Modificar data
app.put('/producto/:id',(request,response)=>{
  const idQueryParams = parseInt(request.params.id);
  const newdata = request.body
  const productFound = productos.find((element)=>element.id=== idQueryParams)
  if(!productFound) return response.status(404).json('producto no encontrado')
  productos = productos.map(element =>element.id == idQueryParams ? {id:idQueryParams, ...newdata} : {...element})
  response.send(productos)
});

//delete
app.delete('/producto/:id', (request, response) => {
  const idQueryParams = request.params.id;
  const indexElement = productos.filter ((element) => element.id === idQueryParams)
  if(indexElement === -1){
      response.send("Producto no encontrado") 
  }
  else{
      productos=productos.filter(element =>element.id!=idQueryParams)
      response.send(productos)
  }
});

const port = 3000;
const host = "localhost"
app.listen(port,host, ()=>{
  console.log(`http://${host}:${port}`)
})
