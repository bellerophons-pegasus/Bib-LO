# lobib

A linked open bibliography display system: <https://bellerophons-pegasus.github.io/lobib/>
Full project description on Wikiversity: https://de.wikiversity.org/wiki/Wikiversity:Fellow-Programm_Freies_Wissen/Einreichungen/A_Linked_and_Open_Bibliography_for_Aegean_Glyptic_in_the_Bronze_Age

## The plan

Data is stored on Wikidata, fetched from there (via a common main subject), and displayed on the application linked above. In the application it can be searched, sorted, and filtered. An export function is also planned along integration of multiple citation styles.

## Steps

### Import data into Wikidata

See <https://www.wikidata.org/wiki/Wikidata:Dataset_Imports/A_Bibliography_for_Aegean_Glyptic_in_the_Bronze_Age_(1991),_compiled_by_John_G._Younger> for details.

### Get data from Wikidata in custom JSON format

For this a SPARQL query has to be designed. See file `query.rq` for the query originally taken from [Scholia](https://www.wikidata.org/wiki/Wikidata:Scholia).

The query can be executed on the [wikidata query service](https://query.wikidata.org/) and then downloaded as json and uploaded into this repository (`test.json`)

Alternatively:

* [Install jq](https://stedolan.github.io/jq/download/)
* Install [wikidata-cli](https://www.npmjs.com/package/wikidata-cli), for instance via these steps:
  * [Install npm](https://www.npmjs.com/get-npm)
  * Run `npm install` in the repository directory
* Run  `wd sparql query.rq > result.json` followed by `jq -f flatten.jq result.json > test.json` 

The last step can also be executed via `npm run download`.

### Get bibliographic data from Wikidata in CSL JSON format

This requires jq, [wcite](http://wikicite.org/wcite/) and standard Unix command line tools. Run `npm install` as documented above to install required JavaScript modules. Then:

    npm run download    # download custom JSON as described above
    npm run ids         # extract Wikidata IDs from custom JSON
    npm run csl         # download CSL JSON for each ID

The resulting CSL JSON data is written to file `wcite.json`. A bibliography can be generated from this data for instance via

    wcite show wcite.json
    wcite show -f bibtex wcite.json

### Display JSON data

With the JSON file and some HTML, CSS, and JS magic a nicely formatted annotated bibliography will be listed. An introduction to do this is provided by [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON).

### Add search all box

With even more JS the list can be filtered with a search box. A good example is provided by [w3schools](https://www.w3schools.com/howto/howto_js_filter_lists.asp)

**this is the current result on the main link provided above**
___

### Add facets for filtering
The current step is to add facets. This is done with [itemsJS](https://github.com/itemsapi/itemsjs), which provides a pure javascript based faceted search. An example using this library and [Vue.js](https://vuejs.org/) is presented in a [blog entry](https://www.itemsapi.com/blog/2017/11/25/search-engine-with-facets-in-javascript/)

The current test result is here: https://bellerophons-pegasus.github.io/lobib/testItemsJS/index.html

## Next steps

* Split up topics into list

* Hide the main topic used in the Wikidata query to get the items (e. g. 'Aegean glyptic') 

* Provide means to hide topics without filtering anything; E. g. many entries have 'archaeology' as a main subject, which is a bit too general for the intended reference list

* Get more information from Wikidata in order to be able to fully display the biblography entries. But also:

* It would be good to get [CSL JSON](https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html) from Wikidata. For this [citation.js](https://citation.js.org/) was tested, but unfortunately not all needed properties (e. g. subtitle/P1680 or main subject/P921) are recognised or incorporated (see [issues on GitHub](https://github.com/larsgw/citation.js), esp. [#76](https://github.com/larsgw/citation.js/issues/76)). Thus either an own solution has to be implemented (only if no other way possible) or appropriate extensions have to be contributed to citation.js.

* Think about using CSL JSON as primary input format instead of custom JSON or extend CSL JSON with additional fields

* With CSL JSON it is possible to export entries in any citation style with citation.js, which would already be a great help for the planned export function.

* It would be nice to highlight the latest changes or additions in the bibliography. This could be achieved if the date of the last change can be queried via the SPARQL endpoint of Wikidata. This has to be investigated first.

## Possibly useful links ?

* https://www.netlify.com/
* https://github.com/netlify-templates/mkdocs-base
* https://travis-ci.org/
* https://circleci.com/
* https://github.com/felixhenninger/open-science-knowledge-base
* https://www.jsdelivr.com/

## Other related links

* https://janakiev.com/blog/wikidata-mayors/
