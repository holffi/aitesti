function createCasenpaloittelu(kuvaus) {
  return `Erittele asiakkaan esittämä ongelma tai kysymys osiin seuraavien näkökulmien avulla:

Osapuolet: Ketkä ovat keskeisiä sidosryhmiä tai vaikuttajia (esim. loppukäyttäjät, IT-tiimi, liiketoimintajohto, palveluntarjoajat)?
Liiketoiminnan tarpeet: Mitä asiakas haluaa saavuttaa? Mikä on tärkein hyöty tai ratkaistava kipukohta?
Tekniset elementit: Mitä järjestelmiä, sovelluksia, infrastruktuuria tai integraatioita ongelma koskee?
Rajoitteet ja vaatimukset: Onko olemassa budjettiin, tietoturvaan, skaalautuvuuteen tai sääntelyyn liittyviä vaatimuksia?
Mahdolliset ratkaisut: Mitä eri vaihtoehtoja on ongelman ratkaisemiseksi? Onko kyseessä konfigurointi-, prosessi- vai tekninen muutos?

Ei johdantoa tai muita selityksiä. Älä lisää viitteitä tekstiin.

Haluan sinun hyödyntävän ensisijaisesti vector storessa olevia dokumentteja ('accountmanager') vastauksen laatimiseen.

Tässä on asiakkaan kysymys/ongelma: '${kuvaus}'.

Älä lisää johdantoa tai yhteenvetoa vastaukseen. Älä lisää viitteitä vastaukseen. Anna vastaukset listana ja otsikot lihavoituna.`;
}
export {createCasenpaloittelu};
