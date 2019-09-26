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
  "$class": "org.picert.Admin",
  "email": "admin@entidad.gov.co",
  "firstName": "Juan",
  "lastName": "Admin"
}
```

Crear un certificado no estructurado (Procuraduria)

```
{
  "$class": "org.picert.cert",
  "certId": "134083306",
  "administrator": "resource:org.picert.Admin#admin@entidad.gov.co",
  "typeC": "Assertion",
  "name": "Certificado de Antecedentes", 
  "message": "La PROCURADURIA GENERAL DE LA NACIÓN certifica que una vez consultado el Sistema de Información de Registro de Sanciones e Inhabilidades (SIRI), el(la) señor(a) CARLOS ALBERTO CASTRO IRAGORRI identificado(a) con Cédula de ciudadanía número 79947917: NO REGISTRA SANCIONES NI INHABILIDADES VIGENTES",
  ],
  "issuer": {
    "$class": "composer.blockcerts.Issuer",
    "id": "899999119",
    "typen": "Profile",
    "name": "Procuraduria General de la Nacion",
    "image": "procu.png",
    "signatureLines": {
      "$class": "composer.blockcerts.SignatureLines",
      "typen": "SignatureLine,Extension",
      "name": "Manuel A. Espinosa",
      "image": "firmaME.png",
      "jobtitle": "Jefe Division Centro de Atencion al Publico"
    }
  },
  "context": "https://w3id.org/openbadges/v2,https://w3id.org/blockcerts/v2"
}
```

Crear una abstraccion de un certificado (Procuraduria)

```
{
  "$class": "org.picert.abscert",
  "absId": "PROCUR001",
  "certId": "resource:org.picert.cert#134083306",
  "certHash": "2fe4a53c81ec3298c784fd4a2b8e217e32bd1fa4b804d383a70f202f082b9a8c",
  "uri": "RepoPROCUR",
  "stored": "FAB"
}
```
Crear un certificado estructurado (Invima)

```
{
  "$class": "org.picert.cert",
  "certId": "10I1301",
  "administrator": "resource:org.picert.Admin#admin@entidad.gov.co",
  "typeC": "Assertion",
  "name": "Registro Sanitario",
  "message": "Expediente Sanitario: 19924093; Nombre del Producto: Todo Rico; Estado del Registro: Vigente; Fecha de Vencimiento: 2021/08/08;
    Modalidad: Fabricar y Vender; Titular: Comestibles Ricos S.A.",
  "issuer": {
    "$class": "composer.blockcerts.Issuer",
    "id": "830000167",
    "typen": "Profile",
    "name": "Invima",
    "image": "invima.png"
  },
  "context": "https://w3id.org/openbadges/v2,https://w3id.org/blockcerts/v2"
}
```

Crear una abstraccion de un certificado (Invima)

```
{
  "$class": "org.picert.abscert",
  "absId": "INVIMA001",
  "certId": "resource:org.picert.cert#10I1301",
  "certHash": "0da70addfbdae274ed2b77cabb34e4f6bbb6c736d19ab4e6b479f7a3da8fca7b",
  "uri": "RepoINVIMA",
  "stored": "FAB"
}
```
Emision de un certificado y su asbtraccion utilizando la transaccion `issue`

Procuraduria

```
{
  "$class": "org.picert.issue",
  "absId": "PROCUR001",
  "certId": "134083306",
  "administrator": "resource:org.picert.Admin#admin@entidad.gov.co",
  "name": "Certificado de Antecedentes",
  "message": "La PROCURADURIA GENERAL DE LA NACIÓN certifica que una vez consultado el Sistema de Información de Registro de Sanciones e Inhabilidades (SIRI), el(la) señor(a) CARLOS ALBERTO CASTRO IRAGORRI identificado(a) con Cédula de ciudadanía número 79947917: NO REGISTRA SANCIONES NI INHABILIDADES VIGENTES",
  "issuer": {
    "$class": "composer.blockcerts.Issuer",
    "id": "899999119",
    "typen": "Profile",
    "name": "Procuraduria General de la Nacion",
    "image": "procu.png",
    "signatureLines": {
      "$class": "composer.blockcerts.SignatureLines",
      "typen": "SignatureLine,Extension",
      "name": "Manuel A. Espinosa",
      "image": "firmaME.png",
      "jobtitle": "Jefe Division Centro de Atencion al Publico"
    }
  },
  "uri": "RepoPROCUR"
}
```

Invima

```
{
  "$class": "org.picert.issue",
  "absId": "INVIMA001",
  "certId": "10I1301",
  "administrator": "resource:org.picert.Admin#admin@entidad.gov.co",
  "name": "Registro Sanitario",
  "message": "Expediente Sanitario: 19924093; Nombre del Producto: Todo Rico; Estado del Registro: Vigente; Fecha de Vencimiento: 2021/08/08;
    Modalidad: Fabricar y Vender; Titular: Comestibles Ricos S.A.",
  "issuer": {
    "$class": "composer.blockcerts.Issuer",
    "id": "830000167",
    "typen": "Profile",
    "name": "Invima",
    "image": "invima.png"
  },
  "uri": "RepoINVIMA"
}
```