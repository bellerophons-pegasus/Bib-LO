# lobib
A linked open bibliography display system: https://bellerophons-pegasus.github.io/lobib/

The plan:
Data is on Wikidata and exported in JSON.
For this a SPARQL query has to be designed. For starters we'll take one from scholia:

```sparql
SELECT ?date ?work ?workLabel ?topics
WITH {
  SELECT DISTINCT ?work WHERE {
    ?work wdt:P921 / (wdt:P361+ | wdt:P1269+ | (wdt:P31* / wdt:P279*) ) wd:Q58681669 .
  }
} AS %works
WITH {
  SELECT (MAX(?dates) as ?datetime) ?work (GROUP_CONCAT(?topic_label; separator=" // ") AS ?topics) WHERE {
    INCLUDE %works
    ?work wdt:P921 ?topic . 
    OPTIONAL { ?work wdt:P577 ?dates . }
    ?topic rdfs:label ?topic_label .  FILTER (lang(?topic_label) = 'en')
  }
  GROUP BY ?work
} AS %result
WHERE {
  INCLUDE %result

  # There is a problem with BC dates
  # BIND(xsd:date(?datetime) AS ?date)
  BIND(REPLACE(STR(?datetime), 'T.*', '') AS ?date)

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,da,de,es,fr,jp,nl,no,ru,sv,zh". }
}
ORDER BY DESC(?date)
LIMIT 500
```

This can be executed on the [wikidata query service](https://query.wikidata.org/) and then downloaded as json and uploaded into this repository (test.json)

Todo: JSON should be CSL compatible (https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html)

With the JSON file and some HTML, CSS, and JS magic a nicely formatted annotated bibliography will be listed. An introduction to do this is provided by [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON).


Open:
If the json will be CSL compatibile, it is possible to export entries in any citation style. 

additions:
* show latest changes/ news


Useful?
* https://github.com/itemsapi/itemsjs (faceted search); also this: https://www.itemsapi.com/blog/2017/11/25/search-engine-with-facets-in-javascript/
* https://www.netlify.com/
* https://github.com/netlify-templates/mkdocs-base
* https://travis-ci.org/
* https://circleci.com/
* https://github.com/felixhenninger/open-science-knowledge-base
* https://www.jsdelivr.com/
