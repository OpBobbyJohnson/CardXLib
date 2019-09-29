import data from "@solid/query-ldflex";
const cco = 'http://www.ontologyrepository.com/CommonCoreOntologies/';
const obo = 'http://purl.obolibrary.org/obo/';
export default class CardX {
    constructor(CardXURL) {
        this.user = data[CardXURL];
    }


    getHomeAddress = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${cco}designated_by`]) {
                                    type = await nextNode.type;
                                    if (type.toString() === `${cco}StreetAddress`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                            type = await nextNode.type;
                                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                                node = nextNode;
                                                for await (let value of node[`${cco}has_text_value`]) {
                                                    resolve(value.toString())
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }
    getFirstName = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}designated_by`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ProperName`) {
                        node = nextNode;
                        for await (nextNode of node[`${obo}RO_0010001`]) {
                            type = await nextNode.type;
                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}BFO_0000051`]){
                                    type = await nextNode.type;
                                    if(type.toString() === `${cco}GivenNameBearingEntityPart`){
                                        node = nextNode;
                                        for await (let value of node[`${cco}has_text_value`]) {
                                            resolve(value.toString())
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }
    getLastName = async () => {
        return new Promise (
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}designated_by`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ProperName`) {
                        node = nextNode;
                        for await (nextNode of node[`${obo}RO_0010001`]) {
                            type = await nextNode.type;
                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}BFO_0000051`]){
                                    type = await nextNode.type;
                                    if(type.toString() === `${cco}FamilyNameBearingEntityPart`){
                                        node = nextNode;
                                        for await (let value of node[`${cco}has_text_value`]) {
                                            resolve(value.toString())
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    getHomeState = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                // this is freaking wild!!!!!!!!
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}LocalAdministrativeRegion`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${obo}BFO_0000050`]) {
                                                    type = await nextNode.type
                                                    if (type.toString() === `${cco}State`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${cco}designated_by`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}DesignativeName`) {
                                                                node = nextNode;
                                                                for await (nextNode of node[`${obo}RO_0010001`]) {
                                                                    type = await nextNode.type;
                                                                    if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                        node = nextNode;
                                                                        for await (let value of node[`${cco}has_text_value`]) {
                                                                            // got the value finally
                                                                            resolve(value.toString())
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    getHomeCity = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                // this is freaking wild!!!!!!!!
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}LocalAdministrativeRegion`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${cco}designated_by`]) {
                                                    type = await nextNode.type
                                                    if (type.toString() === `${cco}DesignativeName`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                                            type = await nextNode.type;
                                                            if(type.toString() === `${cco}InformationBearingEntity`){
                                                                node = nextNode;
                                                                for await (let value of node[`${cco}has_text_value`]) {
                                                                    resolve(value.toString());
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    getHomeZipCode = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                // this is freaking wild!!!!!!!!
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}PostalZone`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${cco}designated_by`]) {
                                                    type = await nextNode.type;
                                                    if (type.toString() === `${cco}PostalCode`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                node = nextNode;
                                                                for await (let value of node[`${cco}has_text_value`]) {
                                                                    // got the value finally
                                                                    resolve(value.toString())
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    getHomeCounty = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}LocalAdministrativeRegion`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${obo}BFO_0000050`]) {
                                                    type = await nextNode.type
                                                    if (type.toString() === `${cco}County`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${cco}designated_by`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}DesignativeName`) {
                                                                node = nextNode;
                                                                for await (nextNode of node[`${obo}RO_0010001`]) {
                                                                    type = await nextNode.type;
                                                                    if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                        node = nextNode;
                                                                        for await (let value of node[`${cco}has_text_value`]) {
                                                                            // got the value finally
                                                                            resolve(value.toString())
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    getEmail = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}uses`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}EmailBox`){
                        node = nextNode;
                        for await (nextNode of node[`${cco}designated_by`]) {
                            type = await nextNode.type;
                            if(type.toString() === `${cco}EmailAddress`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0010001`]) {
                                    type = await nextNode.type;
                                    if (type.toString() === `${cco}InformationBearingEntity`) {
                                        node = nextNode;
                                        for await (let value of node[`${cco}has_text_value`]) {
                                            resolve(value.toString());
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        )
    }

    getPhoneNumber = async () => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}Telephone`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0000056`]) {
                                    type = await nextNode.type;
                                    if (type.toString() === `${cco}StasisOfTelecommunicationEndpointAssignment`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}RO_0000057`]) {
                                            type = await nextNode.type;
                                            if(type.toString() === `${cco}TelecommunicationEndpoint`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${cco}designated_by`]) {
                                                    type = await nextNode.type;
                                                    if(type.toString() === `${cco}TelephoneNumber`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                node = nextNode;
                                                                for await (let value of node[`${cco}has_text_value`]) {
                                                                    resolve(value.toString());
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        )
    }

    updateHomeAddress = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${cco}designated_by`]) {
                                    type = await nextNode.type;
                                    if (type.toString() === `${cco}StreetAddress`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                            type = await nextNode.type;
                                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                                node = nextNode;
                                                for await (let value of node[`${cco}has_text_value`]) {
                                                    await node[`${cco}has_text_value`].set(`${data}`);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }
    updateFirstName = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}designated_by`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ProperName`) {
                        node = nextNode;
                        for await (nextNode of node[`${obo}RO_0010001`]) {
                            type = await nextNode.type;
                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}BFO_0000051`]){
                                    type = await nextNode.type;
                                    if(type.toString() === `${cco}GivenNameBearingEntityPart`){
                                        node = nextNode;
                                        for await (let value of node[`${cco}has_text_value`]) {
                                            await node[`${cco}has_text_value`].set(`${data}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }
    updateLastName = async (data) => {
        return new Promise (
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}designated_by`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ProperName`) {
                        node = nextNode;
                        for await (nextNode of node[`${obo}RO_0010001`]) {
                            type = await nextNode.type;
                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}BFO_0000051`]){
                                    type = await nextNode.type;
                                    if(type.toString() === `${cco}FamilyNameBearingEntityPart`){
                                        node = nextNode;
                                        for await (let value of node[`${cco}has_text_value`]) {
                                            await node[`${cco}has_text_value`].set(`${data}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    updateHomeState = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                // this is freaking wild!!!!!!!!
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}LocalAdministrativeRegion`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${obo}BFO_0000050`]) {
                                                    type = await nextNode.type
                                                    if (type.toString() === `${cco}State`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${cco}designated_by`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}DesignativeName`) {
                                                                node = nextNode;
                                                                for await (nextNode of node[`${obo}RO_0010001`]) {
                                                                    type = await nextNode.type;
                                                                    if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                        node = nextNode;
                                                                        for await (let value of node[`${cco}has_text_value`]) {
                                                                            // got the value finally
                                                                            await node[`${cco}has_text_value`].set(`${data}`);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    updateHomeCity = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                // this is freaking wild!!!!!!!!
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}LocalAdministrativeRegion`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${cco}designated_by`]) {
                                                    type = await nextNode.type
                                                    if (type.toString() === `${cco}DesignativeName`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                                            type = await nextNode.type;
                                                            if(type.toString() === `${cco}InformationBearingEntity`){
                                                                node = nextNode;
                                                                for await (let value of node[`${cco}has_text_value`]) {
                                                                    await node[`${cco}has_text_value`].set(`${data}`);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    updateHomeZipCode = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                // this is freaking wild!!!!!!!!
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}PostalZone`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${cco}designated_by`]) {
                                                    type = await nextNode.type;
                                                    if (type.toString() === `${cco}PostalCode`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                node = nextNode;
                                                                for await (let value of node[`${cco}has_text_value`]) {
                                                                    // got the value finally
                                                                    await node[`${cco}has_text_value`].set(`${data}`);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    updateHomeCounty = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}ResidentialFacility`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0001025`]) {
                                    type = await nextNode.type
                                    if (type.toString() === `${cco}GeospatialRegion`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}BFO_0000050`]) {
                                            type = await nextNode.type
                                            if (type.toString() === `${cco}LocalAdministrativeRegion`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${obo}BFO_0000050`]) {
                                                    type = await nextNode.type
                                                    if (type.toString() === `${cco}County`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${cco}designated_by`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}DesignativeName`) {
                                                                node = nextNode;
                                                                for await (nextNode of node[`${obo}RO_0010001`]) {
                                                                    type = await nextNode.type;
                                                                    if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                        node = nextNode;
                                                                        for await (let value of node[`${cco}has_text_value`]) {
                                                                            // got the value finally
                                                                            await node[`${cco}has_text_value`].set(`${data}`);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    updateEmail = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}uses`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}EmailBox`){
                        node = nextNode;
                        for await (nextNode of node[`${cco}designated_by`]) {
                            type = await nextNode.type;
                            if(type.toString() === `${cco}EmailAddress`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0010001`]) {
                                    type = await nextNode.type;
                                    if (type.toString() === `${cco}InformationBearingEntity`) {
                                        node = nextNode;
                                        for await (let value of node[`${cco}has_text_value`]) {
                                            await node[`${cco}has_text_value`].set(`${data}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        )
    }

    updatePhoneNumber = async (data) => {
        return new Promise(
            async (resolve, reject) => {
                let type;
                let node;
                let nextNode;
                for await (nextNode of this.user[`${cco}agent_in`]) {
                    type = await nextNode.type;
                    if (type.toString() === `${cco}ActOfOwnership`) {
                        node = nextNode;
                        for await (nextNode of node[`${cco}has_object`]) {
                            type = await nextNode.type
                            if (type.toString() === `${cco}Telephone`) {
                                node = nextNode;
                                for await (nextNode of node[`${obo}RO_0000056`]) {
                                    type = await nextNode.type;
                                    if (type.toString() === `${cco}StasisOfTelecommunicationEndpointAssignment`) {
                                        node = nextNode;
                                        for await (nextNode of node[`${obo}RO_0000057`]) {
                                            type = await nextNode.type;
                                            if(type.toString() === `${cco}TelecommunicationEndpoint`) {
                                                node = nextNode;
                                                for await (nextNode of node[`${cco}designated_by`]) {
                                                    type = await nextNode.type;
                                                    if(type.toString() === `${cco}TelephoneNumber`) {
                                                        node = nextNode;
                                                        for await (nextNode of node[`${obo}RO_0010001`]) {
                                                            type = await nextNode.type;
                                                            if (type.toString() === `${cco}InformationBearingEntity`) {
                                                                node = nextNode;
                                                                for await (let value of node[`${cco}has_text_value`]) {
                                                                    await node[`${cco}has_text_value`].set(`${data}`);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        )
    }
}