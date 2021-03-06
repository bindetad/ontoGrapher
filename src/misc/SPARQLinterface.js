import {Stereotype} from "../components/misc/Stereotype";
import {AttributeTypePool, StereotypePool, VocabularyPool} from "../config/Variables";
import {LinkPool} from "../config/LinkVariables";

export function getElements(source, callback, callbackError) {

    let query = [
        "SELECT ?term ?termLabel ?termType ?termDefinition",
        "WHERE {",
        "?term <"+source.typeIRI+"> <"+source.sourceIRI+">.",
        "?term <"+source.labelIRI+"> ?termLabel.",
        "?term a ?termType.",
        "?term <"+source.definitionIRI+"> ?termDefinition.",
        "FILTER langMatches(lang(?termLabel),\""+source.language+"\").",
        "FILTER langMatches(lang(?termDefinition),\""+source.language+"\").",
        "FILTER (?termType IN (<"+source.stereotypeIRI.join(">,<")+">,<"+source.relationshipIRI.join(">,<")+">,<"+source.attributeIRI.join(">,<")+">)).",
        "}"
    ].join(" ");

    let q = source.endpoint + "?query="+encodeURIComponent(query)+"&format=json";
    // TODO: fetch names and descriptions in all available languages
    fetch(q)
        .then(response => {
            return response.json();
        })
        .then(data => {

            for (let result of data.results.bindings){
                if (source.stereotypeIRI.indexOf(result.termType.value) > -1){
                    StereotypePool.push(new Stereotype(result.termLabel.value,result.term.value,result.termDefinition.value,source.name));
                } else if (source.relationshipIRI.indexOf(result.termType.value) > -1) {
                    LinkPool[result.termLabel.value] = ["Empty",true,false,[],result.term.value,result.termDefinition.value,source.name];
                } else if (source.attributeIRI.indexOf(result.termType.value) > -1) {
                    AttributeTypePool.push(result.termLabel.value);
                }
            }
            VocabularyPool.push(source.name);
            callback();
        })
        .catch(err => {
            console.log(err);
            callbackError();
        })
}

export function getElementsFromMultipleSources(sources, callback){
    for (let source of sources){
        getElements(source, callback,function(){});
    }
    callback();
}