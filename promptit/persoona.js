function createPersona(kuvaus) {
  return `Tavoitteena on luoda käyttäjäpersoonia sovellukselle tai yritykselle jonka kuvaus on seuraava: "${kuvaus}". Haluan sinun hyödyntävän ensisijaisesti vector storessa olevia dokumentteja ('testi') niiden laatimiseen. Suunnittele kolme erilaista käyttäjäpersoonaa noudattaen näitä ohjeita:

  Analysoi 'testi'-storagen asiakirjat: Käytä nimenomaan näitä dokumentteja tietolähteinä. Poimi dokumenteista olennaisia tietoja, jotka liittyvät käyttäjäpersoonien tarpeisiin, haasteisiin ja käyttäytymismalleihin.

  Dokumentteihin pohjautuvat havainnot: Varmista, että jokainen luotu käyttäjäpersoona perustuu selvästi dokumenteista tehtyihin havaintoihin. Kirjaa ylös dokumenttikohtaisia viitteitä tai merkintöjä, jotka tukevat persoonan piirteitä ja tarpeita.

  Integroi konteksti: Luo persoonat sovelluksen kohderyhmää ja käyttökontekstia silmällä pitäen. Jos mahdollista, mainitse asiakirjojen tarjoamat kontekstuaaliset näkökulmat.

  Kirjoita jokaiselle persoonaa lyhyt kuvaus sisältäen nimi, taustatarina, tavoitteet, tarpeet ja haasteet. Varmista, että jokainen osa-alue juontaa juurensa suoraan vector storagen dokumenteista"

  Vastaus tulisi olla tämän esimerkin mukainen:
  ## Persoona 1: Nimi

     - **Taustatarina:** Taustatarina
     - **Tavoitteet:** Tavoitteet
     - **Tarpeet:** Tarpeet
     - **Haasteet:** Haasteet

  Vastauksessa pitää olla pelkät persoonat, ei johdantoa tai muita selityksiä. Älä lisää viitteitä tekstiin.
  `;
}
export {createPersona};
