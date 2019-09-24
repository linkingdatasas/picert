# Certificados digitales para entidades publicas con Blockchain

Caso de uso de emision de certificados utilizando hyperledger blockchain y siguiendo el estandar [Blockcerts](https://www.blockcerts.org/guide/standard.html)

El diseño de la red (Business Network) contien los siguientes elementos:

**Participant** </p> 
`Administrator`: emisor de los certificados, funcionario CASA UR. </p>

**Asset** </p> 
`Cert`: Cerfificado con informacion completa (off-chain) </p>
`AbsCert`: Abstraccion del certificado con informacion escencial (on-chain).

**Transaction**
`issue`: emision de certificados y en su forma abstracta.
`verify`: verificacion de certificados.

El certificado es emitido por un usuario administrador, funcionario autorizado de la entidad publica. La emision se hace a partir de la transaccion `issue`. Esta transaccion (contrato inteligente) permite guardar el certificado y tambein generar una abstraccion del certificado. La abstraccion se entiende como el conjunto minimo de datos que relaciona el certificado original con un mecanismo de verificacion (certHash) y el medio donde se encuentra la informacion. Este ultimo campo contiene la referencia la blockchain (pemisionada o no permisionada) donde esta almacenada la abstraccion.

Adicionalmente se proporciona otra transaccion que permite validar el certificado `verify`.

Para crear el archivo *.bna debemos utilizar la funcion

```
composer archive create -t dir -n .
```

Para utilizar la red, vamos a seguir el siguiente ejemplo en el **Test** tab:

## Creacion de participante administrador (funcionario institucion)

Crear un administrador `Administrator`:

```
{
  "$class": "org.degree.Admin",
  "email": "admin@entidad.gov.co",
  "firstName": "Juan",
  "lastName": "Admin",
}
```
