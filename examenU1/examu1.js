/*1. Diferencias entre var, let y const
Escribe un ejemplo de código que ilustre las diferencias entre var, let y const.*/

//LET
let a = 10;
let b = 18;
let sum = a + b;

console.log('La suma es:', sum);

//VAR
var x = 5;
var y = 15;
var result = x + y;

console.log('El resultado de la suma es:', result);

//CONST
const name = 'Alejandra';
const lastName = 'Nieves';
const fullName = name + ' ' + lastName;

console.log('Nombre completo:', fullName);

//En conclusión let no permite redeclarar ningún valor, var si permite redeclarar y const no permite redeclarar ni
//reasignar pero si permite modificar sus elementos.

/*2. Consumo de APIs*/
/*Usa la API de JSONPlaceholder para realizar las siguientes acciones en un flujo encadenado:*/

/*a)Obtén una lista de usuarios y selecciona el primer usuario. Usa el ID del usuario para realizar las siguientes acciones.*/
/*b)Crea un nuevo post para el usuario seleccionado y muestra la respuesta en la consola.*/
/*c)Actualiza el título del post recién creado y muestra la respuesta en la consola.*/
/*d)Elimina el post recién actualizado y muestra un mensaje de éxito en la consola.
Nota: Usa async/await para dos de estas peticiones y .then para las otras dos. Asegúrate de utilizar template strings en las peticiones que lo requieran.*/

//Lista de usuarios
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => {
    const user = users[0];
    const userId = user.id;
    console.log(`Seleccionar el primer usuario: ${userId}`);
    //POST
    async function createPost(userId) {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Nuevo Post',
            body: 'Este es el nuevo post',
            userId: userId,
          }),
        }
      );
      const post = await response.json();
      console.log('Post creado:', post);
      //PUT
      async function updatePost(postId) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: 'Actualizar el título del post',
              body: 'Post actualizado',
              userId: 1,
            }),
          }
        );
        const updatedPost = await response.json();
        console.log('Post Actualizado:', updatedPost);
        //DELETE
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
          method: 'DELETE',
        })
          .then(() => console.log('El post ha sido eliminado exitosamente'))
          .catch((error) =>
            console.error('Se produjo un error al eliminar el post:', error)
          );
      }
    }
  })
  .catch((error) =>
    console.error('Se produjo un error al buscar usuarios:', error)
  );

/*3. Simulación de Promesas
Crea una función que simule una promesa. La función debe aceptar un tiempo (en segundos) como parámetro y resolver o rechazar la promesa después del tiempo especificado. La promesa debe resolver o rechazar basándose en un número aleatorio. Muestra un mensaje en la consola dependiendo de si la promesa fue resuelta o rechazada.*/
function simulatePromise(timeInSeconds) {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.5) {
        resolve('Promesa resuelta :)');
      } else {
        reject('Promesa rachazada  :(');
      }
    }, timeInSeconds * 2000);
  });
}

simulatePromise(2)
  .then((message) => console.log(message))
  .catch((error) => console.log(error));

/*4. Diferencias entre try-catch y finally
Explica las diferencias entre try-catch y finally usando ejemplos de código. Incluye un caso en el que se utilice finally para ejecutar un código independientemente de si hubo un error o no.*/
/*try se utiliza para envolver el código que puede lanzar una excepción.
catch se usa para manejar la excepción si ocurre.
finally se ejecuta siempre, independientemente de si hubo una excepción o no. 
Es útil para limpiar recursos o realizar otras tareas de finalización.*/

/*5. Consumo de APIs con async/await y .then*/
//Realiza los cuatro consumos de API del punto 2, pero esta vez:
//a) Usa async/await para las peticiones de  y .
async function createAndHandlePost(userId) {
  try {
    const postResponse = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Nuevo post',
          body: 'Este es el nuevo post',
          userId: userId,
        }),
      }
    );
    const newPost = await postResponse.json();
    console.log('Post Creado:', newPost);

    const updateResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${newPost.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Actualizar el titulo del post',
          body: 'Se actualizo el post',
          userId: userId,
        }),
      }
    );
    const updatedPost = await updateResponse.json();
    console.log('El post ha sido actualizado:', updatedPost);

    return updatedPost.id;
  } catch (error) {
    console.error('Error al crear publicaciones:', error);
  }
}

//b) Usa .then para las peticiones de  y .
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => {
    const user = users[0];
    const userId = user.id;
    console.log(`ID de usuario seleccionado: ${userId}`);

    createAndHandlePost(userId).then((postId) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      })
        .then(() => console.log('Post eliminado con exito'))
        .catch((error) =>
          console.error('Se produjo un error al eliminar el post:', error)
        );
    });
  })
  .catch((error) =>
    console.error('Se ha producido un error al buscar los usuarios:', error)
  );
