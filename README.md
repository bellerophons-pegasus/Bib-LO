# lobib

A linked open bibliography display system: <https://bellerophons-pegasus.github.io/lobib/>

The plan:
Data is on Wikidata and exported in JSON.
For this a SPARQL query has to be designed. See file `query.rq` for the query originally taken from [Scholia](https://www.wikidata.org/wiki/Wikidata:Scholia).

The query can be executed on the [wikidata query service](https://query.wikidata.org/) and then downloaded as json and uploaded into this repository (`test.json`)

Alternatively:

* [Install jq](https://stedolan.github.io/jq/download/)
* Install [wikidata-cli](https://www.npmjs.com/package/wikidata-cli), for instance via these steps:
  * [Install npm](https://www.npmjs.com/get-npm)
  * Run `npm install` in the repository directory
* Run  `wd sparql query.rq > result.json` followed by `jq -f flatten.jq result.json > test.json` 

The last step can also be executed via `npm run download`.

With the JSON file and some HTML, CSS, and JS magic a nicely formatted annotated bibliography will be listed. An introduction to do this is provided by [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON).

## Open issues

JSON should be CSL compatible (https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html)

Open:
If the json will be CSL compatibile, it is possible to export entries in any citation style. 

additions:
* show latest changes/ news

Possibly useful links
* https://github.com/itemsapi/itemsjs (faceted search); also this: https://www.itemsapi.com/blog/2017/11/25/search-engine-with-facets-in-javascript/
* https://www.netlify.com/
* https://github.com/netlify-templates/mkdocs-base
* https://travis-ci.org/
* https://circleci.com/
* https://github.com/felixhenninger/open-science-knowledge-base
* https://www.jsdelivr.com/
