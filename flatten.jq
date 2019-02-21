# jq script to flatten SPARQL result

[   # combine all records into one array

  .[]   # process each record
    | .workLabel = .work.label 
    | .work = "http://www.wikidata.org/entity/" + .work.value

]   # end of result array 

| { literature: . }     # wrap array into one object as field `literature`
