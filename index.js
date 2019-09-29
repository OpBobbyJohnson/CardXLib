import { parse } from './parser';
import CardX from './CardX'
import data from "@solid/query-ldflex";
const $rdf = require("rdflib");
var oldData;
var oldStore;
const getQueries = async () => {
    return new Promise(
        async (resolve, reject) => {
            let obj = await fetch('./test.json');
            let dat = await obj.json();
            resolve(dat);
        }
    )
}
// basic queries that get everything from card and cardx
const cardQuery = `select ?me ?id1 ?id2 ?id3 ?nameVal ?address ?city ?email ?foafName ?phoneNumber ?state ?zipcode
where {
  ?me <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Person> .
  ?me <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://xmlns.com/foaf/0.1/Person> .
  ?me <http://www.w3.org/2006/vcard/ns#fn> ?nameVal .
  ?me <http://www.w3.org/2006/vcard/ns#hasAddress> ?id1 .
  ?me <http://www.w3.org/2006/vcard/ns#hasEmail> ?id2 .
  ?me <http://www.w3.org/2006/vcard/ns#hasTelephone> ?id3 .
  ?me <http://xmlns.com/foaf/0.1/name> ?foafName.
  ?id1 <http://www.w3.org/2006/vcard/ns#locality> ?city .
  ?id1 <http://www.w3.org/2006/vcard/ns#postal-code> ?zipcode .
  ?id1 <http://www.w3.org/2006/vcard/ns#region> ?state .
  ?id1 <http://www.w3.org/2006/vcard/ns#street-address> ?address .
  ?id2 <http://www.w3.org/2006/vcard/ns#value> ?email .
  ?id3 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2006/vcard/ns#Dom> .
  ?id3 <http://www.w3.org/2006/vcard/ns#value> ?phoneNumber .
}`
// this boi is a thiccc query
const bigBoiQuery = `SELECT Distinct ?city ?county ?state ?streetAddress ?telephoneNumber ?lastName ?firstName ?email ?zipcode
WHERE { 
  ?Person <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/Person>.
  ?Person <http://www.ontologyrepository.com/CommonCoreOntologies/agent_in> ?ActOfOwnership.
  ?Person <http://www.ontologyrepository.com/CommonCoreOntologies/agent_in> ?ActOfOwnership2.
  ?Person <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?ProperName.
  ?Person <http://www.ontologyrepository.com/CommonCoreOntologies/uses> ?Email.
  ?ActOfOwnership <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/ActOfOwnership>.
  ?ActOfOwnership <http://www.ontologyrepository.com/CommonCoreOntologies/has_object> ?ResidentialFacility.
  ?ResidentialFacility <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/ResidentialFacility>.
  ?ResidentialFacility <http://purl.obolibrary.org/obo/RO_0001025> ?GeospatReg.
  ?GeospatReg <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/GeospatialRegion>.
  ?GeospatReg <http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminReg.
  ?LocalAdminReg <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/LocalAdministrativeRegion>.
  ?LocalAdminReg <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?DesName1.
  ?LocalAdminReg <http://purl.obolibrary.org/obo/BFO_0000050> ?County.
  ?LocalAdminReg <http://purl.obolibrary.org/obo/BFO_0000050> ?State.
  ?DesName1 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/DesignativeName>.
  ?DesName1 <http://purl.obolibrary.org/obo/RO_0010001> ?IBE1.
  ?IBE1 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE1 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?city.
  ?County <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/County>.
  ?County <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?DesName2.
  ?DesName2 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/DesignativeName>.
  ?DesName2 <http://purl.obolibrary.org/obo/RO_0010001> ?IBE2.
  ?IBE2 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE2 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?county.
  ?State <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/State>.
  ?State <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?DesName3.
  ?DesName3 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/DesignativeName>.
  ?DesName3 <http://purl.obolibrary.org/obo/RO_0010001> ?IBE3.
  ?IBE3 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE3 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?state.
  ?ResidentialFacility <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?StreetAddress.
  ?StreetAddress <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/StreetAddress>.
  ?StreetAddress <http://purl.obolibrary.org/obo/RO_0010001> ?IBE4.
  ?IBE4 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE4 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?streetAddress.
  ?ActOfOwnership2 <http://www.ontologyrepository.com/CommonCoreOntologies/has_object> ?Telephone.
  ?Telephone <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/Telephone>.
  ?Telephone <http://purl.obolibrary.org/obo/RO_0000056> ?TelephoneNumber.
  ?TelephoneNumber <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/StasisOfTelecommunicationEndpointAssignment>.
  ?TelephoneNumber <http://purl.obolibrary.org/obo/RO_0000057> ?TelephoneNumberValue.
  ?TelephoneNumberValue <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/TelecommunicationEndpoint>.
  ?TelephoneNumberValue <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?Value.
  ?Value <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/TelephoneNumber>.
  ?Value <http://purl.obolibrary.org/obo/RO_0010001> ?IBE5.
  ?IBE5 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE5 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?telephoneNumber.
  ?ProperName <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/ProperName>.
  ?ProperName <http://purl.obolibrary.org/obo/RO_0010001> ?IBE6.
  ?IBE6 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE6 <http://purl.obolibrary.org/obo/BFO_0000051> ?FirstName.
  ?IBE6 <http://purl.obolibrary.org/obo/BFO_0000051> ?LastName.
  ?FirstName <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/GivenNameBearingEntityPart>.
  ?FirstName <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?firstName.
  ?LastName <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/FamilyNameBearingEntityPart>.
  ?LastName <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?lastName.
  ?Email <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/EmailBox>.
  ?Email <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?EmailAddress.
  ?EmailAddress <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/EmailAddress>.
  ?EmailAddress <http://purl.obolibrary.org/obo/RO_0010001> ?IBE7. 
  ?IBE7 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE7 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?email.
  ?GeospatReg <http://purl.obolibrary.org/obo/BFO_0000050> ?PostalZone.
  ?PostalZone <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/PostalZone>.
  ?PostalZone <http://www.ontologyrepository.com/CommonCoreOntologies/designated_by> ?PostalCode.
  ?PostalCode <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/PostalCode>.
  ?PostalCode <http://purl.obolibrary.org/obo/RO_0010001> ?IBE8.
  ?IBE8 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.ontologyrepository.com/CommonCoreOntologies/InformationBearingEntity>.
  ?IBE8 <http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value> ?zipcode.
}`

export default class Transform {
    constructor(URL) {
        this.state = {};
        this.url = URL;
        this.getStandardInfo = this.getStandardInfo.bind(this);
        this.loadDataToStore = this.loadDataToStore.bind(this);
        this.getCardXInfo = this.getCardXInfo.bind(this);
        this.ingestCardData = this.ingestCardData.bind(this);
    }

    getCardXInfo = async () => {
        let card = new CardX(this.url);
        let address = await card.getHomeAddress();
        let fname = await card.getFirstName();
        let state = await card.getHomeState();
        let county = await card.getHomeCounty();
        let lastName = await card.getLastName();
        let city = await card.getHomeCity();
        let zipcode = await card.getHomeZipCode();
        let email = await card.getEmail();
        let phoneNum = await card.getPhoneNumber();
        this.state = {
            firstName: fname,
            lastName: lastName,
            email: email,
            city: city,
            state: state,
            streetAddress: address,
            zipcode: zipcode,
            phoneNum: phoneNum
        }
        oldData = this.state;
    }

    // RG - 2019-02-28
    // Loads the data from a URL into the local store
    loadFromUrl = (url, store) => {
        return new Promise((resolve, reject) => {
            let fetcher = new $rdf.Fetcher(store);
            try {
                fetcher.load(url).then(response => {
                    resolve(response.responseText);
                    // console.debug(response.responseText);
                    // $rdf.parse(response.responseText, store, $rdf.sym(url).uri,"application/rdf");
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // RG - 2019-02-28
    // Prepares a query by converting SPARQL into a Solid query
    prepare = (qryStr, store) => {
        return new Promise((resolve, reject) => {
            try {
                let query = $rdf.SPARQLToQuery(qryStr, false, store);
                resolve(query);
            } catch (err) {
                reject(err);
            }
        });
    };

    // RG - 2019-02-28
    // Executes a query on the local store
    execute = (qry, store) => {
        return new Promise((resolve, reject) => {
            // console.debug("here");
            const wanted = qry.vars;
            const resultAry = [];
            ; store.query(
                qry,
                results => {
                    // console.debug("here1");
                    if (typeof results === "undefined") {
                        reject("No results.");
                    } else {
                        let row = this.rowHandler(wanted, results);
                        // console.debug(row);
                        if (row) resultAry.push(row);
                    }
                },
                {},
                () => {
                    resolve(resultAry);
                }
            );
        });
    };

    // RG - 2019-02-28
    // Puts query results into an array according to the projection
    rowHandler = (wanted, results) => {
        const row = {};
        for (var r in results) {
            let found = false;
            let got = r.replace(/^\?/, "");
            if (wanted.length) {
                for (var w in wanted) {
                    if (got === wanted[w].label) {
                        found = true;
                        continue;
                    }
                }
                if (!found) continue;
            }
            row[got] = results[r].value;
        }
        return row;
    };

    async getData(query, store) {
        // loading new events
        // let store = $rdf.graph();
        //console.log(query);
        return new Promise(
            async (resolve, reject) => {
                this.loadFromUrl(this.url, store).then(() =>
                    this.prepare(query, store).then(qry =>
                        this.execute(qry, store).then(results => {
                            for (let x = 0; x < results.length; x++) {
                            }
                            resolve(results);
                        })
                    )
                )
            }
        )
    }


    getStandardInfo = async () => {
        return new Promise(
            async (resolve, reject) => {
                let startTime = new Date();
                let user = data[this.url];
                let name = await user['name'];
                let fname = name.toString().split(' ')[0];
                let lname = name.toString().split(' ')[1];
                let email = await user['vcard:hasEmail']['vcard:value'];
                let city = await user['vcard:hasAddress']['vcard:locality'];
                let state = await user['vcard:hasAddress']['vcard:region'];
                let streetAddress = await user['vcard:hasAddress']['vcard:street-address'];
                let zipcode = await user['vcard:hasAddress']['vcard:postal-code'];
                let phoneNum = await user['vcard:hasTelephone']['vcard:value'];
                let oldDat = await this.getData(cardQuery, $rdf.graph());
                oldDat = oldDat[0];
                oldData = `${oldDat.me} <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> schem:Person .
                ${oldDat.me} <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> http://xmlns.com/foaf/0.1/Person .
                ${oldDat.me} http://www.w3.org/2006/vcard/ns#fn "${oldDat.nameVal}" .
                ${oldDat.me} http://www.w3.org/2006/vcard/ns#hasAddress ${oldDat.id1} .
                ${oldDat.me} http://www.w3.org/2006/vcard/ns#hasEmail ${oldDat.id2} .
                ${oldDat.me} http://www.w3.org/2006/vcard/ns#hasTelephone ${oldDat.id3} .
                ${oldDat.me} http://xmlns.com/foaf/0.1/name "${oldDat.foafName}".
                ${oldDat.id1} http://www.w3.org/2006/vcard/ns#locality "${oldDat.city}" .
                ${oldDat.id1} http://www.w3.org/2006/vcard/ns#postal-code "${oldDat.zipcode}" .
                ${oldDat.id1} http://www.w3.org/2006/vcard/ns#region "${oldDat.state}" .
                ${oldDat.id1} http://www.w3.org/2006/vcard/ns#street-address "${oldDat.address}" .
                ${oldDat.id2} http://www.w3.org/2006/vcard/ns#value <${oldDat.email}> .
                ${oldDat.id3} <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> http://www.w3.org/2006/vcard/ns#Dom .
                ${oldDat.id3} http://www.w3.org/2006/vcard/ns#value <${oldDat.phoneNumber}> .`;
                let oldDataStore = $rdf.graph();
                oldStore = this.loadDataToStore(oldData, oldDataStore);
                this.state = {
                    name: name.toString(),
                    email: email.toString(),
                    city: city.toString(),
                    state: state.toString(),
                    streetAddress: streetAddress.toString(),
                    zipcode: zipcode.toString(),
                    phoneNum: phoneNum.toString()
                }
                oldData = this.state;
                console.log('old data is');
                console.log(JSON.stringify(oldData, null, 2));

                let endTime = new Date();
                resolve();
            }

        );
    }

    convertCardToCardX = async (store) => {
        if (!store) {
            store = $rdf.graph();
        }
        await this.getStandardInfo();
        let udata = await fetch('./cardX.nt');
        let text = await udata.text();
        let ingestedData = '';
        for (let line of text.split('\n')) {
            let term = line.split(' ')[2];
            switch (term) {
                case '"first_name"':
                    line = line.replace(term, `"${this.state.name.split(' ')[0]}"`);
                    break;
                case '"last_name"':
                    line = line.replace(term, `"${this.state.name.split(' ')[1]}"`);
                    break;
                case '"email"':
                    line = line.replace(term, `"${this.state.email}"`);
                    break;
                case '"phone_number"':
                    line = line.replace(term, `"${this.state.phoneNum}"`);
                    break;
                case '"home_street_address"':
                    line = line.replace(term, `"${this.state.streetAddress}"`);
                    break;
                case '"home_city"':
                    line = line.replace(term, `"${this.state.city}"`);
                    break;
                case '"home_state"':
                    line = line.replace(term, `"${this.state.state}"`);
                    break;
                case '"home_zip"':
                    line = line.replace(term, `"${this.state.zipcode}"`);
                    break;
            }
            ingestedData += line + '\n';
        }

        let newStore = await parse(ingestedData, 'me', this.url.split("#")[0] + '#');
        // ingestedData = '';
        // for (let line of res) {
        //     ingestedData += line + '\n';
        // }
        // console.log(ingestedData)
        // let newStore = this.loadDataToStore(ingestedData, store);
        return newStore;
    }

    convertCardXToCard = async (store) => {
        if (!store) {
            store = $rdf.graph();
        }
        await this.getCardXInfo();
        let data = this.ingestCardData();
        let newStore = this.loadDataToStore(data, store);
        return newStore;
    }
    // ingests the data from CardX into the card and loads it into the local triplestore
    ingestCardData = (udata) => {
        if (!udata) {
            udata = this.state
        }
        let hash = Date.now();
        let cardData =
            `:me <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> http://schema.org/Person .
        :me <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> http://xmlns.com/foaf/0.1/Person .
        :me http://www.w3.org/2006/vcard/ns#fn "${udata.firstName} ${udata.lastName}" .
        :me http://www.w3.org/2006/vcard/ns#hasAddress :id${hash} .
        :me http://www.w3.org/2006/vcard/ns#hasEmail :id${hash + 1} .
        :me http://www.w3.org/2006/vcard/ns#hasTelephone :id${hash + 2} .
        :me http://xmlns.com/foaf/0.1/name "${udata.firstName + " " + udata.lastName}".
        :id${hash} http://www.w3.org/2006/vcard/ns#locality "${udata.city}" .
        :id${hash} http://www.w3.org/2006/vcard/ns#postal-code "${udata.zipcode}" .
        :id${hash} http://www.w3.org/2006/vcard/ns#region "${udata.state}" .
        :id${hash} http://www.w3.org/2006/vcard/ns#street-address "${udata.streetAddress}" .
        :id${hash + 1} http://www.w3.org/2006/vcard/ns#value <mailto:${udata.email}> .
        :id${hash + 2} <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> http://www.w3.org/2006/vcard/ns#Dom .
        :id${hash + 2} http://www.w3.org/2006/vcard/ns#value <tel:${udata.phoneNum}> .`;
        return cardData;
    }

    loadDataToStore = (udata, store) => {
        let line;
        let me = store.sym(this.url.split("#")[0] + '#');
        let profile = me.doc();
        for (line of udata.split('\n')) {
            if (line === '') {
                continue;
            }
            line = line.trim();
            // if (line.split(' ')[1] === '<http://www.ontologyrepository.com/CommonCoreOntologies/has_text_value>') {
            //     let tmp = `"${line.split(' ')[2]}"`;
            //     line = line.replace(line.split(' ')[2], tmp);
            // }
            line = line.replace(/</g, '').replace(/>/g, '');
            let arr = line.split(' ');
            if (arr[2].startsWith('"')) {
                let tmp = `"${line.split('"')[1]}"`
                store.add(store.sym(arr[0]), store.sym(arr[1]), tmp, profile);
            } else {
                store.add(store.sym(arr[0]), store.sym(arr[1]), store.sym(arr[2]), profile);
            }
        }
        return store;
    }



    updatePODCard = async (store) => {
        return new Promise(
            async (resolve, rej) => {
                let me = store.sym(this.url);
                let profile = me.doc();
                let newStore = $rdf.graph();
                let queries = await getQueries();
                let getDatFromStore = async (query, astore) => {
                    return new Promise(
                        (resolve, reject) => {
                            console.log(query);
                            this.prepare(query, astore).then(qry =>
                                this.execute(qry, astore).then(results => {
                                    console.log(results[0]);
                                    resolve(results);
                                })
                            )
                        }
                    )
                }
                // retrieve data from store
                let dat = await getDatFromStore(bigBoiQuery, store);
                let newData = {
                    name: `${dat[0].firstName} ${dat[0].lastName}`,
                    email: dat[0].email,
                    city: dat[0].city,
                    state: dat[0].state,
                    streetAddress: dat[0].streetAddress,
                    zipcode: dat[0].zipcode,
                    phoneNum: dat[0].telephoneNumber
                }
                // let newData = {
                //     name: `Dylan Martin`,
                //     email: `dylanm@udel.edu`,
                //     city: `Newark`,
                //     state: `Delaware`,
                //     streetAddress: `804 North Country Club Dr.`,
                //     zipcode: `19711`,
                //     phoneNum: `3022763808`
                // }
                console.log(JSON.stringify(newData, null, 2))


                // let updater = new $rdf.UpdateManager(newStore);
                // let fetcher = new $rdf.Fetcher(newStore);
                // await fetcher.load(profile);
                // // console.log(newStore.toString());
                // let insertStatements = [];
                // let deleteStatements = [];
                for (let key of Object.keys(oldData)) {
                    if (oldData[key] !== newData[key]) {
                        let user = data[this.url];
                        let s = async (key) => {
                            switch (key) {
                                case 'name':
                                    await user['vcard:fn'].set(`${newData[key]}`);
                                    await user['name'].set(`${newData[key]}`);
                                    return;
                                case 'email':
                                    await user['vcard:hasEmail']['vcard:value'].set(`<mailto:${newData[key]}>`);
                                    return;
                                case 'city':
                                    await user['vcard:hasAddress']['vcard:locality'].set(`${newData[key]}`);
                                    return;
                                case 'state':
                                    await user['vcard:hasAddress']['vcard:region'].set(`${newData[key]}`);
                                    return;
                                case 'streetAddress':
                                    await user['vcard:hasAddress']['vcard:street-address'].set(`${newData[key]}`);
                                    return;
                                case 'zipcode':
                                    await user['vcard:hasAddress']['vcard:postal-code'].set(`${newData[key]}`);
                                    return;
                                case 'phoneNum':
                                    await user['vcard:hasTelephone']['vcard:value'].set(store.sym(`<tel:${newData[key]}>`));
                                    return;
                                default:
                                    return;
                            }
                        }
                        s(key);
                    }
                }
                console.log("done");
                resolve();
            }
        )
    }
    updatePodCardX = async (store) => {
        return new Promise(
            async (resolve, reject) => {
                let me = store.sym(this.url);
                console.log(store.toString());
                let profile = me.doc();
                let newStore = $rdf.graph();
                let queries = await getQueries();
                let getDatFromStore = async (query, astore) => {
                    return new Promise(
                        (resolve, reject) => {
                            console.log(query);
                            this.prepare(query, astore).then(qry =>
                                this.execute(qry, astore).then(results => {
                                    console.log(results[0]);
                                    resolve(results);
                                })
                            )
                        }
                    )
                }
                // retrieve data from store
                let dat = await getDatFromStore(cardQuery, store);
                console.log(JSON.stringify(dat, null, 2));
                let card = new CardX(this.url);
                let newData = {
                    firstName: dat.nameVal.split(' ')[0],
                    lastName: dat.nameVal.split(' ')[1],
                    state: dat.state,
                    city: dat.city,
                    streetAddress: dat.address,
                    phoneNum: dat.phoneNumber,
                    email: dat.email
                };
                // let newData = {
                //     firstName: "Dylan",
                //     lastName: "Martin",
                //     state: "DE",
                //     city: "Newark",
                //     streetAddress: "804 North Country Club Dr",
                //     phoneNum: "3022763808",
                //     email: "dylanm@udel.edu"
                // }
                for (let key of Object.keys(newData)) {
                    if (oldData[key] !== newData[key]) {
                        let s = async (key) => {
                            switch (key) {
                                case 'firstName':
                                    await card.updateFirstName(`${newData[key]}`);
                                    return;
                                case 'lastName':
                                    await card.updateLastName(`${newData[key]}`);
                                    return;
                                case 'email':
                                    await card.updateEmail(`${newData[key]}`);
                                    return;
                                case 'city':
                                    await card.updateHomeCity(`${newData[key]}`);
                                    return;
                                case 'state':
                                    await card.updateHomeState(`${newData[key]}`);
                                    return;
                                case 'streetAddress':
                                    await card.updateHomeAddress(`${newData[key]}`);
                                    return;
                                case 'zipcode':
                                    await card.updateHomeZipCode(`${newData[key]}`);
                                    return;
                                case 'phoneNum':
                                    await card.updatePhoneNumber(`${newData[key]}`);
                                    return;
                                default:
                                    return;
                            }
                        }
                        s(key);
                    }
                }
                resolve();
            }
        )
    }
}
