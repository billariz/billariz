# Contractualisation

![Diagram 6](/images/diagrams/diagram-6.png)


---

## Client — CUSTOMER

Le client, “customer”, initie sa souscription en entrant ses données personnelles. Ces données sont  stockées par le biais d’une classe qui y est dédiée à savoir la classe Customer. En plus des données personnelles, le customer introduit sa demande au service auquel il souhaite être affilié. Deux objets sont simultanément créés : un objet Contract et un Service. Ces deux vont de soient étant donné qu’un service ne peut être fait que si le contrat a été mis en place. On verra par la suite que la classe Customer est la classe qui est l’issue de plusieurs cheminements.

![Diagram 1](/images/diagrams/diagram-1.png)


### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| customerNbr | string | Une chaîne de caractère est générée vers le contrat |  |
| category |  | Donne une catégorie |  |
| languageCode |  | Le langage choisi par le souscripteur |  |
| type |  | Le type du contrat |  |
| companyId | string / adresse vers un objet | Dans le cas ou c’est une entreprise, un id est générée qui renvoie à la table COMPANY | COMPANY |
| individualId | string / adresse vers un objet | Dans le cas ou c’est une individual, un id est générée qui renvoie à la table INDIVIDUAL | INDIVIDUAL |
| contactId | string / adresse vers un objet | Un id est générée qui renvoie à la table CONTACT | CONTACT |
| addressId | string / adresse vers un objet | Un id est générée qui renvoie à la table ADDRESS | ADDRESS |
| status |  | Donne le statut de l’individu |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| customerNbr | CUBADIJMCL | CUFDVDER9NO |
| category | customerB2B | customerB2C |
| languageCode | FR | FR |
| type | professional | residential |
| companyId | id externe d’une entrée dans la table COMPANY | id externe d’une entrée dans la table COMPANY |
| individualId | id externe d’une entrée dans la table INDIVIDUAL | id externe d’une entrée dans la table INDIVIDUAL |
| contactId | id externe d’une entrée dans la table CONTACT | id externe d’une entrée dans la table CONTACT |
| addressId | id externe d’une entrée dans la table ADDRESS | id externe d’une entrée dans la table ADDRESS |
| status | CUSTOMER | CUSTOMER |

### Règles de gestion :

- Création du client

- Mis-à-jour d’un client déjà existant

- Suppression du client

---

## Contact – CONTACT

La classe "contact'' permet de rajouter des informations concernant le client. C’est aussi un moyen de joindre le client en cas de problème. Ce sont aussi des données personnelles qui facilitent l’authentification de l’individu.


### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe CUSTOMER |  |
| phone | string | succession de nombre correspondant au numéro de téléphone |  |
| phone 2 | string | succession de nombre correspondant au numéro de téléphone |  |
| phone 3 | string | succession de nombre correspondant au numéro de téléphone |  |
| email | string | succession de lettre/nombre contenant un “@” et “.” |  |
| fax | string | succession de nombre correspondant au numéro de téléphone |  |
| deliveryModeCode |  |  |  |



### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| phone |  | 0661883737 |
| phone 2 |  |  |
| phone 3 |  |  |
| email | pascal.doguet@worldonline.fr | francescoalberto@hotmail.com |
| fax |  |  |
| deliveryModeCode | NULL | NULL |



Règles de gestion :

Un numéro de téléphone est nécessaire pour la création d’un client

Une adresse mail est nécessaire pour la création du client

Mis-à-jour des données

---

## Adresse – ADDRESS

La classe “address”, au même titre que la classe contact, donne des informations et des données personnelles concernant le client. Cela n’est toutefois pas forcément l’adresse de facturation.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe CUSTOMER |  |
| street | string | tout en majuscule correspond à la rue d’habitation |  |
| number | int | correspond au numéro de rue |  |
| box |  |  |  |
| postalCode | int | correspond au code postal |  |
| countryCode | Enum | le code du pays |  |
| city | string | tout en majuscule la ville de l’adresse |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| street | NULL | RUE LUCIEN SAMPAIX |
| number | NULL | 27 |
| box | NULL |  |
| postalCode | NULL | 78210 |
| countryCode | NULL | FR |
| city | NULL | ST CYR L ECOLE |


Règles de gestion :

Pour un particulier la rue, le nombre, le code postal, le code du pays, et la ville sont des champ obligatoires

Mis-à-jour des données possibles

---

## Entreprise – COMPANY

Dans le cas où le client est un professionnel, un objet COMPANY est créé. Celui-ci initie un objet avec certaines données propres au type entreprise choses qui ne sont pas forcément demandés dans le cas d’un particulier.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe CUSTOMER |  |
| companyName | string | en majuscule correspond au nom de l’entreprise |  |
| legalFormCode |  | correspond au type de l’entreprise |  |
| identificationNbr | long | succession de 13 nombre |  |
| vatNbr | string | initié avec le code du pays + succession de nombre |  |
| vatableCode | bool | est-ce un code TVA ou non ou vide |  |
| naceCode | string | cinq caractère en lettre majuscule et nombre |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id |  |
| companyName | DOGUET PASCAL |  |
| legalFormCode | EI |  |
| identificationNbr |  |  |
| vatNbr | FR43403112675 |  |
| vatableCode | NULL |  |
| naceCode | 5621Z |  |

Règles de gestion :

Champ à remplir que si le client est professionnel

Pour un professionnel, le nom de l’entreprise, la forme légale de l’entreprise, le numéro de TVA et le NACE code sont obligatoires

Mis-à-jour des données possibles

---

## Particulier – INDIVIDUAL

![Diagram 1](public/images/diagrammes/diagram-1.png)


L’autre cas est  « particulier » . En effet, dans la classe INDIVIDUAL les informations tels que le nom et le prénom sont demandés au client s’il souscrit en tant que particulier.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe CUSTOMER |  |
| titleCode |  | correspond au titre du souscripteur |  |
| name | string | Nom avec un lettre majuscule |  |
| firstName | string | Prenom avec une lettre majuscule |  |
| birthDate | date | date qui respecte le format : JJ/MM/AAAA |  |
| addressOfBirthPlace | string | correspond au lieu de naissance du souscripteur |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id |  |
| titleCode | MR |  |
| name | Alberto |  |
| firstName | François |  |
| birthDate | 24/08/1974 |  |
| addressOfBirthPlace | NULL |  |

Règles de gestion :

Champ à remplir que si le client est particulier

Pour un particulieur, le titre, nom, prénom et date de naissance sont obligatoires

Mis-à-jour des données possibles

---

## Tiers – THIRD

Lorsque le choix se fait pour qu’un tiers puisse régler la facture, un objet « THIRD » est créé. Ce dernier est relié d’un côté au particulier/entreprise étant donné que c’est souscripteur et de l’autre à la classe « ACTOR » .

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe CUSTOMER | CUSTOMER |
| type |  | Correspond au type du client, soit individual ou company |  |
| addressId | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe ADDRESS | ADDRESS |
| financialInformationId | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe FINANCIAL_INFORMATION | FINANCIAL_INFORMATION |
| individualId | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe INDIVIDUAL | INDIVIDUAL |
| companyId | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe COMPANY | COMPANY |
| contactId | string | succession de chiffre et de lettre miniscule + ‘-’ correspondant à l’id généré dans la classe CONTACT | CONTACT |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id |  |
| type | individual |  |
| addressId | id |  |
| financialInformationId | id |  |
| individualId | id |  |
| companyId | id |  |
| contactId | id |  |


Règles de gestion :

Champ optionnel si un objet acteur est créé


---

## Acteur – ACTOR

La classe « ACTOR » qualifie le rôle du tiers auquel il est relié. Le rôle est aussi défini par rapport au périmètre de couverture de la souscription qui a été convenu entre le client et le fournisseur.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe ACTOR |  |
| thirdid | string | succession de chiffre et de lettre majuscule correspondant à l’id généré dans la classe THIRD | THIRD |
| role |  | donne l’action que le tiers fera et donc le rôle, il est généralement payeur |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA à la fin de la souscription |  |
| perimeterId | string | succession de chiffre et de lettre majuscule + ‘-’ correspondant à l’id généré dans la classe PERIMETER | PERIMETER |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id |  | 01610d66-4685-419c-a10d-664685319c4a |
| thirdid |  | TPUEL1593067502190 |
| role |  | PAYER |
| startDate |  | 25/06/2020 |
| endDate |  |  |
| perimeterId |  | P-CTF179JO1L |

Règles de gestion :

Champ optionnel

Si créé, le rôle et la date de souscription est obligatoire

---

## Périmètre – PERIMETER

Après avoir renseigné toutes les informations concernant le client, il est maintenant temps de renseigner les informations concernant le périmètre d’application du contrat.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre majuscule + ‘-’ correspondant à l’id généré dans la classe PERIMETER |  |
| customerId | string | Une chaîne de caractère est générée vers le CUSTOMER | CUSTOMER |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| label | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| analyticCode |  | peut être EL ou NG |  |
| perimeterType |  | peut être mono ou multi site |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | P-CTFZCXKUQN | P-CTF179JO1L |
| customerId | CUBADIJMCL | CUF179JQPT |
| startDate | 01/12/2020 | 12/08/2019 |
| endDate | 01/12/2020 | 12/08/2020 |
| label | Périmètre multisite Electricité | Périmètre monosite Electricité |
| analyticCode | EL | EL |
| perimeterType | MULTI_SITE | MONO_SITE |

Règles de gestion :

Date de commencement est champ obligatoire en format JJ/MM/AAAA

Si le type de périmètre est MULTI_SITE ou MONO_SITE, le label doit être en cohérence

---

## Type de périmètre – PERIMETER_TYPE

Le périmètre peut être ou bien mono-site ou multi-site et c’est grâce à cette classe qu’on qualifie le périmètre en cours.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| perimeterType |  | peut être mono ou multi site |  |
| label | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| label2 | string |  |  |
| printShopTemplate |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| perimeterType | MULTI_SITE | MONO_SITE |
| label | Périmètre multisite | Périmètre monosite |
| label2 | NULL | NULL |
| printShopTemplate | NULL | NULL |

Règles de gestion :

Label en cohérence avec le type



## Périmètre et contrat – CONTRACT PERIMETER

Afin de mettre une liaison entre le périmètre, de manière indirecte le client, et le contrat, cette classe répertorie le numéro du contrat et le périmètre associé.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | int | succession de chiffre qui donne un identificateur au périmétre |  |
| contractNbr | string | génère une succession de lettre majuscule pour l’id de CONTRACT | CONTRACT |
| perimeterId | string | la même succession de lettre que contractNbr mais avec un prefixe ‘P-’ qui explicite le fait que c’est un périmètre qu’on retrouve dans la classe PERIMETER | PERIMETER |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | 1029599 | 1002696 |
| contractNbr | CTFZCXKUQN | CTF179JO1L |
| perimeterId | P-CTFZCXKUQN | P-CTF179JO1L |
| startDate | 23/12/2020 | 12/08/2019 |
| endDate |  | 12/08/2020 |

Règles de gestion :

la date doit être sous le format JJ/MM/AAAA

---

## Contrat — CONTRACT

On peut retrouver plusieurs contrats par périmètre selon l’utilité et la volonté du client.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| contractNumber | string | fait référence au numéro de contrat qu’on retrouve dans la classe PERIMETER_CONTRACT | PERIMETER_CONTRACT |
| status |  | peut être effective |  |
| marketCode |  | EL |  |
| contractualStartDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| contractualEndDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| installPeriodicity | int | quand le billingMode est CYCLICAL_BILLING alors installPeriodicity est à 0 |  |
| billingMode | Enum | donne le type de paiement choisi par le client |  |
| billingFrequency | int | Lorsque installPeriodicity est CYCLICAL_BILLING, la valeur est de 1 |  |
| billingWindow |  |  |  |
| billAfterDate | int |  |  |
| channel |  | peut être WEB/SELECTRA |  |
| seller | string | correspond au distributeur |  |
| serviceCategory |  | donne le type de service pour lequel le contrat a débuté |  |
| serviceSubCategory |  |  |  |
| direction |  | généralement RANKING |  |
| effectiveEndDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de l’application |  |
| subscriptionDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| contractNumber | CTFZCXKUQN | CTF179JO1L |
| status | effective | effective |
| marketCode | EL | EL |
| contractualStartDate | 01/12/2020 | 12/08/2019 |
| contractualEndDate |  | 12/08/2020 |
| installPeriodicity |  | 2 |
| billingMode |  | PAYMENT_SCHEDULE |
| billingFrequency | 1 | 6 |
| billingWindow |  |  |
| billAfterDate |  |  |
| channel | ENERGIES-FRANCE |  |
| seller | WEKIWI | WEKIWI |
| serviceCategory | COMMODITIES | COMMODITIES |
| serviceSubCategory |  |  |
| direction |  | RANKING |
| effectiveEndDate |  |  |
| subscriptionDate | 01/12/2023 | 12/08/2019 |

Règles de gestion :

Création d’un contrat

si le numéro de contrat est renseigné alors celui ci ne doit pas existé en DB

si le numéro de contrat n’est pa renseigné alors le système le crée

l’ensembles des champs obligatoires doivent être renseignés

Mis-à-jour d’un contrat

---

## Contrat et point de service — CONTRACT_POS


Classe servant de liaison entre les contrats et le point de service.

#### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | int | succession de chiffre qui donne un identificateur au contrat et le point de service |  |
| contractNbr | string | fait référence au numéro de contrat qu’on retrouve dans la classe PERIMETER_CONTRACT | PERIMETER_CONTRACT |
| posId | int | succession de chiffre qui fait référence à la classe POS | POS |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | 12173 |  |
| contractNbr | CTFZCXKUQN |  |
| posId | 11111 |  |
| startDate | 23/12/2020 |  |
| endDate |  |  |

Règles de gestion :

Date doit correspondre à la date de souscription au contrat


---

## Point de service — POS

Le point de service est un point physique où sont collectées les données géographiques et historiques de l’adresse en question. On y trouve plusieurs informations reliées au transport et la distribution de l’énergie en question. On nomme cela un point de service car c’est dans cette classe que se fera l’application du service qui sera acté lors de la signature du contrat.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| posRef | long | succession de chiffre qui donne un identificateur au point de service |  |
| addressId | string | fait référence au numéro de contrat qu’on retrouve dans la classe ADDRESS | ADDRESS |
| market |  | correspond au type de marché selon le type d’énergie utilisé |  |
| tgoCode |  | Renseigne la société de transport de l’énergie en question |  |
| dgoCode |  | Renseigne la société de la distribution de l’énergie en question |  |
| deliveryState |  | Explicite l’état d’avancement de l’énergie |  |
| temporaryConnection | bool |  |  |
| temporaryConnectionType |  |  |  |
| direction |  | généralement RANKING |  |
| readingDate | date | Date dans le format JJ/MM/AAAA qui énonce le début d’activité du compteur |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| posRef | id | id |
| addressId | id | id |
| market | NG | EL |
| tgoCode | null | RTE |
| dgoCode | GRDF | ENEDIS |
| deliveryState | IN_USE | IN_USE |
| deliveryStatus | ACTIVE | ACTIVE |
| temporaryConnection | 0 | 0 |
| temporaryConnectionType |  |  |
| direction | RANKING | RANKING |
| readingDate |  |  |

Règles de gestion :

Généralement les données devraient être inchangé à moins qu’il y ait un changement de contrat

---

## Capacité du point de service — POS_CAPACITY

La classe POS_CAPACITY, reflète les possibilités de consommation du client en se basant sur la géolocalisation de l’adresse de distribution.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe |  |
| posId | long | fait référence au numéro de contrat qu’on retrouve dans la classe POS | POS |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| tou |  |  |  |
| value | float/int |  |  |
| capacityType |  |  |  |
| unit |  |  |  |
| contractNumber | string | fait référence au numéro de contrat qu’on retrouve dans la classe CONTRACT | CONTRACT |
| source |  |  |  |
| status |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| posId | id | id |
| startDate | 17/11/2020 | 18/10/2020 |
| endDate |  |  |
| tou | TOTAL_HOUR | TOTAL_HOUR |
| value | 12.0 | 6 |
| capacityType | POWER | POWER |
| unit | kVA | kVA |
| contractNumber | id | id |
| source | MARKET | MARKET |
| status | VALIDATED | INITIAL |

Règles de gestion :

les valeurs doivent être en adéquation avec l’unité utilisée

la date de début de la première configuration (statut INITIAL) doit etre égale à date de début du contrat

Les configurations successives doivent être contigues sans chevauchement et sans discontinuité


---

## Configuration du point de service — POS_CONFIGURATION

Selon le service qui sera demandé, la traction de l’énergie se fera selon certaines conditions. Une configuration du compteur devra être faite.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe |  |
| posId | long | fait référence au numéro de contrat qu’on retrouve dans la classe POS | POS |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| gridRate |  |  |  |
| profile |  |  |  |
| posCategory |  |  |  |
| netArea | string | En lettre majuscule et chiffre |  |
| readingFrequency |  | Fréquence de paiement sur l’année |  |
| source |  |  |  |
| status |  |  |  |
| touGroup |  |  |  |
| contractNumber | string | fait référence au numéro de contrat qu’on retrouve dans la classe CONTRACT | CONTRACT |
| businessGridCode |  |  |  |
| marketGridCode |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| posId | id | id |
| startDate | 08/01/2021 | 08/12/2020 |
| endDate |  |  |
| gridRate | BTINFMU4 | T1 |
| profile | RES2 | P011 |
| posCategory | C5 | T1 |
| netArea |  | GD0864 |
| readingFrequency | MONTHLY | MONTHLY |
| source | MARKET | MARKET |
| status | VALIDATED | INITIAL |
| touGroup | TOTAL_HOUR | TOTAL_HOUR |
| contractNumber | id | id |
| businessGridCode | FC010905 |  |
| marketGridCode | DI000003 |  |


--- 


## L’estimation au niveau du point de service — POS_ESTIMATE

En se liant à la consommation historique mais aussi au type de client, une estimation est faite.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe |  |
| posId | long | fait référence au numéro de contrat qu’on retrouve dans la classe POS |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| tou |  | type de service |  |
| value | int |  |  |
| estimateType |  |  |  |
| unit |  |  |  |
| contractNumber | string | fait référence au numéro de contrat qu’on retrouve dans la classe CONTRACT | CONTRACT |
| source |  |  |  |
| status |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id |  |  |
| posId |  |  |
| startDate | 18/11/2020 | 08/11/2020 |
| endDate |  |  |
| tou | TOTAL_HOUR | TOTAL_HOUR |
| value | 2173 | 31345 |
| estimateType | SUPPLIER_ESTIMATE | CAR |
| unit | kWh | kWh |
| contractNumber |  |  |
| source | MARKET | MARKET |
| status | INITIAL | INITIAL |


--- 

## Compteur — METER

Cette classe est directement reliée au type de compteur en activité au point de service.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe |  |
| posId | long | fait référence au numéro de contrat qu’on retrouve dans la classe POS |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| meterNumber | int |  |  |
| meterType |  |  |  |
| smartMeterStatus |  |  |  |
| convertCoef |  |  |  |
| digitNumber |  |  |  |
| contractNumber | string | fait référence au numéro de contrat qu’on retrouve dans la classe CONTRACT | CONTRACT |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| posId | id | id |
| startDate | 10/12/2020 | 02/11/2020 |
| endDate | id | id |
| meterNumber | 289 | 253 |
| meterType | SMART | ELECTRONIC |
| smartMeterStatus | ACTIVE | INACTIVE |
| convertCoef |  |  |
| digitNumber |  |  |
| contractNumber | id | id |


---

# Tarification

## Service – SERVICE

Le client, “customer”, en parallèle d’avoir initié son inscription, fait la demande pour accéder à un service.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre minuscule + ‘-’ correspondant à l’id généré dans la classe |  |
| contractNumber | string | fait référence au numéro de contrat qu’on retrouve dans la classe CONTRACT | CONTRACT |
| serviceType |  | Correspond au type de service via une Enumération |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| touGroup |  | type de service |  |
| tou |  | type de service |  |
| amount | int | total à payer |  |
| threshold | int |  |  |
| thresholdType |  |  |  |
| operand |  |  |  |
| operandType |  |  |  |
| factor | bool | 1 ou vide |  |
| factorType |  |  |  |
| rateType |  | fait référence à la tarification qui sera utilisé |  |
| status |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| contractNumber | CTFDT82GZ2E | CTFDWIIDXO1 |
| serviceType | NG_THRESHOLD | SAVE_TREE |
| startDate | 06/11/2020 | 01/11/2020 |
| endDate |  |  |
| touGroup |  |  |
| tou |  |  |
| amount |  |  |
| threshold |  |  |
| thresholdType |  |  |
| operand |  |  |
| operandType |  |  |
| factor |  |  |
| factorType |  |  |
| rateType |  |  |
| status | active | initialized |


---

## Type de service – SERVICE_TYPE

La classe “type de service” qualifie le service choisi par le client. On donne aussi l’information concernant le type d’activité qui sera encouru par le client.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| serviceType |  | Identifie le type de service |  |
| startDate | date | date dans le format JJ/MM/AAAA généralement 01/01/2000 |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| category |  | En liaison avec le type de service |  |
| subCategory |  | Aiguille par rapport à la tarification |  |
| defaultLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| standardLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| otherLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| activityType |  | liaison entre le service donné et le type d’activité pris en charge |  |
| description | string | décrit le service avec un paragraphe descriptif |  |
| picture |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| serviceType | C_CARRE | EL_DIGITAL |
| startDate | 01/01/2000 | 01/01/2000 |
| endDate |  |  |
| category | COMODITIES | COMODITIES |
| subCategory | DISCOUNT | OPTION |
| defaultLabel | Modalités de plan de prépaiement | Option energie Verte |
| standardLabel |  |  |
| otherLabel |  |  |
| activityType |  |  |
| description |  |  |
| picture |  |  |


--- 


## Conditions de démarrage des services – SERVICE_START_OPTION

D’un point de vue technique, c’est grâce à la classe SERVICE_START_OPT que l’objet Service est créé.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | int | une combinaison sur deux chiffre qui identifie le service |  |
| seller |  | le vendeur répertorié dans un Enum |  |
| channel |  |  |  |
| startDate | date | date dans le format JJ/MM/AAAA est une date de base faite pour 01/01/1900 |  |
| endDate | date | date dans le format JJ/MM/AAAA est une date concernant la fin du service |  |
| serviceCategory |  | correspond au type de service |  |
| serviceSubCategory |  | succession de nombre correspondant au numéro de téléphone |  |
| market |  | correspond au type de marché selon le type d’énergie utilisé |  |
| customerType |  | le type de client qui fait référence à la classe customer |  |
| customerCategory |  | le type de commerce, B2B ou B2C |  |
| billingMode |  | la répartition des échéance |  |
| paymentMode |  | le type de paiement |  |
| posCategory |  | type de point de service |  |
| serviceDirection |  |  |  |
| dso |  | service de distribution utilisé |  |
| tso |  | service de transport utilisé |  |
| consumptionThreshold |  |  |  |
| touGroup |  | type de service |  |
| serviceCode |  | code de service qui reprend plusieurs information de cette classe |  |
| tosType | function | la fonction utilisé pour générer le paiement |  |


### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | 11 | 10 |
| seller | WEKIWI | 'WEKIWI' |
| channel |  |  |
| startDate | 01/01/1900 | '01/01/1900' |
| endDate |  |  |
| serviceCategory | 'COMMODITIES' | 'COMMODITIES' |
| serviceSubCategory |  |  |
| market | NULL | NULL |
| customerType |  |  |
| customerCategory | 'customerB2C' | 'customerB2C' |
| billingMode |  |  |
| paymentMode |  |  |
| posCategory |  |  |
| serviceDirection |  |  |
| dso |  |  |
| tso |  |  |
| consumptionThreshold |  |  |
| touGroup |  |  |
| serviceCode | 'PP_FREQ_3' | 'PP_FREQ_2' |
| tosType | 'fee(INSTALFREQ)' | 'fee(INSTALFREQ)' |

---

## Termes de services – TERM_OF_SERVICES

Les termes de service permettent de cibler les actions qui seront faites suite à la demande du client pour le service. C’est la deuxième étape dans le cheminement “entonnoir” vers l’action qui sera faite.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre majuscule + ‘-’ |  |
| tosType | string | fait référence à la classe TOS_TYPE |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| contractNbr | string | fait référence au numéro de contrat qu’on retrouve dans la classe CONTRACT |  |
| market |  | peut être EL ou NG |  |
| direction |  | généralement RACKING |  |
| touGroup |  | type de service |  |
| estimateAuthorized | bool | authorisation d’une estimation |  |
| priceType |  | type de prix |  |
| refDateForFixedPrice | date | date inférieur à la date de début |  |
| initialDuration | int | nombre de mois 12 généralement |  |
| minimumDuration | int | 6 généralement |  |
| default | int | 0 généralement |  |
| master | int | 0 généralement |  |
| exclusive | int | 0 généralement |  |
| status |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| tosType | tax(EL,CSPE) | fee(GREEN) |
| startDate | 05/12/2020 | 27/09/2020 |
| endDate |  |  |
| contractNbr | CTFDZTREWTR | CTFDPZ9HR1D |
| market | EL | EL |
| direction |  |  |
| touGroup | TOTAL_HOUR | TOTAL_HOUR |
| estimateAuthorized | 0 | 0 |
| priceType | STANDARD | STANDARD |
| refDateForFixedPrice |  |  |
| initialDuration |  |  |
| minimumDuration |  |  |
| default | 0 | 0 |
| master | 0 | 0 |
| exclusive | 0 | 0 |
| status | PENDING_START | PENDING_START |


---

## Conditions de démarrage des TOS – TOS_START_OPTION

Comme pour la partie “SERVICE”, il y a une classe tampon d’initialisation des termes de services.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id |  | peut être mono ou multi site |  |
| tosType | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| startDate | date | date dans le format JJ/MM/AAAA est 01/01/1900 |  |
| endDate | date | date dans le format JJ/MM/AAAA est fin du contrat |  |
| market |  | peut être EL ou NG |  |
| initialDuration | int | nombre de mois 12 généralement |  |
| minimumDuration | int | nombre de mois 6 généralement |  |
| renewalTosType |  |  |  |
| renewalDuration |  |  |  |
| priceMode |  | mode de prix variable ou fixé |  |
| priceType |  | type de prix |  |
| refDateTypeForFixedPrice |  | date inférieur à la date de début |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | 10 | 11 |
| tosType | fee(GREEN) | discount(PACKAGE,FLAT) |
| startDate | 01/01/1900 | 01/01/1900 |
| endDate |  |  |
| market |  |  |
| initialDuration |  |  |
| minimumDuration |  |  |
| renewalTosType |  |  |
| renewalDuration |  |  |
| priceMode | FIXED | VARIABLE |
| priceType | STANDARD | SPECIFIC |
| refDateTypeForFixedPrice | SUBSCRIPTION |  |

---

### Types de termes de service – TOS_TYPE

Afin de mettre une liaison entre le périmètre, de manière indirecte le client, et le contrat, cette classe répertorie le numéro du contrat et le périmètre associé.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| tosType | function | fonction explicitant l’action faite sur le service |  |
| tosCategory |  | En liaison avec le type de service |  |
| tosSubCategory |  | En liaison avec le type de service |  |
| defaultLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| string | date | décrit le service avec un paragraphe descriptif |  |
| market |  | correspond au type de marché selon le type d’énergie utilisé |  |
| default | int | 0 généralement |  |
| master | int | 0 généralement |  |
| exclusive | int | 0 généralement |  |
| touGroup |  | type de service |  |
| standardLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| otherLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| picture |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| tosType | discount(*,DIGITAL) | capacity(EL,C4,VAR,5P_PF) |
| tosCategory | DISCOUNT | SYPPLY |
| tosSubCategory | DIGITAL | CAPACITY |
| defaultLabel | Remise digitale | Termes de capacité Elec |
| description | En communiquant avec Wekiwi au travers des canaux de communication digitaux (e-mail, chat en ligne, espace client) plutôt que par téléphone, je bénéficie de la remise digitale. | Termes de capacité Elec |
| market |  | EL |
| default | 0 | 0 |
| master | 0 | 0 |
| exclusive | 0 | 0 |
| touGroup | TOTAL_HOUR | 5P_PF |
| standardLabel |  |  |
| otherLabel |  |  |
| picture |  |  |


---


## Élément de services — SE

Cette classe permet de relier le service à une formule mathématique pour quantifier la valeur du service

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | string | succession de chiffre et de lettre majuscule + ‘-’ |  |
| tosId | string | succession de chiffre et de lettre majuscule + ‘-’ correspondant à l’id généré dans la classe TERM_OF_SERVICES | TERM_OF_SERVICES |
| seType |  | type de d’éléments de service |  |
| seMaster | bool | 1 ou 0 |  |
| vatRate |  | tarification avec la TVA |  |
| rateType |  | le type de tarfication |  |
| operand | bool |  |  |
| operandType |  |  |  |
| factor |  |  |  |
| factorType |  |  |  |
| metered | bool | Y ou N |  |
| billingScheme |  | généralement Billable |  |
| accountingScheme |  | généralement Normal |  |
| estimateAuthorized | bool | généralement à 0 |  |
| touGroup |  | type de service |  |
| tou |  | type de service |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription |  |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| seStatus |  | généralement PENDING_START |  |
| minDayForEstimate | int | généralement est à 5 |  |
| seListBaseForSq |  |  |  |
| threshold | int |  |  |
| thresholdType | string |  |  |
| thresholdBase | string |  |  |
| sqType | string | énonce la formule utilisé avec l’unité |  |
| category |  | correspond au type de service |  |
| subCategory |  | correspond au type de service |  |
| analyticCode |  | correspond au type de service |  |
| additionalCode |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | id | id |
| tosId | id | id |
| seType | CONSUMPTION | VAT |
| seMaster | 1 | 0 |
| vatRate | NR |  |
| rateType | CONSUM |  |
| operand | 0 |  |
| operandType | CONSTANT |  |
| factor | -8 |  |
| factorType | CONSTANT |  |
| metered | Y |  |
| billingScheme | BILLABLE |  |
| accountingScheme | NORMAL |  |
| estimateAuthorized | 0 |  |
| touGroup | TOTAL_HOUR |  |
| tou | TOTAL_HOUR |  |
| startDate | 04/01/2021 | 27/10/2020 |
| endDate | 04/01/2022 |  |
| seStatus | PENDING_START | PENDING_START |
| minDayForEstimate | 5 |  |
| seListBaseForSq |  |  |
| threshold |  |  |
| thresholdType |  |  |
| thresholdBase |  |  |
| sqType | kWhPerTou |  |
| category |  |  |
| subCategory |  |  |
| analyticCode |  |  |
| additionalCode |  |  |

---

## Conditions de démarrage des éléments de service — SE_START_OPT

De la même façon, c’est une classe qui servira d’initialisation et liaison avec la section TOS.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | int | succession de chiffre qui donne un identificateur |  |
| tostype |  |  |  |
| seType |  | type de d’éléments de service |  |
| startDate | date | date dans le format JJ/MM/AAAA correspondant au début de la souscription | POS |
| endDate | date | date dans le format JJ/MM/AAAA correspondant à la fin de la souscription |  |
| category |  | correspond au type de service |  |
| subCategory |  | correspond au type de service |  |
| vatRate |  | tarification avec la TVA |  |
| premiseCondition |  |  |  |
| premiseValue | int |  |  |
| rateType |  | le type de tarfication |  |
| operand |  |  |  |
| operandType |  |  |  |
| factor | bool | 1 ou vide |  |
| factorType |  |  |  |
| billingScheme |  | généralement Billable |  |
| accountingScheme |  | généralement Normal |  |
| estimateAuthorized | bool | généralement à 0 |  |
| sqType |  |  |  |
| touGroup |  | type de service |  |
| tou |  | type de service |  |
| defaultSeStatus |  | généralement PENDING_START |  |
| minDayForEstimate | int |  |  |
| analyticCode |  | fait référence à la fonction utilisée |  |
| additionalCode |  |  |  |
| threshold |  |  |  |
| thresholdType |  |  |  |
| thresholdBase |  |  |  |
| seListBaseForSq |  |  |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | 10 | 110 |
| tosType | product(EL,THR,VAR,HL) | product(NG,B2B,VAR,TH) |
| seType | CONSUMPTION | SUBSCRIPTION |
| startDate | 01/01/1900 | 01/01/1900 |
| endDate |  |  |
| category | PRODUCT | PRODUCT |
| subCategory | PROPORTIONAL_PART | FIX_PART |
| vatRate | NR | RR |
| premiseCondition |  |  |
| premiseValue |  |  |
| rateType | CONSUM | SUBSCR(B2B,TH) |
| operand | 0 | 0 |
| operandType | CONSTANT | CONSTANT |
| factor | -8 | 1 |
| factorType | CONSTANT | CONSTANT |
| billingScheme | BILLABLE | BILLABLE |
| accountingScheme | NORMAL | NORMAL |
| estimateAuthorized | 0 | 0 |
| sqType | kWhPerTou | nbrOfDay |
| touGroup | HIGH_LOW | TOTAL_HOUR |
| tou | LOW | TOTAL_HOUR |
| defaultSeStatus | PENDING_START | PENDING_START |
| minDayForEstimate | 5 | 5 |
| analyticCode | CONSO_LOW | ABO |
| additionalCode | TRV-MIN-8 | TRV-MIN-8 |
| threshold |  |  |
| thresholdType |  |  |
| thresholdBase |  |  |
| seListBaseForSq |  |  |

---

## Type d’élément de service — SE_TYPE

Ici, on caractérise les types d’éléments de services

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| seType |  | type de d’éléments de service |  |
| seMaster | bool |  |  |
| masterSeTypeId |  | généralement CONSUMPTION |  |
| label | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| description | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| seCategory |  | fait référence au type de fonction utilisé |  |
| market |  | correspond au type de marché selon le type d’énergie utilisé |  |
| direction |  | généralement RACKING |  |
| metered | bool | Y ou N |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| seType | BILLABLE_CHARGE | DISCOUNT_ON_CONSUMPTION |
| seMaster | 0 | 0 |
| masterSeTypeId | CONSUMPTION | CONSUMPTION |
| label | Element de service - Charges facturables | Element de service - Remise sur la consommation |
| description | Charge facturable sous forme de montant fixe | Remise sur la consommation |
| seCategory | BILLABLE_CHARGE | DISCOUNT |
| market |  |  |
| direction | RACKING | RACKING |
| metered | N | Y |

---

## Type de quantité - SQ_TYPE


### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| sqType | string | type d’unité utilisé |  |
| measureType | Enum | fait référence au numéro de contrat qu’on retrouve dans la classe PERIMETER_CONTRACT |  |
| unit | string | l’unité en question |  |
| touGroup | Enum | type de service |  |
| label | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| description | string | une phrase explicitant le caractère de l’objet créé par la classe |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| sqType | kVAPerTouPerYear | sumEurFixBasedOnSe |
| measureType | PA | EURO |
| unit | kVAPerYear | euro |
| touGroup |  |  |
| label | une phrase explicitant le caractère de l’objet créé par la classe | Somme euros termes dépendants |
| description |  | Somme en euros des montants des termes dépendants |

---

## Tarif — RATE

Selon la formule de la classe SE, on évalue la valeur et le coût du service.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| id | long | succession de trois chiffre qui donne un identificateur au point de service |  |
| rateType | Enum | Est relié au service demandé par le client |  |
| priceType |  | type de prix, généralement STANDARD |  |
| market |  | Electrique ou gaz |  |
| startDate | date | une date sous forme JJ/MM/AAAA standard de référence au 01/01/2000 |  |
| endDate | date | fin du contrat sous forme JJ/MM/AAAA |  |
| customerType | Enum | donne le type de client professionnel ou particulier |  |
| customerCategory |  | en B2B ou B2C |  |
| channel |  |  |  |
| installmentFrequency | int |  |  |
| contractServiceSubCategory | Enum | détaille le type de contrat |  |
| posCategory | Enum | type de point de service |  |
| touGroup | Enum | type de service |  |
| gridRate | Enum |  |  |
| dgoCode | Enum | Renseigne la société de la distribution de l’énergie en question |  |
| tgoCode | Enum | Renseigne la société de transport de l’énergie en question |  |
| tou | Enum | type de service |  |
| unit | Enum | l’unité de l’énergie |  |
| threshold | int | Évaluation qui indique le paiement |  |
| thresholdType | Enum | Le type de pallier |  |
| thresholdBase | Enum | Évaluation de référence |  |
| price | float | prix selon l’unité utilisée |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| id | 54 | 6 |
| rateType | SUBSCR | SUBSCR |
| priceType | STANDARD | STANDARD |
| market | NG | EL |
| startDate | 01/01/2000 | 01/01/2000 |
| endDate |  |  |
| customerType |  | professional |
| customerCategory |  |  |
| channel |  |  |
| installmentFrequency |  |  |
| contractServiceSubCategory | NG.BASE |  |
| posCategory |  | C5 |
| touGroup | TOTAL_HOUR | HIGH_LOW |
| gridRate |  |  |
| dgoCode |  |  |
| tgoCode |  |  |
| tou | TOTAL_HOUR |  |
| unit | euro/year | euro/year |
| threshold |  | 12.00 |
| thresholdType |  | absolute |
| thresholdBase |  | capacity |
| price | 86.63999939 | 183.72000122 |

---

## Type de tarif — RATE_TYPE

Selon le type de service, nous avons un type d’évaluation pour donner le tarif.

### Attributs de l’objet

| Nom | Type | Descriptif | Liaison extérieur |
| --- | --- | --- | --- |
| rateType | Enum | Est relié au service demandé par le client |  |
| market |  | Electrique ou gaz |  |
| category | Enum | correspond au type de service |  |
| subCategory | Enum | correspond au type de service |  |
| defaultLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| description | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| standardLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |
| otherLabel | string | une phrase explicitant le caractère de l’objet créé par la classe |  |

### Exemple concret d’utilisation

| Nom | Exemple 1 | Exemple 2 |
| --- | --- | --- |
| rateType | DSO_CC | CONSUM |
| market | EL | EL |
| category | DSO | SUPPLIER |
| subCategory | FIX | ENERGY |
| defaultLabel | Composante de comptage | Consommation |
| description |  | Prix de référence des qualtités d'énergie consommées au compteur |
| standardLabel |  | Consumption |
| otherLabel |  |  |

![Diagram 1](public/images/diagrammes/diagram-1.png)

![Diagram 2](public/images/diagrammes/diagram-2.png)

![Diagram 3](public/images/diagrammes/diagram-3.png)

![Diagram 4](public/images/diagrammes/diagram-4.png)

![Diagram 5](public/images/diagrammes/diagram-5.png)

![Diagram 6](public/images/diagrammes/diagram-6.png)

![Diagram 7](public/images/diagrammes/diagram-7.png)

![Diagram 8](public/images/diagrammes/diagram-8.png)

![Diagram 9](public/images/diagrammes/diagram-9.png)

![Diagram 10](public/images/diagrammes/diagram-10.png)

![Diagram 2](public/images/diagrammes/diagram-2.png)

![Diagram 3](public/images/diagrammes/diagram-3.png)

![Diagram 4](public/images/diagrammes/diagram-4.png)

![Diagram 5](public/images/diagrammes/diagram-5.png)

![Diagram 6](public/images/diagrammes/diagram-6.png)

![Diagram 7](public/images/diagrammes/diagram-7.png)

![Diagram 8](public/images/diagrammes/diagram-8.png)

![Diagram 9](public/images/diagrammes/diagram-9.png)

![Diagram 10](public/images/diagrammes/diagram-10.png)