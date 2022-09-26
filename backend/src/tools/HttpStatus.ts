enum HttpStatusCode {

////////////////////////////////
//// Réponses informatives /////
////////////////////////////////

    Continue = 100,
// Cette réponse intermédiaire indique que tout est OK pour le moment et que le client peut continuer sa requête ou l'ignorer si celle-ci est déjà finie.

    SwitchingProtocol = 101,
// Ce code est envoyé en réponse à un en-tête de requête Upgrade (en-US) de la part du client et indique le protocole sur lequel passe le serveur.

    Processing = 102,
// Ce code indique que le serveur a reçu et est en train de traiter une la requête mais qu'une réponse n'est pas encore disponible.

    EarlyHints = 103,
// Ce code de statut est conçu pour être utilisé avec l'en-tête Link (en-US), ce qui permet à l'agent utilisateur de commencer le préchargement des ressources tandis que le serveur prépare une réponse.


/////////////////////////////
//// Réponses de succès /////
/////////////////////////////

    OK = 200,
// La requête a réussi. La signification du succès peut varier selon la méthode HTTP :

// GET : La ressource a été récupérée et est retransmise dans le corps du message.
// HEAD : Les en-têtes d'entité sont présents dans la réponse et il n'y a pas de corps.
// PUT ou POST : La ressource décrivant le résultat de l'action est transmise dans le corps du message.
// TRACE : Le corps du message contient le message de requête tel que reçu par le serveur

    Created = 201,
// La requête a réussi et une nouvelle ressource a été créée en guise de résultat. Il s'agit typiquement de la réponse envoyée après une requête PUT ou POST.

    Accepted = 202,
// La requête a été reçue mais n'a pas encore été traitée. C'est une réponse évasive, ce qui signifie qu'il n'y a aucun moyen en HTTP d'envoyer une réponse asynchrone ultérieure indiquant le résultat issu du traitement de la requête. Elle est destinée aux cas où un autre processus ou serveur gère la requête, et peut être utile pour faire du traitement par lots.

    NonAuthoritativeInformation = 203,
// Ce code de réponse signifie que l'ensemble de méta-informations renvoyé n'est pas exactement l'ensemble disponible sur le serveur d'origine, mais plutôt un ensemble collecté à partir d'une copie locale ou tierce. Ce code est utilisé la plupart du temps par les serveurs miroirs ou de sauvegarde d'une autre ressource. À l'exception de cette condition, une réponse 200 OK est préférable.

    NoContent = 204,
// Il n'y a pas de contenu à envoyer pour cette requête, mais les en-têtes peuvent être utiles. L'agent utilisateur peut mettre à jour ses en-têtes en cache pour cette ressource en les remplaçant par les nouveaux.

    ResetContent = 205,
// Indique à l'agent utilisateur de réinitialiser le document qui a envoyé cette requête.

    PartialContent = 206,
// Ce code de réponse est utilisé en réaction à l'en-tête Range (en-US) envoyé par le client pour séparer le téléchargement en plusieurs flux.

    MultiStatus = 207,
// Une réponse multi-statut donne des informations sur des ressources multiples dans les situations où les codes de statut multiples sont appropriés.

    AlreadyReported = 208,
// Utilisé au sein d'un élément de réponse DAV <dav:propstat> pour éviter d'énumérer à maintes reprises les membres internes de bindings multiples vers la même collection.

    IMUsed = 226,
// Le serveur a exécuté une requête GET pour la ressource, et la réponse est une représentation du résultat d'une ou plusieurs manipulations d'instance appliquées à l'instance courante.


//////////////////////////////////
//// Messages de redirection /////
//////////////////////////////////

    MultipleChoice = 300,
// La requête a plusieurs réponses possibles. L'agent utilisateur ou l'utilisateur doit choisir l'une d'entre elles. Il n'y a pas de manière standard pour choisir l'une de ces réponses mais des liens HTML vers les choix sont recommandés afin de permettre à l'utilisateur de choisir.

    MovedPermanently = 301,
// Ce code de réponse signifie que l'URL de la ressource demandée a été modifiée. Une nouvelle URL est donnée dans la réponse.

    Found = 302,
// Ce code de réponse indique que l'URI de la ressource demandée a été modifiée temporairement. De nouveaux changements dans l'URI pourront être effectués ultérieurement. Par conséquent, cette même URI devrait être utilisée par le client pour les requêtes futures.

    SeeOther = 303,
// Le serveur a envoyé cette réponse pour diriger le client vers la ressource demandée via un autre URI en utilisant une requête GET.

    NotModified = 304,
// Ce code est utilisé pour des raisons de cache. Il indique au client que la réponse n'a pas été modifiée. De fait, le client peut continuer à utiliser la même version de la réponse, mise en cache.

    UseProxy = 305, 
// A été défini dans une version antérieure de la spécification HTTP pour indiquer qu'une réponse sollicitée doit transiter par un proxy. Ce code est aujourd'hui périmé pour des raisons de sécurité relatives à la configuration d'un proxy.

    Unused = 306,
// Ce code de réponse n'est plus en service, son usage est actuellement réservé. Il était utilisé dans une version précédente de la spécification HTTP/1.1.

    TemporaryRedirect = 307,
// Le serveur a envoyé cette réponse pour rediriger le client afin d'obtenir la ressource demandée via un autre URI, en utilisant la même méthode que précédemment. Ce code a la même sémantique que le code 302 Found, à l'exception près que l'agent utilisateur ne doit pas changer la méthode HTTP utilisée : si POST était utilisé dans la première requête, alors POST doit être utilisé dans la seconde.

    PermanentRedirect = 308,
// Cela signifie que la ressource a été déplacée de manière permanente vers une autre URI, spécifiée dans l'en-tête de réponse HTTP Location:. Ce code a la même sémantique que le code 301 Moved Permanently, à l'exception près que l'agent utilisateur ne doit pas changer la méthode HTTP utilisée : si POST était utilisé dans la première requête, alors POST doit être utilisé dans la seconde.


////////////////////////////////////////
//// Réponses d'erreur côté client /////
////////////////////////////////////////

    BadRequest = 400,
// Cette réponse indique que le serveur n'a pas pu comprendre la requête à cause d'une syntaxe invalide.

    Unauthorized = 401,
// Bien que le standard HTTP indique « non-autorisé », la sémantique de cette réponse correspond à « non-authentifié » : le client doit s'authentifier afin d'obtenir la réponse demandée.

    PaymentRequired = 402,
// Ce code de réponse est réservé à une utilisation future. Le but initial justifiant la création de ce code était l'utilisation de systèmes de paiement numérique. Cependant, il n'est pas utilisé actuellement et aucune convention standard n'existe à ce sujet.

    Forbidden = 403,
// Le client n'a pas les droits d'accès au contenu, donc le serveur refuse de donner la véritable réponse.

    NotFound = 404,
// Le serveur n'a pas trouvé la ressource demandée. Ce code de réponse est principalement connu pour son apparition fréquente sur le web.

    MethodNotAllowed = 405,
// La méthode de la requête est connue du serveur mais n'est pas prise en charge pour la ressource cible. Par exemple, une API peut ne pas autoriser l'utilisation du verbe DELETE pour supprimer une ressource.

    NotAcceptable = 406,
// Cette réponse est envoyée quand le serveur web, après une négociation de contenu géré par le serveur (en-US), ne trouve rien qui satisfasse les critères donnés par l'agent utilisateur.

    ProxyAuthenticationRequired = 407,
// Similaire au code 401, sauf que l'authentification doit être effectuée au travers d'un proxy.

    RequestTimeout = 408,
// Cette réponse est envoyée via une connexion en attente par certains serveurs, même sans qu'il y ait de requête préalable de la part du client. Cela signifie que le serveur aimerait fermer cette connexion inutilisée. Cette réponse est bien plus utilisée depuis que certains navigateurs, comme Chrome, Firefox 27+ ou IE9, utilisent des mécanismes de préconnexion HTTP pour accélérer la navigation. Notez aussi que certains serveurs ferment simplement la connexion sans même envoyer ce message.

    Conflict = 409,
// Cette réponse est envoyée quand une requête entre en conflit avec l'état actuel du serveur.

    Gone = 410,
// Cette réponse est envoyée lorsque le contenu demandé a été supprimé de façon permanente du serveur, sans nouvelle adresse. Les clients doivent vider les caches et liens associés à cette ressource. La spécification HTTP a conçu ce code de statut pour qu'il soit utilisé pour des « services promotionnels limités dans le temps ». Les API ne devraient pas se sentir obligées d'indiquer que des ressources ont été supprimées avec ce code de statut.
    
    LengthRequired = 411,
// Le serveur a rejeté la requête, car le champ d'en-tête Content-Length n'est pas défini et le serveur l'impose.

    PreconditionFailed = 412,
// Le client a indiqué des préconditions dans ses en-têtes que le serveur ne remplit pas.

    PayloadTooLarge = 413,
// L'entité demandée est plus grosse que la limite définie par le serveur. Le serveur peut fermer la connexion ou retourner un champ d'en-tête Retry-After.

    URITooLong = 414,
// L'URI interrogé par le client est plus long que ce que le serveur est en mesure d'interpréter.

    UnsupportedMediaType = 415,
// Le format média des données demandées n'est pas supporté par le serveur, donc le serveur rejette la requête.

    RequestedRangeNotSatisfiable = 416,
// La plage spécifiée par le champ d'en-tête Range de la requête ne peut pas être satisfaite ; il est possible que la plage excède la taille des données provenant de l'URI ciblé.

    ExpectationFailed = 417,
// Ce code de réponse signifie que les attentes indiquées par le champ d'en-tête de requête Expect n'ont pas pu être satisfaites par le serveur.

    IAmATeapot = 418,
// Le serveur refuse de brasser du café avec une théière.

    MisdirectedRequest = 421,
// La requête a été envoyée à un serveur incapable de produire une réponse. Ce code peut être envoyé par un serveur qui n'a pas été configuré pour produire des réponses sujettes à la combinaison de schémas et d'identités incluse dans l'URI de la requête.

    UnprocessableEntity = 422,
// La requête a bien été constituée mais n'a pas pu être traitée à cause d'erreurs sémantiques.

    Locked = 423,
// La ressource qui est en train d'être consultée est verrouillée.

    FailedDependency = 424,
// La requête a échoué à cause de l'échec d'une requête précédente.

    TooEarly = 425,
// Indiquer que le serveur ne souhaite pas traiter une requête qui pourrait être rejouée.

    UpgradeRequired = 426,
// Le serveur refuse de traiter la requête en utilisant le protocole actuel mais peut accepter de le faire si le client opte pour un autre protocole. Le serveur doit envoyer un en-tête Upgrade (en-US) dans la réponse 426 pour indiquer le(s) protocole(s) demandé(s) (Section 6.7 de [RFC7230]).

    PreconditionRequired = 428,
// Le serveur d'origine impose que la requête soit conditionnelle. Ceci est prévu pour empêcher le problème de 'perte de mise à jour', où un client récupère l'état d'une ressource avec GET, le modifie, et le renvoie au serveur avec PUT pendant qu'un tiers modifie l'état du serveur, ce qui conduit à un conflit.

    TooManyRequests = 429,
// L'utilisateur a émis trop de requêtes dans un laps de temps donné.

    RequestHeaderFieldsTooLarge = 431,
// Le serveur n'est pas disposé à traiter la requête, car les champs d'en-tête sont trop longs. La requête peut être renvoyée après avoir réduit la taille des en-têtes.

    UnavailableForLegalReasons = 451,
// L'utilisateur tente d'accéder à une ressource illégale, telle qu'une page censurée par un gouvernement.


/////////////////////////////////////////
//// Réponses d'erreur côté serveur /////
/////////////////////////////////////////

    InternalServerError = 500,
// Le serveur a rencontré une situation qu'il ne sait pas traiter.

    NotImplemented = 501,
// La méthode de requête n'est pas supportée par le serveur et ne peut pas être traitée. Les seules méthodes que les serveurs sont tenus de prendre en charge (et donc pour lesquelles ils ne peuvent pas renvoyer ce code) sont GET et HEAD.

    BadGateway = 502,
// Cette réponse d'erreur signifie que le serveur, alors qu'il fonctionnait en tant que passerelle pour recevoir une réponse nécessaire pour traiter la requête, a reçu une réponse invalide.

    ServiceUnavailable = 503,
// Le serveur n'est pas prêt pour traiter la requête. Les causes les plus communes sont que le serveur est éteint pour maintenance ou qu'il est surchargé. Notez qu'avec cette réponse, une page ergonomique peut expliquer le problème. Ces réponses doivent être utilisées temporairement et le champ d'en-tête Retry-After doit, dans la mesure du possible, contenir une estimation de l'heure de reprise du service. Le webmestre doit aussi faire attention aux en-têtes de mise en cache qui sont envoyés avec cette réponse (qui ne doivent typiquement pas être mis en cache).

    GatewayTimeout = 504,
// Cette réponse d'erreur est renvoyée lorsque le serveur sert de passerelle et ne peut pas donner de réponse dans les temps.

    HTTPVersionNotSupported = 505,
// La version de HTTP utilisée dans la requête n'est pas prise en charge par le serveur.

    VariantAlsoNegotiates = 506,
// Le serveur a une erreur de configuration interne : la négociation de contenu transparente pour la requête aboutit à une dépendance circulaire.

    InsufficientStorage = 507,
// Le serveur a une erreur de configuration interne : la ressource sélectionnée est configurée pour participer elle-même à une négociation de contenu transparente, et n'est par conséquent pas un nœud terminal valable dans le processus de négociation.

    LoopDetected = 508,
// Le serveur a détecté une boucle infinie en traitant la requête.

    NotExtended = 510,
// Des extensions supplémentaires sont requises afin que le serveur puisse satisfaire la requête.

    NetworkAuthenticationRequired = 511
// Le code de statut 511 indique que le client doit s'authentifier afin de pouvoir accéder au réseau.

}

export { HttpStatusCode };